import { EntityId } from '../types';
import { DomainEvent as IDomainEventContract } from '../ddd';

/**
 * Base class for domain events, implementing the core DomainEvent contract.
 */
export abstract class DomainEvent implements IDomainEventContract {
  public readonly occurredAt: Date;
  public readonly aggregateId: EntityId;
  public abstract readonly eventType: string;

  constructor(aggregateId: EntityId) {
    this.occurredAt = new Date();
    this.aggregateId = aggregateId;
  }
}

/**
 * Interface for an event bus to publish and subscribe to domain events.
 */
export interface IEventBus {
  publish(event: IDomainEventContract): void;
  subscribe(eventName: string, callback: (event: IDomainEventContract) => void): void;
}

/**
 * A simple publisher to dispatch events through the event bus.
 */
export class EventPublisher {
  constructor(private eventBus: IEventBus) {}

  publish(event: IDomainEventContract): void {
    this.eventBus.publish(event);
  }
}
