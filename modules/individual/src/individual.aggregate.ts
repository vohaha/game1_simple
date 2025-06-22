import { AbstractAggregateRoot } from '../../../core/ddd';
import { Individual, IndividualProps } from './individual.entity';
import { EntityId } from '../../../core/types';
import { IndividualCreated } from './individual.events';

export class IndividualAggregate extends AbstractAggregateRoot<EntityId> {
  public readonly individual: Individual;

  private constructor(individual: Individual) {
    super(individual.id);
    this.individual = individual;
  }

  public static create(id: EntityId, props: IndividualProps): IndividualAggregate {
    const individual = Individual.create(id, props);
    const aggregate = new IndividualAggregate(individual);
    aggregate.addDomainEvent(new IndividualCreated(aggregate.id));
    return aggregate;
  }
}

