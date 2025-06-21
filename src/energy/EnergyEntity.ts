game1_simple/src/energy/EnergyEntity.ts
export class EnergyEntity {
  // Entity ID
  private readonly id: string;

  // Energy units currently available
  private energy: number;

  // Immutable per-entity trait (VO pattern)
  private readonly maxEnergy: number;

  // Circadian energy regeneration window (VO reference)
  private readonly chronotypeWindow: unknown;

  // Internal: last energy update timestamp
  private lastUpdated: number;

  constructor(
    id: string,
    energy: number,
    maxEnergy: number,
    chronotypeWindow: unknown
  ) {
    this.id = id;
    this.energy = energy;
    this.maxEnergy = maxEnergy;
    this.chronotypeWindow = chronotypeWindow;
    this.lastUpdated = Date.now();
  }

  getId(): string {
    return this.id;
  }

  getEnergy(): number {
    return this.energy;
  }

  spend(amount: number): boolean {
    if (amount > this.energy) return false;
    this.energy -= amount;
    this.lastUpdated = Date.now();
    return true;
  }

  regenerate(amount: number): void {
    this.energy = Math.min(this.maxEnergy, this.energy + amount);
    this.lastUpdated = Date.now();
  }
}
