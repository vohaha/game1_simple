import { EnergyValueObject } from '../energy/EnergyValueObject';
import { EnergySnapshot } from './IEnergyEntity';

/**
 * Interface for the EnergyAggregate - defines operations for managing energy domain logic
 * in the DDD aggregate root style.
 */
export interface IEnergyAggregate {
  getId(): string;
  getCurrentEnergy(): number;
  getSnapshot(): EnergySnapshot;
  spendEnergy(vo: EnergyValueObject): boolean;
  regenerateEnergy(vo: EnergyValueObject): void;

  // TODO: Add methods for circadian auto-regeneration hooks, domain event publishing, etc.
}
