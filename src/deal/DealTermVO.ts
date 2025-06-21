game1_simple/src/deal/DealTermVO.ts
// Value Object representing an immutable deal term or clause

export class DealTermVO {
  readonly key: string;
  readonly value: unknown;

  constructor(key: string, value: unknown) {
    if (!key) throw new Error('Deal term key must be defined');
    this.key = key;
    this.value = value;
    Object.freeze(this);
  }

  equals(other: DealTermVO): boolean {
    return this.key === other.key &&
      JSON.stringify(this.value) === JSON.stringify(other.value);
  }
}
