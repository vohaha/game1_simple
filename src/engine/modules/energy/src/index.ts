import { EventEmitter } from 'events';

/**
 * Temporary alias until shared 'core/types' is available.
 * In продакшені замінимо на імпорт з доменних VO.
 */
export type EntityId = string;

/**
 * Energy value‑object (immutable snapshot if needed).
 */
export interface EnergySnapshot {
  readonly entityId: EntityId;
  readonly current: number;
  readonly capacity: number;
}

/**
 * Domain‑level events емітяться для інших bounded‑context‑ів
 * (Progression, Balance, UI тощо).
 */
export type EnergyEvent =
  | 'EnergySpent'
  | 'EnergyRegenerated'
  | 'EnergyDepleted'
  | 'CapacityChanged';

interface EnergyState {
  current: number;
  capacity: number;
}

/**
 * Public facade contract.
 */
export interface EnergyServiceContract {
  current(entityId: EntityId): number;
  capacity(entityId: EntityId): number;
  spend(entityId: EntityId, amount: number): void;
  regenerate(entityId: EntityId, amount: number): void;
  /** Optional helper to mutate capacity (e.g. skill‑up). */
  setCapacity(entityId: EntityId, newCapacity: number): void;
  on(event: EnergyEvent, listener: (payload: EnergySnapshot) => void): void;
}

/**
 * Simple in‑memory implementation (non‑persistent, single‑node).
 */
class EnergyServiceImpl implements EnergyServiceContract {
  private readonly store = new Map<EntityId, EnergyState>();
  private readonly emitter = new EventEmitter();

  /**
   * Returns current energy; if entity unknown, initialise with default.
   */
  current(entityId: EntityId): number {
    return this.getOrInit(entityId).current;
  }

  /**
   * Returns max capacity for entity (default if new).
   */
  capacity(entityId: EntityId): number {
    return this.getOrInit(entityId).capacity;
  }

  /**
   * Spend energy; throws if insufficient.
   */
  spend(entityId: EntityId, amount: number): void {
    if (amount <= 0) throw new Error('Amount must be positive');

    const state = this.getOrInit(entityId);
    if (state.current < amount) {
      throw new Error('Insufficient energy');
    }

    state.current -= amount;
    this.emitter.emit('EnergySpent', this.snapshot(entityId, state));

    if (state.current === 0) {
      this.emitter.emit('EnergyDepleted', this.snapshot(entityId, state));
    }
  }

  /**
   * Regenerate energy; clamps at capacity.
   */
  regenerate(entityId: EntityId, amount: number): void {
    if (amount <= 0) throw new Error('Amount must be positive');

    const state = this.getOrInit(entityId);
    state.current = Math.min(state.current + amount, state.capacity);
    this.emitter.emit('EnergyRegenerated', this.snapshot(entityId, state));
  }

  /**
   * Adjust capacity (e.g., після апґрейду скілу) й авторегулюємо current.
   */
  setCapacity(entityId: EntityId, newCapacity: number): void {
    if (newCapacity <= 0) throw new Error('Capacity must be positive');

    const state = this.getOrInit(entityId);
    state.capacity = newCapacity;
    state.current = Math.min(state.current, newCapacity);
    this.emitter.emit('CapacityChanged', this.snapshot(entityId, state));
  }

  on(event: EnergyEvent, listener: (payload: EnergySnapshot) => void): void {
    this.emitter.on(event, listener);
  }

  // ——— helpers ———

  private getOrInit(entityId: EntityId): EnergyState {
    let state = this.store.get(entityId);
    if (!state) {
      state = { current: DEFAULT_CAPACITY, capacity: DEFAULT_CAPACITY };
      this.store.set(entityId, state);
    }
    return state;
  }

  private snapshot(entityId: EntityId, state: EnergyState): EnergySnapshot {
    return { entityId, current: state.current, capacity: state.capacity };
  }
}

const DEFAULT_CAPACITY = 100;

/**
 * Singleton facade.
 */
export const EnergyService: EnergyServiceContract = new EnergyServiceImpl();
