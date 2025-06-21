/**
 * Interface for the DealEntity, representing a formal agreement or deal
 * between two or more parties (individuals or groups) within the simulation.
 * Encapsulates core identity, immutable terms, current deal state,
 * and verification/compliance history.
 */

export type DealSnapshot = {
  id: string;
  partyIds: string[];
  terms: Record<string, unknown>;
  createdAt: Date;
  state: 'Active' | 'Fulfilled' | 'Broken';
  verificationLog: Array<{
    timestamp: Date;
    verifiedBy: string;
    passed: boolean;
    note?: string;
  }>;
};

export interface IDealEntity {
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
  verifyClause(verifiedBy: string, passed: boolean, note?: string): void;
  getSnapshot(): DealSnapshot;

  // TODO: Add methods to support renegotiation, expiration checks, and penalty calculation.
}
