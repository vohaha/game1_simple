import { DomainEvent } from '../../../core/events';
import { EntityId } from '../../../core/types';

export class DealCreated extends DomainEvent {
  public readonly eventType = 'deal.created';

  constructor(aggregateId: EntityId) {
    super(aggregateId);
  }
}
