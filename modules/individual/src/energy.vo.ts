import { AbstractValueObject, DomainError, Invariants } from '@core/ddd';

type EnergyValue = number;
export interface IEnergy {
  value: EnergyValue;
  max: EnergyValue;
}

export class Energy extends AbstractValueObject<IEnergy> {
  private constructor(props: IEnergy) {
    super(props);
  }

  public static create(props: IEnergy): Energy {
    const invariants = new Invariants();
    invariants.check(props.value > 0, new InvalidEnergyValueError(props.value));
    invariants.check(props.max > 0, new InvalidEnergyValueError(props.max));
    invariants.check(
      props.value <= props.max,
      new InvalidEnergyValueRangeError(props.value, props.max),
    );
    invariants.assert();
    return new Energy(props);
  }

  public get current(): number {
    return this.props.value;
  }

  public get max(): number {
    return this.props.max;
  }

  public get ratio(): number {
    return this.current / this.max;
  }

  public isBelow(threshold: number): boolean {
    return this.ratio < threshold;
  }

  public increaseBy(amount: number): Energy {
    const invariants = new Invariants();
    invariants.check(amount > 0, new InvalidEnergyAmountError(amount));
    invariants.assert();
    const newCurrent = Math.min(this.current + amount, this.max);
    return new Energy({ ...this.props, value: newCurrent });
  }

  public decreaseBy(amount: number): Energy {
    const invariants = new Invariants();
    invariants.check(amount > 0, new InvalidEnergyAmountError(amount));
    invariants.assert();
    const newCurrent = Math.max(this.current - amount, 0);
    return new Energy({ ...this.props, value: newCurrent });
  }

  public isDepleted(): boolean {
    return this.current <= 0;
  }

  public spend(amount: number): Energy {
    const invariants = new Invariants();
    invariants.check(amount > 0, new InvalidEnergyAmountError(amount));
    invariants.check(this.current <= amount, new InsufficientEnergyError(this.current, amount));
    invariants.assert();
    return new Energy({ ...this.props, value: this.current - amount });
  }

  public regenerate(amount: number): Energy {
    const invariants = new Invariants();
    invariants.check(amount > 0, new InvalidEnergyAmountError(amount));
    invariants.assert();
    const newCurrent = Math.min(this.current + amount, this.max);
    return new Energy({ ...this.props, value: newCurrent });
  }
}

export class InvalidEnergyValueError extends DomainError {
  constructor(value: EnergyValue) {
    super(`Invalid energy value: <value>${value}</value>`);
  }
}

export class InvalidEnergyValueRangeError extends DomainError {
  constructor(value: EnergyValue, max: EnergyValue) {
    super(
      `Invalid energy value range: <value>${value}</value> must be less than or equal to <value>${max}</value>`,
    );
  }
}

export class InvalidEnergyAmountError extends DomainError {
  constructor(amount: EnergyValue) {
    super(`Invalid energy amount: <value>${amount}</value>`);
  }
}
export class InsufficientEnergyError extends DomainError {
  constructor(current: EnergyValue, amount: EnergyValue) {
    super(`Insufficient energy: <current>${current}</current>, <amount>${amount}</amount>`);
  }
}

export class AlreadySleepingError extends DomainError {
  constructor(energy: IEnergy) {
    super(`Individual is already sleeping since: <value>${energy.value}</value>`);
  }
}
