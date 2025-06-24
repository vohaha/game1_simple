import { AbstractEntity, DomainError } from '@core/ddd';
import { EntityId } from '@core/types';
import { Energy } from './energy.vo';
import { Effects, IEffects } from './effects.vo';
import { Learning, ILearning } from './learning.vo';
import { Metadata, IMetadata } from './metadata.vo';
import { Psychology, IPsychology } from './psychology.vo';
import { Skills, ISkills } from './skills.vo';
import { Social, ISocial } from './social.vo';
import { Timeline, ITimeline } from './timeline.vo';

/**
 * Represents an Individual entity in the game.
 * It has a unique identity and properties.
 */
export class Individual extends AbstractEntity<EntityId> {
  public readonly energy: Energy;
  public readonly psychology: Psychology;
  public readonly skills: Skills;
  public readonly learning: Learning;
  public readonly timeline: Timeline;
  public readonly social: Social;
  public readonly effects: Effects;
  public readonly metadata: Metadata;

  private constructor(
    id: EntityId,
    energy: Energy,
    psychology: Psychology,
    skills: Skills,
    learning: Learning,
    timeline: Timeline,
    social: Social,
    effects: Effects,
    metadata: Metadata,
  ) {
    super(id);
    this.energy = energy;
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
    energy: Energy,
    psychology: Psychology,
    skills: Skills,
    learning: Learning,
    timeline: Timeline,
    social: Social,
    effects: Effects,
    metadata: Metadata,
  ): Individual {
    IndividualInvariants.assertHasName(metadata);
    return new Individual(
      id,
      energy,
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
  static assertHasName(metadata: Metadata): void {
    if (!metadata.name) {
      throw new MissingIndividualNameError();
    }
  }
  static assertAwake(energy: Energy): void {
    if (energy.current === 0) {
      throw new AlreadySleepingError(energy);
    }
  }
}

class MissingIndividualNameError extends DomainError {
  constructor() {
    super('Individual name is required');
  }
}

class AlreadySleepingError extends DomainError {
  constructor(energy: Energy) {
    super(`Individual is already sleeping since: <value>${energy.current}</value>`);
  }
}
