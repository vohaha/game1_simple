/**
 * Simple event bus for Game1—enables domain observability, event-driven integration, and extensibility.
 * Each bounded context or core module can subscribe to domain events.
 *
 * Keeps handlers in-memory only; a real production version might use persistent queues or external event brokers.
 */

import { Game1DomainEvent } from '../shared/events/DomainEvent';

type EventHandler<T extends Game1DomainEvent = Game1DomainEvent> = (event: T) => void;

class DomainEventBus {
  private static instance: DomainEventBus;
  private handlers: Map<string, Set<EventHandler>>;

  private constructor() {
    this.handlers = new Map();
  }

  static getInstance(): DomainEventBus {
    if (!DomainEventBus.instance) {
      DomainEventBus.instance = new DomainEventBus();
    }
    return DomainEventBus.instance;
  }

  /**
   * Subscribe to an event by its type (e.g., "EnergySpent", "DealFulfilled").
   * Returns an unsubscribe function for handler removal.
   */
  subscribe<T extends Game1DomainEvent>(
    eventType: T['eventType'],
    handler: EventHandler<T>,
  ): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    // Typecast necessary due to lack of event-type-specific separation—safe if used consistently
    const handlerSet = this.handlers.get(eventType) as Set<EventHandler<T>>;
    handlerSet.add(handler);

    // Return an unsubscribe function
    return () => {
      handlerSet.delete(handler);
      if (handlerSet.size === 0) {
        this.handlers.delete(eventType);
      }
    };
  }

  /**
   * Publish an event—invokes all registered handlers for event type.
   * Uses synchronous callbacks; in a true async environment, could use Promises/queues.
   */
  publish<T extends Game1DomainEvent>(event: T): void {
    const handlerSet = this.handlers.get(event.eventType);
    if (!handlerSet) return;
    handlerSet.forEach((handler) => {
      try {
        // Each handler receives the event object
        handler(event);
      } catch (err) {
        // Log, but do not prevent other handlers from running
        // In production, integrate with monitoring (e.g., Sentry, or log system)
        // eslint-disable-next-line no-console
        console.error(`Error in handler for event "${event.eventType}":`, err);
      }
    });
  }

  /**
   * Remove all handlers (typically for test teardown or full reset).
   */
  clearAll(): void {
    this.handlers.clear();
  }
}

export const domainEventBus = DomainEventBus.getInstance();
