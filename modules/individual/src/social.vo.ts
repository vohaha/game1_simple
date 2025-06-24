import { AbstractValueObject } from '@core/ddd';

export interface ISocial {
  friends: string[];
  reputation: number;
}

export class Social extends AbstractValueObject<ISocial> {
  get friends(): string[] {
    return this.props.friends;
  }

  get reputation(): number {
    return this.props.reputation;
  }

  private constructor(props: ISocial) {
    super(props);
  }

  public static create(props: Partial<ISocial> = {}): Social {
    const defaults: ISocial = {
      friends: [],
      reputation: 0,
    };
    return new Social({ ...defaults, ...props });
  }
}
