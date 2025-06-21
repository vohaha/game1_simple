game1_simple/src/energy/EnergyValueObject.ts
// Value Object representing an amount of energy, always immutable

export class EnergyValueObject {
  readonly amount: number;

  constructor(amount: number) {
    if (amount < 0) throw new Error('Energy amount must be non-negative');
    this.amount = amount;
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  add(other: EnergyValueObject): EnergyValueObject {
    return new EnergyValueObject(this.amount + other.amount);
  }

  subtract(other: EnergyValueObject): EnergyValueObject {
    if (other.amount > this.amount)
      throw new Error('Cannot subtract more energy than available');
    return new EnergyValueObject(this.amount - other.amount);
  }

  equals(other: EnergyValueObject): boolean {
    return this.amount === other.amount;
  }
}
