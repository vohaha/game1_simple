import { DomainEvent } from '../../../core/events';
import { EntityId } from '../../../core/types';

export class GroupCreated extends DomainEvent {
  public readonly eventType = 'group.created';

  constructor(aggregateId: EntityId) {
    super(aggregateId);
  }
}
