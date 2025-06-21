// IProductEntity defines the contract for domain entities representing products
// produced by an individual or group in the Game1 domain model.

import {
  ProductSnapshot,
  ProductOwnerType,
  ProductType,
  ProductState,
} from '../production/ProductEntity';

export interface IProductEntity {
  getId(): string;
  getOwnerType(): ProductOwnerType;
  getOwnerId(): string;
  getCreatedAt(): Date;
  getName(): string;
  getProductType(): ProductType;
  getValue(): number;
  getState(): ProductState;
  getMetadata(): Record<string, unknown> | undefined;
  setState(newState: ProductState): void;
  updateValue(newValue: number): void;
  getSnapshot(): ProductSnapshot;
  // TODO: Extend with methods for domain-specific life cycle, value adjustment, or ownership transfer if needed.
}
