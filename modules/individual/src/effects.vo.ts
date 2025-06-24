import { AbstractValueObject } from '@core/ddd';

export interface IEffects {
  active: string[];
}

export class Effects extends AbstractValueObject<IEffects> {
  get active(): string[] {
    return this.props.active;
  }

  private constructor(props: IEffects) {
    super(props);
  }

  public static create(props: Partial<IEffects> = {}): Effects {
    const defaults: IEffects = {
      active: [],
    };
    return new Effects({ ...defaults, ...props });
  }
}
