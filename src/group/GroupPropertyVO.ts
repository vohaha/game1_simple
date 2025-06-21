game1_simple/src/group/GroupPropertyVO.ts
// Value Object representing an immutable group property (e.g., cohesion, specialization, trust metrics)

export class GroupPropertyVO {
  readonly key: string;
  readonly value: unknown;

  constructor(key: string, value: unknown) {
    if (!key) throw new Error('Group property key must be defined');
    this.key = key;
    this.value = value;
    Object.freeze(this);
  }

  equals(other: GroupPropertyVO): boolean {
    return this.key === other.key &&
      JSON.stringify(this.value) === JSON.stringify(other.value);
  }
}
