import { AbstractValueObject } from '@core/ddd';

export interface EnergyProps {
  current: number;
  max: number;
}

export class Energy extends AbstractValueObject<EnergyProps> {
  private constructor(props: EnergyProps) {
    super(props);
  }

  public static create(props: EnergyProps): Energy {
    if (props.current < 0 || props.max < 0 || props.current > props.max) {
      // TODO: Replace with a proper domain exception
      throw new Error('Invalid energy values');
    }
    return new Energy(props);
  }

  public get current(): number {
    return this.props.current;
  }

  public get max(): number {
    return this.props.max;
  }

  public spend(amount: number): Energy {
    if (amount <= 0) {
      // TODO: Replace with a proper domain exception
      throw new Error('Amount to spend must be positive');
    }
    if (this.props.current < amount) {
      // TODO: Replace with a proper domain exception
      throw new Error('Not enough energy');
    }
    return new Energy({ ...this.props, current: this.props.current - amount });
  }

  public regenerate(amount: number): Energy {
    if (amount <= 0) {
      // TODO: Replace with a proper domain exception
      throw new Error('Amount to regenerate must be positive');
    }
    const newCurrent = Math.min(this.props.current + amount, this.props.max);
    return new Energy({ ...this.props, current: newCurrent });
  }
}
