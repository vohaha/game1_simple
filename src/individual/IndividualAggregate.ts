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

  getTrait(key: string): IndividualTraitVO | undefined {
    return this.individualEntity.getTrait(key);
  }

  getAllTraits(): IndividualTraitVO[] {
    return this.individualEntity.getAllTraits();
  }

  setTrait(trait: IndividualTraitVO): void {
    this.individualEntity.setTrait(trait);
  }

  setState(key: string, value: unknown): void {
    this.individualEntity.setState(key, value);
  }

  getState(key: string): unknown {
    return this.individualEntity.getState(key);
  }

  getSnapshot() {
    return this.individualEntity.getSnapshot();
  }
}
