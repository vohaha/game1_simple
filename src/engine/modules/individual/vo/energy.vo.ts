import { AbstractValueObject, DomainError, Invariants } from '../../../core/ddd';

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
    Energy.invariants.check(
      () => props.value > 0,
      () => new InvalidEnergyValueError(props.value),
    );
    Energy.invariants.check(
      () => props.max > 0,
      () => new InvalidEnergyValueError(props.max),
    );
    Energy.invariants.check(
      () => props.value >= props.max,
      () => new InvalidEnergyValueRangeError(props.value, props.max),
    );
    Energy.invariants.assert();
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
    Energy.invariants.check(
      () => amount > 0,
      () => new InvalidEnergyAmountError(amount),
    );
    return Energy.create({ ...this.props, value: this.current + amount });
  }

  public decreaseBy(amount: number): Energy {
    Energy.invariants.check(
      () => amount > 0,
      () => new InvalidEnergyAmountError(amount),
    );
    return Energy.create({ ...this.props, value: this.current - amount });
  }

  public isDepleted(): boolean {
    return this.current === 0;
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
