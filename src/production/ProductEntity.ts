// ProductEntity represents a tangible or intangible outcome produced by an individual or group.
// Encapsulates identity, ownership, provenance, type, value, and production state.

export type ProductOwnerType = 'individual' | 'group';
export enum ProductState {
  Created = 'created',
  InReview = 'in_review',
  Completed = 'completed',
  Archived = 'archived',
}
// TODO: Evolve to more robust product type taxonomy as needed
export type ProductType = 'generic' | 'software' | 'artifact' | 'service';

export type ProductSnapshot = {
  id: string;
  name: string;
  ownerType: ProductOwnerType;
  ownerId: string;
  createdAt: Date;
  productType: ProductType;
  value: number;
  state: ProductState;
  metadata?: Record<string, unknown>;
};

import { domainEventBus } from '../integration/DomainEventBus';
import { ProductCreatedEvent, ProductStateChangedEvent } from '../shared/events/DomainEvent';

export class ProductEntity {
  private readonly id: string;
  private readonly name: string;
  private readonly ownerType: ProductOwnerType;
  private readonly ownerId: string;
  private readonly createdAt: Date;
  private readonly productType: ProductType;
  private value: number;
  private state: ProductState;
  private readonly metadata?: Record<string, unknown>;

  constructor(props: {
    id: string;
    name: string;
    ownerType: ProductOwnerType;
    ownerId: string;
    productType: ProductType;
    value: number;
    metadata?: Record<string, unknown>;
    createdAt?: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.ownerType = props.ownerType;
    this.ownerId = props.ownerId;
    this.productType = props.productType;
    this.value = props.value;
    this.metadata = props.metadata;
    this.createdAt = props.createdAt ?? new Date();
    this.state = ProductState.Created;
    domainEventBus.publish({
      eventType: 'ProductCreated',
      context: 'Production',
      aggregateId: this.id,
      timestamp: Date.now(),
      productId: this.id,
      ownerType: this.ownerType,
      ownerId: this.ownerId,
      productType: this.productType,
    } as ProductCreatedEvent);
  }

  getId(): string {
    return this.id;
  }

  getOwnerType(): ProductOwnerType {
    return this.ownerType;
  }

  getOwnerId(): string {
    return this.ownerId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getName(): string {
    return this.name;
  }

  getProductType(): ProductType {
    return this.productType;
  }

  getValue(): number {
    return this.value;
  }

  getState(): ProductState {
    return this.state;
  }

  getMetadata(): Record<string, unknown> | undefined {
    return this.metadata;
  }

  setState(newState: ProductState) {
    // TODO: Add transition validation if domain requires
    const oldState = this.state;
    this.state = newState;
    domainEventBus.publish({
      eventType: 'ProductStateChanged',
      context: 'Production',
      aggregateId: this.id,
      timestamp: Date.now(),
      productId: this.id,
      oldState: oldState,
      newState: newState,
    } as ProductStateChangedEvent);
  }

  updateValue(newValue: number) {
    // TODO: Application/Domain service should enforce invariant checks (e.g. allowed min/max)
    this.value = newValue;
  }

  getSnapshot(): ProductSnapshot {
    return {
      id: this.id,
      name: this.name,
      ownerType: this.ownerType,
      ownerId: this.ownerId,
      createdAt: this.createdAt,
      productType: this.productType,
      value: this.value,
      state: this.state,
      metadata: this.metadata,
    };
  }
}
