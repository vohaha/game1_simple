import { AbstractEntity, DomainError } from '@core/ddd';
import { EntityId } from '@core/types';
import { Energy } from './energy.vo';
import { ISleepRecoveryStrategy } from './sleep-recovery.strategy';

// TODO: Define properties for an individual.
// For example, a name or other attributes.
export interface IndividualProps {
  name: string;
  energy: Energy;
}

export interface IIndividualState {
  lastSleepAt: Date | null;
}

export interface Psychology {
  // Define psychology-related properties here
}

export interface Skills {
  // Define skills-related properties here
}

export interface Learning {
  // Define learning-related properties here
}

export interface Timeline {
  // Define timeline-related properties here
}

export interface Social {
  // Define social-related properties here
}

export interface Effects {
  // Define effects-related properties here
}

export interface Metadata {
  // Define metadata-related properties here
}

/**
 * Represents an Individual entity in the game.
 * It has a unique identity and properties.
 */
export class Individual extends AbstractEntity<EntityId> {
  public readonly traits: IndividualProps;
  public readonly vitals: IIndividualState;

  public readonly psychology: Psychology;
  public readonly skills: Skills;
  public readonly learning: Learning;
  public readonly timeline: Timeline;
  public readonly social: Social;
  public readonly effects: Effects;
  public readonly metadata: Metadata;

  private constructor(
    id: EntityId,
    traits: IndividualProps,
    vitals: IIndividualState,
    psychology: Psychology,
    skills: Skills,
    learning: Learning,
    timeline: Timeline,
    social: Social,
    effects: Effects,
    metadata: Metadata
  ) {
    super(id);
    this.traits = traits;
    this.vitals = vitals ?? { lastSleepAt: null };
    this.psychology = psychology;
    this.skills = skills;
    this.learning = learning;
    this.timeline = timeline;
    this.social = social;
    this.effects = effects;
    this.metadata = metadata;
  }

  public static create(
    id: EntityId,
    traits: IndividualProps,
    psychology: Psychology,
    skills: Skills,
    learning: Learning,
    timeline: Timeline,
    social: Social,
    effects: Effects,
    metadata: Metadata
  ): Individual {
    IndividualInvariants.assertHasName(traits);
    return new Individual(
      id,
      traits,
      { lastSleepAt: null },
      psychology,
      skills,
      learning,
      timeline,
      social,
      effects,
      metadata
    );
  }

  public sleep(): void {
    IndividualInvariants.assertAwake(this.vitals);
    this.vitals.lastSleepAt = new Date();
  }
}

class IndividualInvariants {
  static assertHasName(traits: IndividualProps): void {
    if (!traits.name) {
      throw new MissingIndividualNameError();
    }
  }
  static assertAwake(vitals: IIndividualState): void {
    if (vitals.lastSleepAt) {
      throw new AlreadySleepingError(vitals);
    }
  }
}

class MissingIndividualNameError extends DomainError {
  constructor() {
    super('Individual name is required');
  }
}

// error when individual already in sleep mode
class AlreadySleepingError extends DomainError {
  constructor(vitals: IIndividualState) {
    super(`Individual is already sleeping since: <value>${vitals.lastSleepAt}</value>`);
  }
}
