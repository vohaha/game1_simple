import { IDomainEvent } from './IDomainEvent.ts';

export interface IDomainEventAware {
  registerDomainEvent(event: IDomainEvent): void;
  clearDomainEvents(): void;
  getDomainEvents(): IDomainEvent[];
}

export abstract class DomainEventAware implements IDomainEventAware {
  private domainEvents: IDomainEvent[] = [];

  registerDomainEvent(event: IDomainEvent): void {
    this.domainEvents.push(event);
  }

  clearDomainEvents(): void {
    this.domainEvents = [];
  }

  getDomainEvents(): IDomainEvent[] {
    return [...this.domainEvents];
  }
}
