import { IEnergyAggregate } from '../interfaces/IEnergyAggregate';
import { IEnergyEntity } from '../interfaces/IEnergyEntity';
import { EnergyValueObject } from './EnergyValueObject';

// The aggregate root for energy-related operations within a bounded context.
// Coordinates and enforces invariants for EnergyEntity and related value objects/services.
export class EnergyAggregate implements IEnergyAggregate {
  private readonly energyEntity: IEnergyEntity;

  constructor(energyEntity: IEnergyEntity) {
    this.energyEntity = energyEntity;
  }

  getId(): string {
    return this.energyEntity.getId();
  }

  getCurrentEnergy(): number {
    return this.energyEntity.getCurrentEnergy();
  }

  /**
   * Attempts to spend a defined amount of energy.
   * @returns true if successful, false if not enough energy.
   */
  spendEnergy(vo: EnergyValueObject): boolean {
    if (vo.amount <= 0) return false;
    // TODO: Add domain event publishing for spend if needed.
    return this.energyEntity.spend(vo.amount);
  }

  /**
   * Regenerates a defined amount of energy, respecting maximums.
   */
  regenerateEnergy(vo: EnergyValueObject): void {
    if (vo.amount <= 0) return;
    // TODO: Enforce circadian, trait- or event-driven regeneration logic.
    this.energyEntity.regenerate(vo.amount);
  }

  /**
   * Returns a snapshot of aggregate state for read-only queries.
   */
  getSnapshot() {
    return this.energyEntity.getSnapshot();
  }

  // TODO: Implement scheduling hooks with the Time System for automatic regeneration.
  // TODO: Integrate cross-context triggers for market/deal actions that require energy.
  // TODO: Support transactional invariants as required by application services.
}
