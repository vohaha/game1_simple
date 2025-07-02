import { AbstractAggregateRoot, DomainTime } from '../../core/ddd';
import { EntityId } from '../../core/types';

import { Individual } from './individual.entity';
import {
  IndividualCreated,
  IndividualEnergyChanged,
  IndividualStartedToSleep,
  IndividualEndedSleep,
} from './individual.events';

import { Energy, Metadata, Physiology } from './vo';
import { TimeUtils } from '../../shared/utils/time.util';

class PhysiologyBehavior {
  constructor(private individual: Individual) {}

  startSleep() {
    this.individual.physiology = this.individual.physiology.markSleepStarted();
  }

  endSleep() {
    const sleepDuration = this.individual.physiology.sleepDuration;
    const restoredEnergyValue = this.sleepEnergyCalculation(sleepDuration);
    this.individual.physiology = this.individual.physiology.markSleepEnded();
    this.individual.energy = this.individual.energy.increaseBy(restoredEnergyValue);
    return [sleepDuration, restoredEnergyValue];
  }

  sleepEnergyCalculation(sleepDuration: DomainTime) {
    const indivMaxEnergy = this.individual.energy.max;
    const sleepHours = TimeUtils.toHours(sleepDuration);
    const ratio = Math.min(1, sleepHours / 7);
    return Math.floor(indivMaxEnergy * ratio);
  }
}

export class IndividualAggregate extends AbstractAggregateRoot<EntityId> {
  protected individual: Individual;
  private physiology: PhysiologyBehavior;

  private constructor(individual: Individual) {
    super(individual.id);
    this.individual = individual;
    this.physiology = new PhysiologyBehavior(this.individual);
  }

  public static create(id: string, name: string): IndividualAggregate {
    const newId = id;
    const metadata = Metadata.create({ name });
    const energy = Energy.create({ value: 100, max: 100 });
    const physiology = Physiology.create({});

    const individual = Individual.create(newId, metadata, energy, physiology);

    const aggregate = new IndividualAggregate(individual);
    aggregate.addDomainEvent(new IndividualCreated(aggregate.id));
    return aggregate;
  }

  public sync(): void {}

  public startSleep(): void {
    this.physiology.startSleep();
    this.addDomainEvent(new IndividualStartedToSleep(this.id));
  }

  public endSleep(): void {
    const energyBefore = this.individual.energy.current;
    const [sleepDuration, energyRestored] = this.physiology.endSleep();
    this.addDomainEvent(new IndividualEndedSleep(this.id, sleepDuration));
    this.addDomainEvent(
      new IndividualEnergyChanged(
        this.id,
        energyBefore,
        this.individual.energy.current,
        energyRestored,
      ),
    );
  }

  get snapshot() {
    return this.individual.snapshot;
  }
}
