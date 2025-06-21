import { IndividualTraitVO } from '../individual/IndividualTraitVO';
import { IndividualSnapshot } from './IIndividualEntity';

/**
 * Interface for the IndividualAggregate - defines DDD aggregate root operations
 * for managing a simulated individual's identity, traits, and psychological state.
 */
export interface IIndividualAggregate {
  getId(): string;
  getName(): string;
  getTrait(key: string): IndividualTraitVO | undefined;
  getAllTraits(): IndividualTraitVO[];
  getState(key: string): unknown;
  setTrait(trait: IndividualTraitVO): void;
  setState(key: string, value: unknown): void;
  getSnapshot(): IndividualSnapshot;

  // TODO: Add methods to coordinate trait evolution, state transitions, event emission, etc.
}
