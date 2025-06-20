import { IEvent, IEventAware } from './index.ts';

export abstract class Event implements IEvent {
  readonly occurredAt;
  readonly source;
  readonly type;
  readonly payload;

  constructor(event: IEvent) {
    this.occurredAt = event.occurredAt;
    this.source = event.source;
    this.type = event.type;
    this.payload = event.payload;
  }
}

export abstract class EventAware implements IEventAware {
  protected events: IEvent[] = [];

  addEvent(event: IEvent): void {
    this.events.push(event);
  }

  getEvents(): IEvent[] {
    return this.events;
  }

  clearEvents(): void {
    this.events = [];
  }
}
