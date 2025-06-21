import { EnergyEntity } from './EnergyEntity';
import { EnergyValueObject } from './EnergyValueObject';

// Aggregate root for the Energy context
export class EnergyAggregate {
  private readonly energyEntity: EnergyEntity;

  constructor(energyEntity: EnergyEntity) {
    this.energyEntity = energyEntity;
  }

  getId(): string {
    return this.energyEntity.getId();
  }

  getCurrentEnergy(): number {
    return this.energyEntity.getEnergy();
  }

  spendEnergy(amount: number): boolean {
    const vo = new EnergyValueObject(amount);
    return this.energyEntity.spend(vo.amount);
  }

  regenerateEnergy(amount: number): void {
    const vo = new EnergyValueObject(amount);
    this.energyEntity.regenerate(vo.amount);
  }
}
