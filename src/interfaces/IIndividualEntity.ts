export type IndividualSnapshot = {
  id: string;
  name: string;
  traits: Array<{ key: string; value: unknown }>;
  state: Record<string, unknown>;
};

/**
 * Interface for the IndividualEntity, the atomic identity unit in the Individual context.
 */
export interface IIndividualEntity {
  getId(): string;
  getName(): string;
  getTrait(key: string): unknown;
  getAllTraits(): Array<{ key: string; value: unknown }>;
  getState(key: string): unknown;
  setTrait(trait: { key: string; value: unknown }): void;
  setState(key: string, value: unknown): void;
  getSnapshot(): IndividualSnapshot;
  // TODO: Add methods if trait mutability, event sourcing, or state-lock patterns are needed.
}
