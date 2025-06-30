import { AbstractAggregateRoot } from '../../../core/ddd';
import { Group, GroupProps } from './group.entity';
import { EntityId } from '../../../core/types';
import { GroupCreated } from './group.events';

export class GroupAggregate extends AbstractAggregateRoot<EntityId> {
  public readonly group: Group;

  private constructor(group: Group) {
    super(group.id);
    this.group = group;
  }

  public static create(id: EntityId, props: GroupProps): GroupAggregate {
    const group = Group.create(id, props);
    const aggregate = new GroupAggregate(group);
    aggregate.addDomainEvent(new GroupCreated(aggregate.id));
    return aggregate;
  }
}

