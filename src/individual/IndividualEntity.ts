import { IIndividualEntity, IndividualSnapshot } from '../interfaces/IIndividualEntity';
import { IndividualTraitVO } from './IndividualTraitVO';

/**
 * Entity representing a simulated individual.
 * All state-changing operations should go through the aggregate.
 *
 * Encapsulates core identity, immutable and dynamic traits, and state.
 *
 * TODO: Enforce invariants for trait assignment and mutation via dedicated methods.
 * TODO: Integrate psychological/behavioral state modeling.
 */
export class IndividualEntity implements IIndividualEntity {
  private readonly id: string;
  private name: string;
  private readonly traits: Map<string, IndividualTraitVO>;
  private state: Map<string, unknown>;

  constructor(props: {
    id: string;
    name: string;
    traits?: IndividualTraitVO[];
    state?: Map<string, unknown>;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.traits = new Map();
    (props.traits || []).forEach((trait) => this.traits.set(trait.key, trait));
    this.state = props.state ? new Map(props.state) : new Map();
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getTrait(key: string): IndividualTraitVO | undefined {
    return this.traits.get(key);
  }

  getAllTraits(): IndividualTraitVO[] {
    return Array.from(this.traits.values());
  }

  getState(key: string): unknown {
    return this.state.get(key);
  }

  /**
   * Directly sets a trait value.
   * Should only be called from the Aggregate after invariants are enforced.
   * @internal
   */
  setTrait(vo: IndividualTraitVO): void {
    // TODO: Enforce domain invariants and trait addition/removal rules.
    this.traits.set(vo.key, vo);
  }

  /**
   * Updates the dynamic psychological/physical state.
   * Should only be called via aggregate methods.
   * @internal
   */
  setState(key: string, value: unknown): void {
    // TODO: Define valid state keys and rules.
    this.state.set(key, value);
  }

  getSnapshot(): IndividualSnapshot {
    return {
      id: this.id,
      name: this.name,
      traits: this.getAllTraits().map((trait) => ({ key: trait.key, value: trait.value })),
      state: Object.fromEntries(this.state.entries()),
    };
  }

  // TODO: Model trait lock, evolution, aging, and other psychological phenomena.

  // TODO: Integrate event sourcing hooks if required.
}
