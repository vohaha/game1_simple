import { DomainEvent } from '../../../core/events';
import { EntityId } from '../../../core/types';

export class ProductionStarted extends DomainEvent {
  public readonly eventType = 'production.started';

  constructor(aggregateId: EntityId) {
    super(aggregateId);
  }
}

export class ProductionCompleted extends DomainEvent {
  public readonly eventType = 'production.completed';

  constructor(aggregateId: EntityId) {
    super(aggregateId);
  }
}
