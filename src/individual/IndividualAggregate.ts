import { IndividualEntity } from './IndividualEntity';
import { IndividualTraitVO } from './IndividualTraitVO';
import { domainEventBus } from '../integration/DomainEventBus';
import { TraitChangedEvent } from '../shared/events/DomainEvent';

// Aggregate root for the Individual context
export class IndividualAggregate {
  private readonly individualEntity: IndividualEntity;

  constructor(individualEntity: IndividualEntity) {
    this.individualEntity = individualEntity;
  }

  get id(): string {
    return this.individualEntity.getId();
  }

  get name(): string {
    return this.individualEntity.getName();
  }

  getTrait(key: string): IndividualTraitVO | undefined {
    return this.individualEntity.getTrait(key);
  }

  get allTraits(): IndividualTraitVO[] {
    return this.individualEntity.getAllTraits();
  }

  setTrait(trait: IndividualTraitVO): void {
    this.individualEntity.setTrait(trait);
    domainEventBus.publish({
      eventType: 'TraitChanged',
      context: 'Individual',
      aggregateId: this.id,
      timestamp: Date.now(),
      traitKey: trait.key,
      oldValue: this.individualEntity.getTrait(trait.key)?.value,
      newValue: trait.value,
      // Optionally: changeReason for provenance (to be injected from aggregate/service if needed)
    } satisfies TraitChangedEvent);
  }

  setState(key: string, value: unknown): void {
    this.individualEntity.setState(key, value);
  }

  getState(key: string): unknown {
    return this.individualEntity.getState(key);
  }

  get snapshot() {
    return this.individualEntity.getSnapshot();
  }
}
