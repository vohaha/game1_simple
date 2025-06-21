game1_simple/src/energy/EnergyDomainService.ts
// Domain Service for cross-aggregate energy operations
// Used when energy logic cannot clearly belong to a single aggregate/entity

import { EnergyAggregate } from './EnergyAggregate';
import { EnergyValueObject } from './EnergyValueObject';

export class EnergyDomainService {
  // Transfer energy between two aggregates
  transferEnergy(
    from: EnergyAggregate,
    to: EnergyAggregate,
    amount: number
  ): boolean {
    const energyVO = new EnergyValueObject(amount);
    if (from.getCurrentEnergy() < energyVO.amount) return false;
    if (!from.spendEnergy(energyVO.amount)) return false;
    to.regenerateEnergy(energyVO.amount);
    return true;
  }

  // Example: find aggregates eligible for regeneration based on a predicate
  filterAggregatesForRegen(
    aggregates: EnergyAggregate[],
    shouldRegen: (ea: EnergyAggregate) => boolean
  ): EnergyAggregate[] {
    return aggregates.filter(shouldRegen);
  }
}
