import { AbstractEntity, DomainError } from '@core/ddd';
import { EntityId } from '@core/types';
import { Energy } from './energy.vo';

export interface IMetadata {
  name: string;
}

export interface IPsychology {
  morale: number;
  stress: number;
}

export interface ISkills {
  combat: number;
  crafting: number;
  medicine: number;
}

export interface ILearning {
  currentTopic: string;
  progress: number;
}

export interface ITimeline {
  age: number;
  birthDate: Date;
}

export interface ISocial {
  friends: string[];
  reputation: number;
}

export interface IEffects {
  active: string[];
}

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

// error when individual already in sleep mode
class AlreadySleepingError extends DomainError {
  constructor(energy: Energy) {
    super(`Individual is already sleeping since: <value>${energy.current}</value>`);
  }
}

// Value Objects for each interface

export class Psychology implements IPsychology {
  public readonly morale: number;
  public readonly stress: number;

  private constructor(morale: number, stress: number) {
    this.morale = morale;
    this.stress = stress;
  }

  public static create(
    morale = 50,
    stress = 0
  ): Psychology {
    return new Psychology(morale, stress);
  }
}

export class Skills implements ISkills {
  public readonly combat: number;
  public readonly crafting: number;
  public readonly medicine: number;

  private constructor(combat: number, crafting: number, medicine: number) {
    this.combat = combat;
    this.crafting = crafting;
    this.medicine = medicine;
  }

  public static create(
    combat = 1,
    crafting = 1,
    medicine = 1
  ): Skills {
    return new Skills(combat, crafting, medicine);
  }
}

export class Learning implements ILearning {
  public readonly currentTopic: string;
  public readonly progress: number;

  private constructor(currentTopic: string, progress: number) {
    this.currentTopic = currentTopic;
    this.progress = progress;
  }

  public static create(
    currentTopic = 'None',
    progress = 0
  ): Learning {
    return new Learning(currentTopic, progress);
  }
}

export class Timeline implements Timeline {
  public readonly age: number;
  public readonly birthDate: Date;

  private constructor(age: number, birthDate: Date) {
    this.age = age;
    this.birthDate = birthDate;
  }

  public static create(
    age = 18,
    birthDate = new Date(2000, 0, 1)
  ): Timeline {
    return new Timeline(age, birthDate);
  }
}

export class Social implements Social {
  public readonly friends: string[];
  public readonly reputation: number;

  private constructor(friends: string[], reputation: number) {
    this.friends = friends;
    this.reputation = reputation;
  }

  public static create(
    friends: string[] = [],
    reputation = 0
  ): Social {
    return new Social(friends, reputation);
  }
}

export class Effects implements IEffects {
  public readonly active: string[];

  private constructor(active: string[]) {
    this.active = active;
  }

  public static create(
    active: string[] = []
  ): Effects {
    return new Effects(active);
  }
}

export class Metadata implements IMetadata {
  public readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static create(
    name: string
  ): Metadata {
    return new Metadata(name);
  }
} 