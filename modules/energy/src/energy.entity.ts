import { AbstractEntity } from '../../../core/ddd';
import { EntityId } from '../../../core/types';

export interface EnergyProps {
  current: number;
  max: number;
}

/**
 * Represents the Energy entity for an individual.
 */
export class Energy extends AbstractEntity<EntityId> {
  public readonly props: EnergyProps;

  private constructor(id: EntityId, props: EnergyProps) {
    super(id);
    this.props = props;
  }

  /**
   * Factory method to create a new Energy entity.
   * @param id The unique identifier for the entity.
   * @param props The properties for the energy.
   * @returns A new Energy instance.
   */
  public static create(id: EntityId, props: EnergyProps): Energy {
    // TODO: Add validation logic, e.g., ensure current <= max.
    return new Energy(id, props);
  }

  // TODO: Add methods to manage energy, like spend() and regenerate().
}

