// Core event infrastructure for Game1 domain observability and event-driven integration.
// All domain events should extend DomainEventBase and declare an explicit event type.

// -----------------------------------------------------------------------
// DomainEventBase marks all domain events (for bus, persistence, integration, testing)
export interface DomainEventBase {
  readonly eventType: string;
  readonly aggregateId: string;
  readonly timestamp: number; // ms since epoch
  // Optionally the identity/context that triggered the event
  readonly triggeredBy?: string;
}

// -----------------------------------------------------------------------
// Common domain events across bounded contexts

export interface EnergySpentEvent extends DomainEventBase {
  eventType: 'EnergySpent';
  context: 'Energy';
  amount: number;
  reason?: string; // e.g., action taken or ref to game mechanic
}

export interface EnergyRegeneratedEvent extends DomainEventBase {
  eventType: 'EnergyRegenerated';
  context: 'Energy';
  amount: number;
  regenerationMethod?: string; // e.g. sleep, time window, buff
}

export interface TraitChangedEvent extends DomainEventBase {
  eventType: 'TraitChanged';
  context: 'Individual';
  traitKey: string;
  oldValue: unknown;
  newValue: unknown;
  changeReason?: string;
}

export interface DealFulfilledEvent extends DomainEventBase {
  eventType: 'DealFulfilled';
  context: 'Deal';
  dealId: string;
  fulfilledBy: string[]; // party IDs
}

export interface DealBrokenEvent extends DomainEventBase {
  eventType: 'DealBroken';
  context: 'Deal';
  dealId: string;
  brokenBy: string[]; // party IDs
  reason: string;
}

export interface GroupMembershipChangedEvent extends DomainEventBase {
  eventType: 'GroupMembershipChanged';
  context: 'Group';
  groupId: string;
  memberId: string;
  action: 'added' | 'removed';
  role?: string;
}

export interface ProductCreatedEvent extends DomainEventBase {
  eventType: 'ProductCreated';
  context: 'Production';
  productId: string;
  ownerType: 'individual' | 'group';
  ownerId: string;
  productType: string;
}

export interface ProductStateChangedEvent extends DomainEventBase {
  eventType: 'ProductStateChanged';
  context: 'Production';
  productId: string;
  oldState: string;
  newState: string;
}

// Export union for event queueing and dispatch
export type Game1DomainEvent =
  | EnergySpentEvent
  | EnergyRegeneratedEvent
  | TraitChangedEvent
  | DealFulfilledEvent
  | DealBrokenEvent
  | GroupMembershipChangedEvent
  | ProductCreatedEvent
  | ProductStateChangedEvent
  // Extend with additional events as needed
  ;
