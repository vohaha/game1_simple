import { DealEntity } from './DealEntity';
import { DealTermVO } from './DealTermVO';

// Aggregate root for the Deal context
export class DealAggregate {
  private readonly dealEntity: DealEntity;

  constructor(dealEntity: DealEntity) {
    this.dealEntity = dealEntity;
  }

  getId(): string {
    return this.dealEntity.getId();
  }

  getPartyIds(): string[] {
    return this.dealEntity.getPartyIds();
  }

  getTerms(): Record<string, unknown> {
    return this.dealEntity.getTerms();
  }

  getState(): string {
    return this.dealEntity.getState();
  }

  getCreatedAt(): Date {
    return this.dealEntity.getCreatedAt();
  }

  getVerificationLog() {
    return this.dealEntity.getVerificationLog();
  }

  // Add a deal term (stub: would update the set of terms in a real implementation)
  addTerm(term: DealTermVO): void {
    // Placeholder: adding new terms not supported in immutable design
  }

  // Verify a deal clause and update history/state
  verifyClause(verifiedBy: string, passed: boolean, note?: string): void {
    this.dealEntity.verifyClause(verifiedBy, passed, note);
  }
}
