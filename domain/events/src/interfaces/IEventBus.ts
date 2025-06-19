import { IDomainEvent } from './IDomainEvent.ts';

export interface IEventBus {
  publish(event: IDomainEvent): Promise<void>;

  publishMany(events: IDomainEvent[]): Promise<void>;

  subscribe(handler: (event: IDomainEvent) => void): void;

  unsubscribe(eventType: Pick<IDomainEvent, 'type'>): void;

  clear(): void;
}
