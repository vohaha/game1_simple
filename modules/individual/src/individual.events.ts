import { DomainEvent } from '../../../core/events';
import { EntityId } from '../../../core/types';

export class IndividualCreated extends DomainEvent {
  public readonly eventType = 'individual.created';

  constructor(aggregateId: EntityId) {
    super(aggregateId);
  }
}
