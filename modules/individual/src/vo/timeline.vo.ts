import { AbstractValueObject } from '@core/ddd';

export interface ITimeline {
  age: number;
  birthDate: Date;
}

export class Timeline extends AbstractValueObject<ITimeline> {
  get age(): number {
    return this.props.age;
  }

  get birthDate(): Date {
    return this.props.birthDate;
  }

  private constructor(props: ITimeline) {
    super(props);
  }

  public static create(props: Partial<ITimeline> = {}): Timeline {
    const defaults: ITimeline = {
      age: 18,
      birthDate: new Date(2000, 0, 1),
    };
    return new Timeline({ ...defaults, ...props });
  }
}
