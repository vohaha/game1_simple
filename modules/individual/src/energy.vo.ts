import { AbstractValueObject, DomainError } from '@core/ddd';

type EnergyValue = number;
export interface EnergyProps {
  value: EnergyValue;
  max: EnergyValue;
}

export class Energy extends AbstractValueObject<EnergyProps> {
  private constructor(props: EnergyProps) {
    super(props);
  }

  public static create(props: EnergyProps): Energy {
    const invariants = defineEnergyInvariants(props);
    invariants.assertValidEnergyValue(props.value);
    invariants.assertValidEnergyValue(props.max);
    return new Energy(props);
  }

  public get invariants() {
    return defineEnergyInvariants(this.props);
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
    this.invariants.assertValidEnergyAmount(amount);
    const newCurrent = Math.min(this.current + amount, this.max);
    return new Energy({ ...this.props, value: newCurrent });
  }

  public decreaseBy(amount: number): Energy {
    return this.spend(amount);
  }

  public isDepleted(): boolean {
    return this.current <= 0;
  }

  public spend(amount: number): Energy {
    this.invariants.assertHasEnoughEnergy(this.current, amount);
    return new Energy({ ...this.props, value: this.current - amount });
  }

  public regenerate(amount: number): Energy {
    this.invariants.assertValidEnergyAmount(amount);
    const newCurrent = Math.min(this.current + amount, this.max);
    return new Energy({ ...this.props, value: newCurrent });
  }
}

export function defineEnergyInvariants(props: EnergyProps) {
  const invariants = {
    assertValidEnergyValue(value: EnergyValue): void {
      if (value <= 0 || value > props.max) {
        throw new InvalidEnergyValueError(value);
      }
    },

    assertValidEnergyAmount(amount: number): void {
      invariants.assertValidEnergyValue(amount);
      if (amount <= 0) {
        throw new InvalidEnergyAmountError(amount);
      }
    },

    assertHasEnoughEnergy(current: number, amount: number): void {
      invariants.assertValidEnergyAmount(amount);
      if (current < amount) {
        throw new InsufficientEnergyError(amount);
      }
    },
  };
  return invariants;
}

export class InvalidEnergyValueError extends DomainError {
  constructor(value: EnergyValue) {
    super(`Invalid energy value: <value>${value}</value>`);
  }
}
export class InvalidEnergyAmountError extends DomainError {
  constructor(amount: EnergyValue) {
    super(`Invalid energy amount: <value>${amount}</value>`);
  }
}
export class InsufficientEnergyError extends DomainError {
  constructor(amount: EnergyValue) {
    super(`Insufficient energy: <value>${amount}</value>`);
  }
}
