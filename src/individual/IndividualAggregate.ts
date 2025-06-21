game1_simple/src/individual/IndividualAggregate.ts
import { IndividualEntity } from './IndividualEntity';
import { IndividualTraitVO } from './IndividualTraitVO';

// Aggregate root for the Individual context
export class IndividualAggregate {
  private readonly individualEntity: IndividualEntity;

  constructor(individualEntity: IndividualEntity) {
    this.individualEntity = individualEntity;
  }

  getId(): string {
    return this.individualEntity.getId();
  }

  getName(): string {
    return this.individualEntity.getName();
  }

  getTrait(key: string): unknown {
    return this.individualEntity.getTrait(key);
  }

  // Add a trait (returns a new trait VO, immutably modeled)
  addTrait(trait: IndividualTraitVO): void {
    // Logic for adding traits would update VO in a real implementation
    // Placeholder: method stub only
  }

  // Retrieve current state value (such as mood, energy, etc.)
  getState(key: string): unknown {
    return this.individualEntity.getState(key);
  }
}
