import { AbstractEntity, DomainError } from '@core/ddd';
import { EntityId } from '@core/types';
import { Energy } from './energy.vo';
import { ISleepRecoveryStrategy } from './sleep-recovery.strategy';

export interface Metadata {
  name: string;
}

export interface Vitals {}

export interface Psychology {
  // Define psychology-related properties here
  energy: Energy;
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

/**
 * Represents an Individual entity in the game.
 * It has a unique identity and properties.
 */
export class Individual extends AbstractEntity<EntityId> {
  public readonly vitals: Vitals;

  public readonly psychology: Psychology;
  public readonly skills: Skills;
  public readonly learning: Learning;
  public readonly timeline: Timeline;
  public readonly social: Social;
  public readonly effects: Effects;
  public readonly metadata: Metadata;

  private constructor(
    id: EntityId,
    vitals: Vitals,
    psychology: Psychology,
    skills: Skills,
    learning: Learning,
    timeline: Timeline,
    social: Social,
    effects: Effects,
    metadata: Metadata,
  ) {
    super(id);
    this.vitals = vitals;
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
    traits: Metadata,
    psychology: Psychology,
    skills: Skills,
    learning: Learning,
    timeline: Timeline,
    social: Social,
    effects: Effects,
    metadata: Metadata,
  ): Individual {
    IndividualInvariants.assertHasName(traits);
    return new Individual(
      id,
      traits,
      psychology,
      skills,
      learning,
      timeline,
      social,
      effects,
      metadata,
    );
  }
}

class IndividualInvariants {
  static assertHasName(individual: Individual): void {
    if (!individual.metadata.name) {
      throw new MissingIndividualNameError();
    }
  }
  static assertAwake(individual: Individual): void {
    if (individual.vitals) {
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
  constructor(individual: Individual) {
    super(`Individual is already sleeping since: <value>${individual.vitals}</value>`);
  }
}
