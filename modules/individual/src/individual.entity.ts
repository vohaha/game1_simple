import { AbstractEntity } from '@core/ddd';
import { EntityId } from '@core/types';
import { Energy } from './energy.vo';
import { Effects } from './effects.vo';
import { Learning } from './learning.vo';
import { Metadata } from './metadata.vo';
import { Psychology } from './psychology.vo';
import { Skills } from './skills.vo';
import { Social } from './social.vo';
import { Timeline } from './timeline.vo';

/**
 * Represents an Individual entity in the game.
 * It has a unique identity and properties.
 */
export class Individual extends AbstractEntity<EntityId> {
  public readonly metadata: Metadata;
  public readonly energy: Energy;
  public readonly psychology: Psychology;
  public readonly skills: Skills;
  public readonly learning: Learning;
  public readonly timeline: Timeline;
  public readonly social: Social;
  public readonly effects: Effects;

  private constructor(
    id: EntityId,
    metadata: Metadata,
    energy: Energy,
    psychology: Psychology,
    skills: Skills,
    learning: Learning,
    timeline: Timeline,
    social: Social,
    effects: Effects,
  ) {
    super(id);
    this.metadata = metadata;
    this.energy = energy;
    this.psychology = psychology;
    this.skills = skills;
    this.learning = learning;
    this.timeline = timeline;
    this.social = social;
    this.effects = effects;
  }

  public static create(
    id: EntityId,
    metadata: Metadata,
    energy: Energy,
    psychology: Psychology,
    skills: Skills,
    learning: Learning,
    timeline: Timeline,
    social: Social,
    effects: Effects,
  ): Individual {
    return new Individual(
      id,
      metadata,
      energy,
      psychology,
      skills,
      learning,
      timeline,
      social,
      effects,
    );
  }
}
