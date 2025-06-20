/**
 * IndividualFactory is responsible for creating Individual aggregates.
 * Encapsulates construction logic and ensures invariants at creation.
 */

import { Individual } from '../entities/Individual.ts';
import { Energy } from '../value-objects/Energy.ts';

export interface CreateIndividualProps {
  name: string;
  id?: string;
  energy?: number;
}

/**
 * Factory for Individual aggregate creation.
 */
export class IndividualFactory {
  /**
   * Creates a new Individual aggregate.
   * @param props - Properties required to instantiate a Individual.
   */
  public static create(props: CreateIndividualProps): Individual {
    const energy = new Energy(props.energy ?? Energy.DEFAULT);

    return new Individual({
      name: props.name,
      energy,
    });
  }
}
