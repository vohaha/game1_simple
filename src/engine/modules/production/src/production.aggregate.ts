import { AbstractAggregateRoot } from '../../../core/ddd';
import { IProduct, Product } from './product.entity';
import { EntityId } from '../../../core/types';
import { ProductionStarted } from './production.events';

export class ProductionAggregate extends AbstractAggregateRoot<EntityId> {
  public readonly product: Product;

  private constructor(product: Product) {
    super(product.id);
    this.product = product;
  }

  public static create(id: EntityId, props: IProduct): ProductionAggregate {
    const product = Product.create(id, props.name, props.quality, props.category, props.effects, props.cost);
    const aggregate = new ProductionAggregate(product);
    aggregate.addDomainEvent(new ProductionStarted(aggregate.id));
    return aggregate;
  }
}
