import { IProductEntity } from './IProductEntity';
import {
  ProductSnapshot,
  ProductOwnerType,
  ProductType,
  ProductState,
} from '../production/ProductEntity';

/**
 * IProductAggregate defines the aggregate root interface for product creation, management,
 * and cross-context orchestration in Game1's production domain.
 */
export interface IProductAggregate {
  getId(): string;
  getOwnerType(): ProductOwnerType;
  getOwnerId(): string;
  getCreatedAt(): Date;
  getName(): string;
  getProductType(): ProductType;
  getValue(): number;
  getState(): ProductState;
  getMetadata(): Record<string, unknown> | undefined;

  /**
   * Changes the state of the product (for workflow, review, or archiving)
   */
  setState(newState: ProductState): void;

  /**
   * Updates the value/score of the product, e.g., based on review or use-case.
   */
  updateValue(newValue: number): void;

  /**
   * Returns an immutable snapshot of the product's current state for API or audit.
   */
  getSnapshot(): ProductSnapshot;

  // TODO: Add methods for workflow transitions, assignment, and inter-context product exchanges as the domain evolves.
}
