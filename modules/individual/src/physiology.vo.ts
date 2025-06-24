import { AbstractValueObject } from '@core/ddd';

export interface IPhysiology {
  lastSleepAt: Date | null;
}

export class Physiology extends AbstractValueObject<IPhysiology> {
  get lastSleepAt(): Date | null {
    return this.props.lastSleepAt;
  }

  private constructor(props: IPhysiology) {
    super(props);
  }

  public static create(props: Partial<IPhysiology> = {}): Physiology {
    const defaults: IPhysiology = {
      lastSleepAt: null,
    };
    return new Physiology({ ...defaults, ...props });
  }

  public startSleep(): Physiology {
    return new Physiology({ ...this.props, lastSleepAt: new Date() });
  }

  public wakeUp(): Physiology {
    return new Physiology({ ...this.props, lastSleepAt: null });
  }
}
