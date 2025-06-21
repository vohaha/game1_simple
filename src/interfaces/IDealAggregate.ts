import { IDealEntity, DealSnapshot } from './IDealEntity';
import { DealTermVO } from '../deal/DealTermVO';

/**
 * Interface for the DealAggregate - aggregate root for the Deal context in Game1.
 * Orchestrates formal agreements, obligation enforcement, verification, reputation influence, and life-cycle events.
 * All mutating operations should ensure aggregate consistency and emit relevant events via DomainEventBus
 * for cross-context integration (see shared/events/DomainEvent.ts and integration/DomainEventBus.ts).
 */
export interface IDealAggregate {
  getId(): string;
  getPartyIds(): string[];
  getTerms(): Record<string, unknown>;
  getState(): 'Active' | 'Fulfilled' | 'Broken';
  getCreatedAt(): Date;
  getVerificationLog(): Array<{
    timestamp: Date;
    verifiedBy: string;
    passed: boolean;
    note?: string;
  }>;

  getSnapshot(): DealSnapshot;

  /**
   * Adds a deal term (immutable after deal is active).
   * Should only be used during negotiation. Emits a term-related event if required by integration policy.
   */
  addTerm(term: DealTermVO): void;

  /**
   * Verifies a specific deal clause by an actor; updates verification log and may mark deal as Fulfilled or Broken.
   * Upon fulfillment or breach, MUST emit DealFulfilledEvent or DealBrokenEvent via DomainEventBus.
   */
  verifyClause(verifiedBy: string, passed: boolean, note?: string): void;

  /**
   * Cancels or breaks the deal preemptively if allowed by terms. Returns true if successful.
   * Emits event if cancellation or penalty triggers integration.
   */
  cancelDeal(reason: string): boolean;

  /**
   * Evaluates if all terms are currently fulfilled, updates state accordingly.
   * If state changes as a result, triggers the appropriate fulfillment/break event.
   */
  evaluateFulfillment(): boolean;

  // TODO: Add methods for renegotiation, expiration, dispute resolution, penalty calculation, and their required event publishing.
  // TODO: All aggregate invariants and state transitions should emit events for observability and integration with other bounded contexts, e.g., cross-context reputation signaling and trust adjustment.
}
