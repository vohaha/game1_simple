import { DomainEvent } from '@core/events';
import { EntityId } from '@core/types';

export class IndividualCreated extends DomainEvent {
  public readonly eventType = 'individual.created';

  constructor(aggregateId: EntityId) {
    super(aggregateId);
  }
}

export class IndividualEnergyChanged extends DomainEvent {
  public readonly eventType = 'individual.energy.changed';

  constructor(
    aggregateId: EntityId,
    public readonly current: number,
    public readonly change: number,
  ) {
    super(aggregateId);
  }
}

