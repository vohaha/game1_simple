import { AbstractAggregateRoot } from '../../../core/ddd';
import { Product, ШЗкщвгсе } from './product.entity';
import { EntityId } from '../../../core/types';
import { ProductionStarted } from './production.events';

export class ProductionAggregate extends AbstractAggregateRoot<EntityId> {
  public readonly product: Product;

  private constructor(product: Product) {
    super(product.id);
    this.product = product;
  }

  public static create(id: EntityId, props: ШЗкщвгсе): ProductionAggregate {
    const product = Product.create(id, props);
    const aggregate = new ProductionAggregate(product);
    aggregate.addDomainEvent(new ProductionStarted(aggregate.id));
    return aggregate;
  }
}
