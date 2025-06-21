import { IIndividualEntity, IndividualSnapshot } from '../interfaces/IIndividualEntity';
import { IndividualTraitVO } from './IndividualTraitVO';
import { domainEventBus } from '../integration/DomainEventBus';
import { TraitChangedEvent } from '../shared/events/DomainEvent';

/**
 * Entity representing a simulated individual.
 * All state-changing operations go through the aggregate for invariants.
 *
 * Encapsulates unique identity, immutable traits, dynamic psychological/physiological state.
 *
 * TODO: All mutators must enforce domain invariants (trait validity, mutation constraints).
 * TODO: Methods must emit events using DomainEventBus for observability and integration.
 * TODO: Integrate explicit behavioral/psychological state, aging, and locking mechanisms.
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
    this.traits = new Map<string, IndividualTraitVO>();
    if (props.traits) {
      props.traits.forEach((trait) => this.traits.set(trait.key, trait));
    }
    this.state = props.state ?? new Map<string, unknown>();
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

  setTrait(vo: IndividualTraitVO): void {
    const prev = this.traits.get(vo.key);
    // TODO: Enforce trait addition/removal invariants and authorizations for this change.
    this.traits.set(vo.key, vo);
    domainEventBus.publish({
      eventType: 'TraitChanged',
      context: 'Individual',
      aggregateId: this.getId(),
      timestamp: Date.now(),
      traitKey: vo.key,
      oldValue: prev?.value,
      newValue: vo.value,
      // Optionally: changeReason for provenance (to be injected from aggregate/service if needed)
    } satisfies TraitChangedEvent);
  }

  setState(key: string, value: unknown): void {
    // TODO: Enforce valid state keys, type constraints, and domain logic for state transitions.
    this.state.set(key, value);
    // TODO: Emit an event if state transitions are relevant for integration.
  }

  getSnapshot(): IndividualSnapshot {
    return {
      id: this.id,
      name: this.name,
      traits: Array.from(this.traits.entries()).map(([key, trait]) => ({
        key: trait.key,
        value: trait.value,
      })),
      state: Object.fromEntries(this.state.entries()),
    };
  }

  // TODO: Implement trait locking, controlled evolution, aging, and related psychological phenomena.

  // TODO: Integrate event sourcing (record all mutative actions for replay/audit).
}
