import { AbstractEntity } from '@core/ddd';
import { EntityId } from '@core/types';
import { Energy } from '@modules/individual/src/energy.vo';

// TODO: Define properties for an individual.
// For example, a name or other attributes.
export interface IndividualProps {
  name: string;
  energy: Energy;
}

/**
 * Represents an Individual entity in the game.
 * It has a unique identity and properties.
 */
export class Individual extends AbstractEntity<EntityId> {
  public readonly props: IndividualProps;

  private constructor(id: EntityId, props: IndividualProps) {
    super(id);
    this.props = props;
  }

  /**
   * Factory method to create a new Individual.
   * Encapsulates validation and creation logic.
   * @param id The unique identifier for the individual.
   * @param props The properties of the individual.
   * @returns A new Individual instance.
   */
  public static create(id: EntityId, props: IndividualProps): Individual {
    // TODO: Add validation logic here before creating the entity.
    // For example, check if the name is not empty.
    return new Individual(id, props);
  }
}
