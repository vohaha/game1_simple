import { AbstractAggregateRoot, DomainEvent, DomainTime } from '@core/ddd';
import { EntityId } from '@core/types';
import { IAction } from '@core/actions';

import { Individual } from './individual.entity';
import {
  IndividualCreated,
  IndividualEnergyChanged,
  IndividualCollapsed,
  IndividualOverwhelmed,
  IndividualEnteredRecovery,
  IndividualDailyReflection,
  IndividualStartedToSleep,
  IndividualEndedSleep,
} from './individual.events';

// Value Objects
import {
  Energy,
  Metadata,
  Psychology,
  Physiology,
  Skills,
  Learning,
  Timeline,
  Social,
  Effects,
  Identity,
} from './vo';

// --- Behavior Classes ---

class PhysiologyBehavior {
  constructor(private individual: Individual) {}

  startSleep() {
    this.individual.physiology = this.individual.physiology.markSleepStarted();
  }

  endSleep() {
    const sleepSince = this.individual.physiology.sleepSince;
    this.individual.physiology = this.individual.physiology.markSleepEnded();
    const sleepDurationMs = DomainTime.now().diffMs(sleepSince!);
    return sleepDurationMs;
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
    aggregate.addDomainEvent(new IndividualCreated(aggregate.id));
    return aggregate;
  }

  public sync(): void {}

  public startSleep(): void {
    this.physiology.startSleep();
    this.addDomainEvent(new IndividualStartedToSleep(this.id));
  }

  public endSleep(): void {
    const sleepDuration = this.physiology.endSleep();
    this.addDomainEvent(new IndividualEndedSleep(this.id, sleepDuration));
  }
}
