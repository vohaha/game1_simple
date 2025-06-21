import { ITimestamp, Timestamp, TimestampSchema } from '../index.ts';
import { IEvent, IEventCreate } from './index.ts';

export class DomainEvent implements IEvent {
  readonly occurredAt;
  readonly origin;
  readonly type;
  readonly payload;

  constructor(event: IEvent) {
    this.occurredAt = event.occurredAt;
    this.origin = event.origin;
    this.type = event.type;
    this.payload = event.payload;
  }
}

class DomainEventFactory<TDomainEventCreate extends IEventCreate> {
  #origin: string;
  constructor(origin: string) {
    this.#origin = origin;
  }
  create(eventCreate: TDomainEventCreate, occurredAt?: ITimestamp) {
    const ts = TimestampSchema.safeParse(occurredAt);
    return new DomainEvent({
      origin: this.#origin,
      type: `${this.#origin}:${eventCreate.type}`,
      occurredAt: ts.success ? ts.data : Timestamp.now(),
      payload: eventCreate.payload,
    });
  }
}

export abstract class EventAware<TDomainEventCreate extends IEventCreate> {
  protected events: DomainEvent[] = [];
  protected eventFactory;

  constructor(input: { origin: string }) {
    this.eventFactory = new DomainEventFactory(input.origin);
  }

  protected addEvent(createEvent: TDomainEventCreate): void {
    this.events.push(
      this.eventFactory.create({
        type: createEvent.type,
        payload: createEvent.payload,
      })
    );
  }

  protected getEvents(): IEvent[] {
    return this.events;
  }

  protected clearEvents(): void {
    this.events = [];
  }
}
