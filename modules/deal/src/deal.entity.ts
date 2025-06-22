import { AbstractEntity } from '../../../core/ddd';
import { EntityId } from '../../../core/types';

// TODO: Define properties for a deal.
export interface DealProps {
  terms: string;
  parties: [EntityId, EntityId];
}

/**
 * Represents a Deal entity.
 */
export class Deal extends AbstractEntity<EntityId> {
  public readonly props: DealProps;

  constructor(id: EntityId, props: DealProps) {
    super(id);
    this.props = props;
  }

  public static create(id: EntityId, props: DealProps): Deal {
    // TODO: Add validation logic.
    return new Deal(id, props);
  }
}
