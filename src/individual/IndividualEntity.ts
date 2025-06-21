game1_simple/src/individual/IndividualEntity.ts
// Entity representing a single individual in the simulation

export class IndividualEntity {
  private readonly id: string;
  private name: string;

  // Traits as VOs (examples: cognitive, social, skills)
  private readonly traits: Record<string, unknown>;

  // Current psychological/physical state (VOs)
  private readonly state: Record<string, unknown>;

  constructor(
    id: string,
    name: string,
    traits: Record<string, unknown>,
    state: Record<string, unknown>
  ) {
    this.id = id;
    this.name = name;
    this.traits = traits;
    this.state = state;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getTrait(trait: string): unknown {
    return this.traits[trait];
  }

  getState(key: string): unknown {
    return this.state[key];
  }
}
