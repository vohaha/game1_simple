// Value Object encapsulating an immutable individual trait
// Add new trait types and value validation as needed for your domain

import { ValueObject } from '../shared/ValueObject';

export type TraitType = 'personality' | 'skill' | 'cognitive' | 'physical'; // Extend as needed

export class IndividualTraitVO implements ValueObject<IndividualTraitVO> {
  readonly key: string;
  readonly value: unknown;
  readonly type: TraitType;

  constructor(key: string, value: unknown, type: TraitType) {
    if (!key) throw new Error('Trait key must be defined');
    // TODO: Validate value shape for each trait type domain.
    this.key = key;
    this.value = value;
    this.type = type;
    Object.freeze(this);
  }

  equals(other: IndividualTraitVO): boolean {
    return (
      other instanceof IndividualTraitVO &&
      this.key === other.key &&
      this.type === other.type &&
      JSON.stringify(this.value) === JSON.stringify(other.value)
    );
  }

  // TODO: Add type guards or schema validation for well-formed trait values.
}
