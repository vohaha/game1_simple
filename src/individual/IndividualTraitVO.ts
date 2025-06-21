game1_simple/src/individual/IndividualTraitVO.ts
// Value Object encapsulating an immutable individual trait (e.g., personality, skill, cognitive capacity)

export class IndividualTraitVO {
  readonly key: string;
  readonly value: unknown;

  constructor(key: string, value: unknown) {
    if (!key) throw new Error('Trait key must be defined');
    this.key = key;
    this.value = value;
    Object.freeze(this); // ensure immutability for the VO
  }

  equals(other: IndividualTraitVO): boolean {
    return this.key === other.key &&
      JSON.stringify(this.value) === JSON.stringify(other.value);
  }
}
