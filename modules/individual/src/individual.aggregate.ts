import { AbstractAggregateRoot } from '@core/ddd';
import { Individual, IndividualProps } from './individual.entity';
import { EntityId } from '@core/types';
import { IndividualCreated, IndividualEnergyChanged } from './individual.events';
import { Energy } from '@modules/energy/src/energy.vo';

export class IndividualAggregate extends AbstractAggregateRoot<EntityId> {
  public individual: Individual;

  private constructor(individual: Individual) {
    super(individual.id);
    this.individual = individual;
  }

  public static create(id: EntityId, props: Omit<IndividualProps, 'energy'>): IndividualAggregate {
    const initialEnergy = Energy.create({ current: 100, max: 100 });
    const individual = Individual.create(id, { ...props, energy: initialEnergy });
    const aggregate = new IndividualAggregate(individual);
    aggregate.addDomainEvent(new IndividualCreated(aggregate.id));
    return aggregate;
  }

  public spendEnergy(amount: number): void {
    const newEnergy = this.individual.props.energy.spend(amount);
    this.individual.props.energy = newEnergy;
    this.addDomainEvent(
      new IndividualEnergyChanged(this.id, newEnergy.current, -amount),
    );
  }

  public regenerateEnergy(amount: number): void {
    const newEnergy = this.individual.props.energy.regenerate(amount);
    this.individual.props.energy = newEnergy;
    this.addDomainEvent(
      new IndividualEnergyChanged(this.id, newEnergy.current, amount),
    );
  }
}


