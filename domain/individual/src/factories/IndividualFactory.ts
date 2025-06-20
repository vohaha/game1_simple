import { Individual } from '../entities/Individual.ts';
import { Energy } from '../value-objects/Energy.ts';

export interface CreateIndividualProps {
  name: string;
  id?: string;
  energy?: number;
}

export class IndividualFactory {
  public static create(props: CreateIndividualProps): Individual {
    const energy = new Energy(props.energy ?? Energy.DEFAULT);

    return new Individual({
      name: props.name,
      energy,
    });
  }
}
