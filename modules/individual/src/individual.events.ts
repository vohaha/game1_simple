import { DomainEvent } from '@core/events';
import { EntityId } from '@core/types';

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
    public readonly current: number,
    public readonly change: number,
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

export class IndividualOverwhelmed extends DomainEvent {
  public readonly eventType = 'individual.overwhelmed';

  constructor(public readonly aggregateId: EntityId) {
    super(aggregateId);
  }
}

export class IndividualEnteredRecovery extends DomainEvent {
  public readonly eventType = 'individual.entered_recovery';

  constructor(public readonly aggregateId: EntityId) {
    super(aggregateId);
  }
}

export class IndividualDailyReflection extends DomainEvent {
  public readonly eventType = 'individual.daily_reflection';

  constructor(
    public readonly aggregateId: EntityId,
    public readonly reflection: string,
  ) {
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
    public sleepDurationMs: number,
  ) {
    super(aggregateId);
  }
}
