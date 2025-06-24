import { AbstractValueObject } from '@core/ddd';

export interface IPsychology {
  morale: number;
  stress: number;
}

export class Psychology extends AbstractValueObject<IPsychology> {
  get morale(): number {
    return this.props.morale;
  }

  get stress(): number {
    return this.props.stress;
  }

  private constructor(props: IPsychology) {
    super(props);
  }

  public static create(props: Partial<IPsychology> = {}): Psychology {
    const defaults: IPsychology = {
      morale: 50,
      stress: 0,
    };
    return new Psychology({ ...defaults, ...props });
  }
}
