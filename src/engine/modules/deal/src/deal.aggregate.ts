import { AbstractAggregateRoot } from '../../../core/ddd';
import { Deal, DealProps } from './deal.entity';
import { EntityId } from '../../../core/types';
import { DealCreated } from './deal.events';

/**
 * Represents the Deal aggregate root.
 * It orchestrates the lifecycle of a deal.
 */
export class DealAggregate extends AbstractAggregateRoot<EntityId> {
  public readonly deal: Deal;

  private constructor(deal: Deal) {
    super(deal.id);
    this.deal = deal;
  }

  /**
   * Factory method to create a new Deal aggregate.
   * @param id The unique identifier for the deal.
   * @param props The properties to create the underlying Deal entity.
   * @returns A new DealAggregate instance.
   */
  public static create(id: EntityId, props: DealProps): DealAggregate {
    const deal = Deal.create(id, props);
    const aggregate = new DealAggregate(deal);
    aggregate.addDomainEvent(new DealCreated(aggregate.id));
    return aggregate;
  }

  // TODO: Add methods to manage the deal lifecycle (e.g., negotiate, fulfill, breach).
  // These methods will delegate to the `deal` entity or coordinate with other entities.
}

