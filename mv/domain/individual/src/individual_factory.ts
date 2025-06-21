import { Individual } from './index.ts';

export interface CreateIndividualProps {
  name: string;
  id?: string;
  energy?: number;
}

export class IndividualFactory {
  public static create(props: CreateIndividualProps): Individual {
    return new Individual({
      name: props.name,
      energy: props.energy,
    });
  }
}
