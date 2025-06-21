import { IDealEntity, DealSnapshot } from './IDealEntity';
import { DealTermVO } from '../deal/DealTermVO';

/**
 * Interface for the DealAggregate - aggregate root for the Deal context in Game1.
 * Orchestrates formal agreements, obligation enforcement, verification, reputation influence, and life-cycle events.
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
   * Add a deal term (immutable after deal is active). Should only be used during negotiation.
   */
  addTerm(term: DealTermVO): void;

  /**
   * Verify a specific deal clause by an actor; will update verification log and potentially mark deal as Fulfilled or Broken.
   */
  verifyClause(verifiedBy: string, passed: boolean, note?: string): void;

  /**
   * Cancel or break the deal preemptively if allowed by terms. Returns true if successful.
   */
  cancelDeal(reason: string): boolean;

  /**
   * Evaluate if all terms are currently fulfilled, update state accordingly.
   */
  evaluateFulfillment(): boolean;

  // TODO: Add methods for renegotiation, expiration, dispute resolution, and penalty calculation.
  // TODO: Integrate event publishing and cross-context reputation signaling upon fulfillment/breach.
}
