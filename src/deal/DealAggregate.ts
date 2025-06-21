import { DealEntity } from './DealEntity';
import { DealTermVO } from './DealTermVO';
import { domainEventBus } from '../integration/DomainEventBus';
import { DealFulfilledEvent, DealBrokenEvent } from '../shared/events/DomainEvent';

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
    // TODO: Implement renegotiation logic if allowed by rules
  }

  // Verify a deal clause and update history/state
  verifyClause(verifiedBy: string, passed: boolean, note?: string): void {
    this.dealEntity.verifyClause(verifiedBy, passed, note);

    // Event-driven integration: emit fulfilled or broken events as appropriate
    const newState = this.getState();
    if (newState === 'Fulfilled') {
      const event: DealFulfilledEvent = {
        eventType: 'DealFulfilled',
        context: 'Deal',
        aggregateId: this.getId(),
        timestamp: Date.now(),
        dealId: this.getId(),
        fulfilledBy: this.getPartyIds(),
      };
      domainEventBus.publish(event);
    } else if (newState === 'Broken') {
      const event: DealBrokenEvent = {
        eventType: 'DealBroken',
        context: 'Deal',
        aggregateId: this.getId(),
        timestamp: Date.now(),
        dealId: this.getId(),
        brokenBy: [verifiedBy],
        reason: note || 'unspecified',
      };
      domainEventBus.publish(event);
    }
  }

  getSnapshot() {
    return this.dealEntity.getSnapshot();
  }
}
