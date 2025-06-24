import { AbstractAggregateRoot } from '@core/ddd';
import { IIndividualState, Individual, IndividualProps } from './individual.entity';
import { EntityId } from '@core/types';
import { IndividualCreated, IndividualEnergyChanged } from './individual.events';
import { Energy } from './energy.vo';

interface IIndividualSate {
  lastSleepAt: Date;
}

const initialPhysiology: IIndividualSate = {
  lastSleepAt: new Date(),
};

export class IndividualAggregate extends AbstractAggregateRoot<EntityId> {
  public identity: Individual;
  public physiology: IIndividualSate;

  private constructor(individual: Individual, state: IIndividualSate) {
    super(individual.id);
    this.identity = individual;
    this.physiology = state ?? initialPhysiology;
  }

  public static awaken(id: EntityId, props: Omit<IndividualProps, 'energy'>): IndividualAggregate {
    const initialEnergy = Energy.create({ value: 100, max: 100 });
    const individual = Individual.create(id, { ...props, energy: initialEnergy });
    const aggregate = new IndividualAggregate(individual);
    aggregate.addDomainEvent(new IndividualCreated(aggregate.id));
    return aggregate;
  }
}
