// Value Object representing an immutable amount of energy.
//
// Enforces value semantics—two instances with the same amount are equal.
// Use this for parameters, return values, and comparisons, not for Entity state.
//
// TODO: Extend with energy "type" (e.g., physical, mental) if sub-typing becomes relevant.
// TODO: Connect with shared ValueObject interface for infrastructure-agnostic value equality.

export class EnergyValueObject {
  readonly amount: number;

  constructor(amount: number) {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new Error('EnergyValueObject: amount must be a non-negative finite number');
    }
    this.amount = amount;
    Object.freeze(this);
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  add(other: EnergyValueObject): EnergyValueObject {
    return new EnergyValueObject(this.amount + other.amount);
  }

  subtract(other: EnergyValueObject): EnergyValueObject {
    if (other.amount > this.amount) {
      throw new Error('Cannot subtract more energy than available');
    }
    return new EnergyValueObject(this.amount - other.amount);
  }

  equals(other: EnergyValueObject): boolean {
    return other instanceof EnergyValueObject && this.amount === other.amount;
  }
}
