import { AbstractEntity, DomainError } from '../../../core/ddd';
import { EntityId } from '../../../core/types';

interface IEffect {}

enum ProductCategories {
  'domestic',
  'consumable',
  'component',
}

export interface IProduct {
  name: string;
  quality: number;
  category: Set<ProductCategories>;
  effects: IEffect[];
  cost: number;
}

export class Product extends AbstractEntity<EntityId> implements IProduct {
  public readonly name;
  public readonly quality;
  public readonly category;
  public readonly effects;
  public readonly cost;

  private constructor(
    id: EntityId,
    name: string,
    quality: number,
    category: Set<ProductCategories>,
    effects: IEffect[],
    cost: number,
  ) {
    super(id);
    this.name = name;
    this.quality = quality;
    this.category = category;
    this.effects = effects;
    this.cost = cost;
  }

  public static create(
    id: EntityId,
    name: string,
    quality: number,
    category: Set<ProductCategories>,
    effects: IEffect[],
    cost: number,
  ): Product {
    return new Product(id, name, quality, category, effects, cost);
  }
}

class ProductInvariants {
  static assertProductNameExists(name: string): void {
    if (!name) {
      throw new EmptyProductName(name);
    }
  }

  static assertQualityValidity(quality: number): void {
    if (quality < 0 || quality > 100) {
      throw new InvalidProductQuality(quality);
    }
  }

  static assertCategoryValidity(category: string): void {
    if (!Object.values(ProductCategories).includes(category)) {
      throw new InvalidProductCategory(category);
    }
  }

  static assertCostValidity(cost: number): void {
    if (cost <= 0) {
      throw new InvalidProductCost(cost);
    }
  }
}

export class EmptyProductName extends DomainError {
  constructor(name: string) {
    super(`Product name cannot be empty: <value>${name}</value>`);
  }
}

export class InvalidProductQuality extends DomainError {
  constructor(quality: number) {
    super(`Product quality must be between 0 and 100: <value>${quality}</value>`);
  }
}

export class InvalidProductCategory extends DomainError {
  constructor(category: string) {
    super(
      `Product category must be one of ${typeof ProductCategories}: <value>${category}</value>`,
    );
  }
}

export class InvalidProductCost extends DomainError {
  constructor(cost: number) {
    super(`Product cost must be greater than 0: <value>${cost}</value>`);
  }
}
