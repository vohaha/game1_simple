import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';

/**
 * Core value–objects for the Time module.
 */
export type TimerId = string;

export interface GameTime {
  /** Epoch milliseconds (UTC). */
  readonly timestamp: number;
  /** Offset of the player’s local TZ in minutes (e.g. +180 for UTC+3). */
  readonly tzOffset: number;
}

export interface Duration {
  /** Signed 64‑bit duration in milliseconds. */
  readonly milliseconds: number;
}

/**
 * Domain‑level time events recognised by other modules.
 */
export type TimeEvent = 'DailyTickOccurred' | 'ActionCompleted' | 'TimerCancelled';

interface TimerRecord {
  id: TimerId;
  actionId: string;
  completeAt: number;
  timeoutHandle: NodeJS.Timeout;
}

/**
 * Public contract that other bounded‑contexts depend upon.
 *
 * NOTE:  We expose a singleton `TimeService` that proxies to an
 *        in‑memory implementation.  The concrete class is exported
 *        only for testing/injection purposes.
 */
export interface TimeServiceContract {
  now(): GameTime;
  schedule(actionId: string, duration: Duration): TimerId;
  cancel(timerId: TimerId): void;
  on(event: TimeEvent, listener: (payload: unknown) => void): void;
}

/**
 * Simple in‑memory implementation.
 * – Relies on Node‑style `setTimeout`.
 * – NOT persistent across restarts (production version should delegate
 *   to a durable scheduler/bus).
 */
export class TimeServiceImpl implements TimeServiceContract {
  private readonly emitter = new EventEmitter();
  private readonly timers = new Map<TimerId, TimerRecord>();

  /**
   * Return current game‑time in UTC with player‑offset.
   */
  now(): GameTime {
    const now = new Date();
    return {
      timestamp: now.getTime(),
      tzOffset: -now.getTimezoneOffset(), // minutes east of UTC
    };
  }

  /**
   * Schedule completion of a domain action after a given duration.
   */
  schedule(actionId: string, duration: Duration): TimerId {
    if (duration.milliseconds <= 0) {
      throw new Error('Duration must be positive');
    }

    const id: TimerId = uuidv4();
    const completeAt = Date.now() + duration.milliseconds;

    const timeoutHandle = setTimeout(() => {
      this.emitter.emit('ActionCompleted', {
        actionId,
        timerId: id,
        completeAt,
      });
      this.timers.delete(id);
    }, duration.milliseconds);

    this.timers.set(id, {
      id,
      actionId,
      completeAt,
      timeoutHandle,
    });

    return id;
  }

  /**
   * Cancel a previously scheduled timer.
   */
  cancel(timerId: TimerId): void {
    const record = this.timers.get(timerId);
    if (!record) return;

    clearTimeout(record.timeoutHandle);
    this.timers.delete(timerId);

    this.emitter.emit('TimerCancelled', {
      timerId: record.id,
      actionId: record.actionId,
    });
  }

  /**
   * Subscribe to a time‑related event.
   */
  on(event: TimeEvent, listener: (payload: unknown) => void): void {
    this.emitter.on(event, listener);
  }
}

/**
 * Eager singleton used by the rest of the runtime.
 */
export const TimeService: TimeServiceContract = new TimeServiceImpl();
