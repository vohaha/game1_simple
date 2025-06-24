import { AbstractAggregateRoot } from '@core/ddd';
import { Individual, IMetadata } from './individual.entity';
import { EntityId } from '@core/types';
import {
  IndividualCreated,
  IndividualEnergyChanged,
  IndividualCollapsed,
  IndividualOverwhelmed,
  IndividualEnteredRecovery,
} from './individual.events';
import { Energy } from './energy.vo';
import { AlreadySleepingError } from './individual.errors';

interface IIndividualSate {
  lastSleepAt: Date;
}

const initialPhysiology: IIndividualSate = {
  lastSleepAt: new Date(),
};

const SLEEP_ENERGY_REGEN_PER_HOUR = 10;

class PhysiologyBehavior {
  private aggregate: IndividualAggregate;
  private physiology: IIndividualSate;

  constructor(aggregate: IndividualAggregate, physiology?: IIndividualSate) {
    this.aggregate = aggregate;
    this.physiology = physiology ?? initialPhysiology;
  }

  public spendEnergy(amount: number): void {
    this.aggregate.identity.energy = this.aggregate.identity.energy.spend(amount);
    this.aggregate.addDomainEvent(new IndividualEnergyChanged(this.aggregate.id));
  }

  public startSleep(): void {
    if (this.physiology.lastSleepAt) {
      throw new AlreadySleepingError();
    }
    this.physiology.lastSleepAt = new Date();
  }

  public wakeIfRecovered(): void {
    if (!this.physiology.lastSleepAt) return;

    const now = new Date();
    const sleepDurationMs = now.getTime() - this.physiology.lastSleepAt.getTime();
    const sleepDurationHours = sleepDurationMs / (1000 * 60 * 60);

    if (sleepDurationHours >= 1) {
      const energyRegen = Math.floor(sleepDurationHours * SLEEP_ENERGY_REGEN_PER_HOUR);
      this.aggregate.identity.energy = this.aggregate.identity.energy.recover(energyRegen);
      this.aggregate.addDomainEvent(new IndividualEnergyChanged(this.aggregate.id));
      this.physiology.lastSleepAt = null;
    }
  }

  public collapseIfExhausted(): void {
    if (this.aggregate.identity.energy.value === 0) {
      this.aggregate.addDomainEvent(new IndividualCollapsed(this.aggregate.id));
      this.enterRecoveryState();
    }
  }

  public enterRecoveryState(): void {
    if (!this.physiology.lastSleepAt) {
      this.physiology.lastSleepAt = new Date();
      this.aggregate.addDomainEvent(new IndividualEnteredRecovery(this.aggregate.id));
    }
  }
}

export class IndividualAggregate extends AbstractAggregateRoot<EntityId> {
  public identity: Individual;
  public physiology: PhysiologyBehavior;

  private constructor(individual: Individual, physiology?: IIndividualSate) {
    super(individual.id);
    this.identity = individual;
    this.physiology = new PhysiologyBehavior(this, physiology);
  }

  public static awaken(id: EntityId, props: Omit<IMetadata, 'energy'>): IndividualAggregate {
    const initialEnergy = Energy.create({ value: 100, max: 100 });
    const individual = Individual.create(id, { ...props, energy: initialEnergy });
    const aggregate = new IndividualAggregate(individual);
    aggregate.addDomainEvent(new IndividualCreated(aggregate.id));
    return aggregate;
  }

  public spendEnergy(amount: number): void {
    this.physiology.spendEnergy(amount);
  }

  public startSleep(): void {
    this.physiology.startSleep();
  }

  public wakeIfRecovered(): void {
    this.physiology.wakeIfRecovered();
  }

  public beforeAction(): void {
    this.wakeIfRecovered();
  }

  public collapseIfExhausted(): void {
    this.physiology.collapseIfExhausted();
  }

  public enterRecoveryState(): void {
    this.physiology.enterRecoveryState();
  }

  public applyCircadianRhythm(currentTime: Date): void {
    // Placeholder: Adjust individual's efficiency based on circadian rhythm.
    // Implementation details would depend on time and individual's internal clock.
  }

  public adjustMotivationAfterAction(success: boolean): void {
    // Placeholder: Adjust motivation based on success or failure of an action.
    // For example, increase motivation if success, decrease if failure.
  }

  public applyStressOverloadThreshold(): void {
    // Placeholder: Check stress level and emit IndividualOverwhelmed event if threshold exceeded.
    const stressLevel = this.identity.stressLevel; // Assuming stressLevel exists
    const STRESS_THRESHOLD = 100; // Example threshold
    if (stressLevel >= STRESS_THRESHOLD) {
      this.addDomainEvent(new IndividualOverwhelmed(this.id));
    }
  }

  public evaluateSkillProgress(skill: string, context: any): void {
    // Placeholder: Simulate skill progression based on context and usage.
    // Context could contain factors influencing learning rate.
  }

  public emitDailyReflection(): void {
    // Placeholder: Emit a daily reflection event summarizing domain effects of the day.
  }

  public respondToEnvironmentChange(): void {
    // Placeholder method
  }

  public simulateCognitiveDrift(): void {
    // Placeholder method
  }

  public adjustSocialPreference(): void {
    // Placeholder method
  }

  public reactToGroupConflict(): void {
    // Placeholder method
  }

  public resolveInternalContradiction(): void {
    // Placeholder method
  }

  public formIntentForNextTick(): void {
    // Placeholder method
  }

  public processPerceivedInjustice(): void {
    // Placeholder method
  }

  public evaluateGoalAlignment(): void {
    // Placeholder method
  }

  public updateSelfNarrative(): void {
    // Placeholder method
  }
}
