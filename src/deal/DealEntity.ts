game1_simple/src/deal/DealEntity.ts
// Entity representing a formalized deal or agreement between two or more parties

export class DealEntity {
  private readonly id: string;
  private readonly partyIds: string[]; // IDs of involved parties (individuals or groups)
  private readonly terms: Record<string, unknown>; // Deal terms/specifications (immutable after creation)
  private readonly createdAt: Date;

  // Deal state (e.g., Active, Fulfilled, Broken), not part of terms
  private state: 'Active' | 'Fulfilled' | 'Broken';

  // Verification history, showing fulfilled or broken clauses
  private verificationLog: Array<{ timestamp: Date; verifiedBy: string; passed: boolean; note?: string }>;

  constructor(
    id: string,
    partyIds: string[],
    terms: Record<string, unknown>,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.partyIds = [...partyIds];
    this.terms = Object.freeze({ ...terms });
    this.createdAt = createdAt;
    this.state = 'Active';
    this.verificationLog = [];
  }

  getId(): string {
    return this.id;
  }

  getPartyIds(): string[] {
    return [...this.partyIds];
  }

  getTerms(): Record<string, unknown> {
    return this.terms;
  }

  getState(): string {
    return this.state;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getVerificationLog() {
    return [...this.verificationLog];
  }

  // Mark deal as fulfilled/broken if verification succeeds/fails
  verifyClause(verifiedBy: string, passed: boolean, note?: string): void {
    this.verificationLog.push({
      timestamp: new Date(),
      verifiedBy,
      passed,
      note,
    });

    // Update state on major verification
    if (passed && this.state === 'Active') {
      this.state = 'Fulfilled';
    }
    if (!passed && this.state === 'Active') {
      this.state = 'Broken';
    }
  }
}
