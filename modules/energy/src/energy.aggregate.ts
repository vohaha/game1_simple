import { AbstractAggregateRoot } from '../../../core/ddd';
import { Energy, EnergyProps } from './energy.entity';
import { EntityId } from '../../../core/types';

export class EnergyAggregate extends AbstractAggregateRoot<EntityId> {
  public readonly energy: Energy;

  private constructor(energy: Energy) {
    super(energy.id);
    this.energy = energy;
  }

  public static create(id: EntityId, props: EnergyProps): EnergyAggregate {
    const energy = Energy.create(id, props);
    return new EnergyAggregate(energy);
  }
}

