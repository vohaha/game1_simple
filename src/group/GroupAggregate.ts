import { GroupEntity } from './GroupEntity';
import { GroupPropertyVO } from './GroupPropertyVO';

// Aggregate root for the Group context
export class GroupAggregate {
  private readonly groupEntity: GroupEntity;

  constructor(groupEntity: GroupEntity) {
    this.groupEntity = groupEntity;
  }

  getId(): string {
    return this.groupEntity.getId();
  }

  getName(): string {
    return this.groupEntity.getName();
  }

  getMembers(): string[] {
    return this.groupEntity.getMembers();
  }

  getRoleForMember(memberId: string): string | undefined {
    return this.groupEntity.getRoleForMember(memberId);
  }

  getProperty(key: string): unknown {
    return this.groupEntity.getProperty(key);
  }

  // Add a group property (returns a new VO, but in practice would update entity state)
  addProperty(property: GroupPropertyVO): void {
    // Placeholder: property addition logic not implemented
  }

  // Add a group member, optionally with a role
  addMember(memberId: string, role?: string): void {
    this.groupEntity.addMember(memberId, role);
  }

  // Remove a group member
  removeMember(memberId: string): void {
    this.groupEntity.removeMember(memberId);
  }
}
