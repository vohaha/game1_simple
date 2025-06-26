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
  IndividualStartedToSleep,
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
} from './vo';

// --- Behavior Classes ---

class PhysiologyBehavior {
  constructor(private aggregate: IndividualAggregate) {}

  private get identity() {
    return this.aggregate.identity;
  }

  startSleep() {
    this.identity.physiology = this.identity.physiology.markSleepStarted();
  }
}

export class IndividualAggregate extends AbstractAggregateRoot<EntityId> {
  public identity: Individual;
  private physiology: PhysiologyBehavior;

  private constructor(individual: Individual) {
    super(individual.id);
    this.identity = individual;
    this.physiology = new PhysiologyBehavior(this);
  }

  public static create(props: { name: string }, id?: EntityId): IndividualAggregate {
    const newId = id ?? uuidv4();
    const metadata = Metadata.create({ name: props.name });
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

  public rehydrate(): void {}

  public startSleep(): void {
    this.physiology.startSleep();
    this.addDomainEvent(new IndividualStartedToSleep(this.id));
  }
}
