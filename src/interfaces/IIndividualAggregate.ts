import { IndividualTraitVO } from '../individual/IndividualTraitVO';
import { IndividualSnapshot } from './IIndividualEntity';
import { ValueObject } from '../shared/ValueObject';

/**
 * Interface for the IndividualAggregate - defines DDD aggregate root operations
 * for managing a simulated individual's identity, traits, and psychological state.
 *
 * All trait-based VOs must implement the ValueObject interface for deep equality
 * and event-based coordination. Use the event bus in all trait-changing operations.
 */
export interface IIndividualAggregate {
  getId(): string;
  getName(): string;
  getTrait(key: string): IndividualTraitVO | undefined;
  getAllTraits(): IndividualTraitVO[];
  getState(key: string): unknown;
  setTrait(trait: IndividualTraitVO): void; // Should emit TraitChangedEvent via DomainEventBus
  setState(key: string, value: unknown): void;
  getSnapshot(): IndividualSnapshot;

  // TODO: Add methods to coordinate trait evolution, state transitions, event emission, etc.
  //       See /shared/events/DomainEvent.ts and use the integration/DomainEventBus for context signaling.
}
