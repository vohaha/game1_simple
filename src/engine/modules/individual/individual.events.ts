import { DomainEvent } from '../../core/events';
import { EntityId } from '../../core/types';

export class IndividualCreated extends DomainEvent {
  public readonly eventType = 'individual.created';

  constructor(public readonly aggregateId: EntityId) {
    super(aggregateId);
  }
}

export class IndividualEnergyChanged extends DomainEvent {
  public readonly eventType = 'individual.energy.changed';

  constructor(
    public readonly aggregateId: EntityId,
    public readonly before: number,
    public readonly current: number,
    public readonly delta: number,
  ) {
    super(aggregateId);
  }
}

export class IndividualCollapsed extends DomainEvent {
  public readonly eventType = 'individual.collapsed';

  constructor(public readonly aggregateId: EntityId) {
    super(aggregateId);
  }
}

export class IndividualStartedToSleep extends DomainEvent {
  public readonly eventType = 'individual.started_to_sleep';

  constructor(public readonly aggregateId: EntityId) {
    super(aggregateId);
  }
}

export class IndividualEndedSleep extends DomainEvent {
  public readonly eventType = 'individual.ended_sleep';

  constructor(
    public readonly aggregateId: EntityId,
    public readonly sleepDuration: number,
  ) {
    super(aggregateId);
  }
}
