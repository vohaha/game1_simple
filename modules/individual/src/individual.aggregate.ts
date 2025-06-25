import { AbstractAggregateRoot, DomainEvent } from '@core/ddd';
import { EntityId } from '@core/types';
import { IAction } from '@core/actions';
import { v4 as uuidv4 } from 'uuid';

import { Individual } from './individual.entity';
import {
  IndividualCreated,
  IndividualEnergyChanged,
  IndividualCollapsed,
  IndividualOverwhelmed,
  IndividualEnteredRecovery,
  IndividualDailyReflection,
} from './individual.events';

// Value Objects
import { Energy } from './energy.vo';
import { Metadata } from './metadata.vo';
import { Psychology } from './psychology.vo';
import { Physiology } from './physiology.vo';
import { Skills } from './skills.vo';
import { Learning } from './learning.vo';
import { Timeline } from './timeline.vo';
import { Social } from './social.vo';
import { Effects } from './effects.vo';

// --- Behavior Classes ---

class PhysiologyBehavior {
  constructor(private aggregate: IndividualAggregate) {}

  private get identity() {
    return this.aggregate.identity;
  }

  // 🛏️ Physiological logic
  public startSleep(): void {
    this.identity.energy.invariants.assertAwake();
    this.identity.physiology = this.identity.physiology.startSleep();
    // TODO: this.aggregate.emitEvent(new IndividualStartedToSleep(this.aggregate.id));
  }

  public wakeIfRecovered(): void {
    if (!this.identity.physiology.lastSleepAt) return;

    const now = new Date();
    const sleepDurationMs = now.getTime() - this.identity.physiology.lastSleepAt.getTime();
    const sleepDurationHours = sleepDurationMs / (1000 * 60 * 60);

    if (this.identity.energy.ratio >= 1 || sleepDurationHours >= 1) {
      const energyRegen = Math.floor(sleepDurationHours * 10);
      this.identity.energy = this.identity.energy.regenerate(energyRegen);
      this.aggregate.emitEvent(
        new IndividualEnergyChanged(this.aggregate.id, this.identity.energy.current, energyRegen),
      );
      this.identity.physiology = this.identity.physiology.wakeUp();
    }
  }

  // 💥 State transitions
  public collapseIfExhausted(): void {
    if (this.identity.energy.isDepleted()) {
      this.aggregate.emitEvent(new IndividualCollapsed(this.aggregate.id));
      this.enterRecoveryState();
    }
  }

  public enterRecoveryState(): void {
    if (!this.identity.physiology.lastSleepAt) {
      this.identity.physiology = this.identity.physiology.startSleep();
      this.aggregate.emitEvent(new IndividualEnteredRecovery(this.aggregate.id));
    }
  }
}

class PsychologyBehavior {
  constructor(private aggregate: IndividualAggregate) {}

  private get identity() {
    return this.aggregate.identity;
  }

  // 🧠 Psychological reactions
  public applyStressThreshold(): void {
    // TODO: Implement stress logic in a dedicated Psychology VO
    const stressLevel = this.identity.psychology.stress;
    const STRESS_THRESHOLD = 100;
    if (stressLevel >= STRESS_THRESHOLD) {
      this.aggregate.emitEvent(new IndividualOverwhelmed(this.aggregate.id));
    }
  }

  public adjustMotivation(action: IAction, success: boolean): void {
    // TODO: Implement motivation logic in Psychology VO
  }

  // 🧠 Cognitive/emotional simulation
  public simulateCognitiveDrift(): void {
    // TODO: Implement cognitive drift simulation (e.g., alter psychological states over time)
  }

  public emitDailyReflection(): void {
    // TODO: Summarize daily events and effects to create a meaningful reflection
    const reflection = 'A summary of the day...';
    this.aggregate.emitEvent(new IndividualDailyReflection(this.aggregate.id, reflection));
  }
}

class SocialBehavior {
  constructor(private aggregate: IndividualAggregate) {}

  private get identity() {
    return this.aggregate.identity;
  }

  // 👥 Social behaviors
  public reactToGroupConflict(): void {
    // TODO: Implement logic for reacting to social conflicts based on personality
  }

  public evaluateGoalAlignment(): void {
    // TODO: Implement logic to evaluate alignment with group goals and adjust social standing
  }
}

// --- Aggregate Root ---
export class IndividualAggregate extends AbstractAggregateRoot<EntityId> {
  public identity: Individual;

  // Behaviors
  private physiology: PhysiologyBehavior;
  private psychology: PsychologyBehavior;
  private social: SocialBehavior;

  private constructor(individual: Individual) {
    super(individual.id);
    this.identity = individual;

    // Initialize behaviors
    this.physiology = new PhysiologyBehavior(this);
    this.psychology = new PsychologyBehavior(this);
    this.social = new SocialBehavior(this);
  }

  public static create(props: { name: string }, id?: EntityId): IndividualAggregate {
    const newId = id ?? uuidv4();

    // Create all the value objects for a new individual
    const metadata = Metadata.create({ name: props.name });
    const energy = Energy.create({ value: 100, max: 100 });
    // TODO: Replace with actual initializers for VOs
    const psychology = Psychology.create({});
    const physiology = Physiology.create({});
    const skills = Skills.create({});
    const learning = Learning.create({});
    const timeline = Timeline.create({});
    const social = Social.create({});
    const effects = Effects.create({});

    const individual = Individual.create(
      newId,
      metadata,
      energy,
      psychology,
      physiology,
      skills,
      learning,
      timeline,
      social,
      effects,
    );

    const aggregate = new IndividualAggregate(individual);
    aggregate.emitEvent(new IndividualCreated(aggregate.id));
    return aggregate;
  }

  // --- ⏳ Lifecycle hooks ---
  public beforeAction(action: IAction): void {
    this.physiology.wakeIfRecovered();
    this.identity.energy.invariants.assertAwake();
    this.physiology.collapseIfExhausted();
    this.psychology.applyStressThreshold();
  }

  public tick(): void {
    this.physiology.wakeIfRecovered();
    this.psychology.simulateCognitiveDrift();
  }

  // --- Public method for behaviors to add domain events ---
  public emitEvent(event: DomainEvent): void {
    this.addDomainEvent(event);
  }

  // --- 🛏️ Physiological logic ---
  public startSleep(): void {
    this.physiology.startSleep();
  }

  // --- 🧠 Psychological reactions ---
  public adjustMotivation(action: IAction, success: boolean): void {
    this.psychology.adjustMotivation(action, success);
  }

  public emitDailyReflection(): void {
    this.psychology.emitDailyReflection();
  }

  // --- 👥 Social behaviors ---
  public reactToGroupConflict(): void {
    this.social.reactToGroupConflict();
  }

  public evaluateGoalAlignment(): void {
    this.social.evaluateGoalAlignment();
  }
}
