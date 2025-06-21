import { IProductAggregate } from '../interfaces/IProductAggregate';
import { IProductEntity } from '../interfaces/IProductEntity';
import { ProductSnapshot, ProductState } from './ProductEntity';

/**
 * Aggregate root for Product domain, encapsulating a ProductEntity.
 * Responsible for coordination and domain-rule enforcement for product management and state transitions.
 */
export class ProductAggregate implements IProductAggregate {
  private readonly productEntity: IProductEntity;

  constructor(entity: IProductEntity) {
    this.productEntity = entity;
  }

  getId(): string {
    return this.productEntity.getId();
  }

  getOwnerType(): 'individual' | 'group' {
    return this.productEntity.getOwnerType();
  }

  getOwnerId(): string {
    return this.productEntity.getOwnerId();
  }

  getCreatedAt(): Date {
    return this.productEntity.getCreatedAt();
  }

  getName(): string {
    return this.productEntity.getName();
  }

  getProductType() {
    return this.productEntity.getProductType();
  }

  getValue(): number {
    return this.productEntity.getValue();
  }

  getState() {
    return this.productEntity.getState();
  }

  getMetadata(): Record<string, unknown> | undefined {
    return this.productEntity.getMetadata();
  }

  setState(newState: ProductState): void {
    // TODO: Enforce domain invariants for state transitions (e.g., cannot move to completed before in_review)
    //       Implement transaction/event contract if state affects other contexts.
    this.productEntity.setState(newState);
  }

  updateValue(newValue: number): void {
    // TODO: Enforce value invariants (e.g., allowed range) here.
    //       Trigger value change events if required for cross-context coordination.
    this.productEntity.updateValue(newValue);
  }

  getSnapshot(): ProductSnapshot {
    return this.productEntity.getSnapshot();
  }

  // TODO: Implement workflow transitions, review/approval cascades, and workflow event publishing in production.
  //       All value/state transitions should be validated and be ready for event-driven integration.
}
