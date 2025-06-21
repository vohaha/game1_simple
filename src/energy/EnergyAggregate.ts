import { IEnergyAggregate } from '../interfaces/IEnergyAggregate';
import { IEnergyEntity } from '../interfaces/IEnergyEntity';
import { EnergyValueObject } from './EnergyValueObject';
import { domainEventBus } from '../integration/DomainEventBus';
import { EnergySpentEvent, EnergyRegeneratedEvent } from '../shared/events/DomainEvent';

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
    const success = this.energyEntity.spend(vo.amount);
    if (success) {
      const event: EnergySpentEvent = {
        eventType: 'EnergySpent',
        context: 'Energy',
        aggregateId: this.getId(),
        timestamp: Date.now(),
        amount: vo.amount,
      };
      domainEventBus.publish(event);
    }
    return success;
  }

  /**
   * Regenerates a defined amount of energy, respecting maximums.
   */
  regenerateEnergy(vo: EnergyValueObject): void {
    if (vo.amount <= 0) return;
    // TODO: Enforce circadian, trait- or event-driven regeneration logic.
    this.energyEntity.regenerate(vo.amount);
    const event: EnergyRegeneratedEvent = {
      eventType: 'EnergyRegenerated',
      context: 'Energy',
      aggregateId: this.getId(),
      timestamp: Date.now(),
      amount: vo.amount,
    };
    domainEventBus.publish(event);
  }

  /**
   * Returns a snapshot of aggregate state for read-only queries.
   */
  getSnapshot() {
    return this.energyEntity.getSnapshot();
  }

  // TODO: Integrate with the Time System and ChronotypeWindowVO to schedule automatic energy regeneration
  //       using circadian event triggers. Production logic must invoke regeneration respecting time windows,
  //       traits and global events. Hook into event bus for cross-context triggers (market, deal).
  // TODO: Support transactional invariants as required by application services.
}
