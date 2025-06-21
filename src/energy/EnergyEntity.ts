import { IEnergyEntity, EnergySnapshot } from '../interfaces/IEnergyEntity';
import { ChronotypeWindow } from '../time/ChronotypeWindowVO';

export class EnergyEntity implements IEnergyEntity {
  private readonly id: string;
  private energy: number;
  private readonly maxEnergy: number;
  private readonly chronotypeWindow: ChronotypeWindow;
  private lastUpdated: number;

  constructor(props: {
    id: string;
    energy: number;
    maxEnergy: number;
    chronotypeWindow: ChronotypeWindow;
    lastUpdated?: number;
  }) {
    this.id = props.id;
    this.energy = props.energy;
    this.maxEnergy = props.maxEnergy;
    this.chronotypeWindow = props.chronotypeWindow;
    this.lastUpdated = props.lastUpdated ?? Date.now();
  }

  getId(): string {
    return this.id;
  }

  getSnapshot(): EnergySnapshot {
    return {
      id: this.id,
      energy: this.energy,
      maxEnergy: this.maxEnergy,
      chronotypeWindow: this.chronotypeWindow,
      lastUpdated: this.lastUpdated,
    };
  }

  getCurrentEnergy(): number {
    return this.energy;
  }

  spend(amount: number): boolean {
    if (amount <= 0 || amount > this.energy) return false;
    this.energy -= amount;
    this.lastUpdated = Date.now();
    return true;
  }

  regenerate(amount: number): void {
    if (amount < 0) throw new Error('Regeneration amount must be non-negative');
    this.energy = Math.min(this.maxEnergy, this.energy + amount);
    this.lastUpdated = Date.now();
  }

  // TODO: Integrate with Time System and ChronotypeWindowVO for circadian rhythm-driven regeneration.
  //       This requires registering with the time system's scheduler, and using the individual's chronotype data
  //       to determine optimal regeneration windows and apply debuffs/buffs accordingly.

  // TODO: Publish EnergySpentEvent and EnergyRegeneratedEvent (see EnergyAggregate).
  //       For event sourcing, persist all energy state changes as events.

  // TODO: Define and use a production-grade Domain Exception/Error system for failed operations and invariants.
}
