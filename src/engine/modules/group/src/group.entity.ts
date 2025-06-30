import { AbstractEntity } from '../../../core/ddd';
import { EntityId } from '../../../core/types';

export interface GroupProps {
  name: string;
  members: EntityId[];
}

export class Group extends AbstractEntity<EntityId> {
  public readonly props: GroupProps;

  private constructor(id: EntityId, props: GroupProps) {
    super(id);
    this.props = props;
  }

  public static create(id: EntityId, props: GroupProps): Group {
    // TODO: Add validation
    return new Group(id, props);
  }
}

