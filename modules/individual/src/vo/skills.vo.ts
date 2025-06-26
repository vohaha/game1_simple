import { AbstractValueObject } from '@core/ddd';

export interface ISkills {
  combat: number;
  crafting: number;
  medicine: number;
}

export class Skills extends AbstractValueObject<ISkills> {
  get combat(): number {
    return this.props.combat;
  }

  get crafting(): number {
    return this.props.crafting;
  }

  get medicine(): number {
    return this.props.medicine;
  }

  private constructor(props: ISkills) {
    super(props);
  }

  public static create(props: Partial<ISkills> = {}): Skills {
    const defaults: ISkills = {
      combat: 1,
      crafting: 1,
      medicine: 1,
    };
    return new Skills({ ...defaults, ...props });
  }
}
