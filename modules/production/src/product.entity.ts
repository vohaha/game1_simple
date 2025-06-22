import { AbstractEntity } from '../../../core/ddd';
import { EntityId } from '../../../core/types';

export interface ProductProps {
  name: string;
  quality: number;
}

export class Product extends AbstractEntity<EntityId> {
  public readonly props: ProductProps;

  private constructor(id: EntityId, props: ProductProps) {
    super(id);
    this.props = props;
  }

  public static create(id: EntityId, props: ProductProps): Product {
    // TODO: Add validation
    return new Product(id, props);
  }
}

