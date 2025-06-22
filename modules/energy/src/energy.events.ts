import { DomainEvent } from '../../../core/events';
import { EntityId } from '../../../core/types';

export class EnergyChanged extends DomainEvent {
  public readonly eventType = 'energy.changed';

  constructor(aggregateId: EntityId, public readonly amount: number) {
    super(aggregateId);
  }
}
