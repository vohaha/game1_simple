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

  getAllRoles(): Record<string, string> {
    return this.groupEntity.getAllRoles();
  }

  getProperty(key: string): unknown {
    return this.groupEntity.getProperty(key);
  }

  getAllProperties(): Record<string, unknown> {
    return this.groupEntity.getAllProperties();
  }

  setProperty(property: GroupPropertyVO): void {
    this.groupEntity.setProperty(property.key, property.value);
  }

  setRoleForMember(memberId: string, role: string): void {
    this.groupEntity.setRoleForMember(memberId, role);
  }

  // Add a group member, optionally with a role
  addMember(memberId: string, role?: string): void {
    this.groupEntity.addMember(memberId, role);
  }

  // Remove a group member
  removeMember(memberId: string): void {
    this.groupEntity.removeMember(memberId);
  }

  getSnapshot(): {
    id: string;
    name: string;
    members: string[];
    roles: Record<string, string>;
    properties: Record<string, unknown>;
  } {
    return this.groupEntity.getSnapshot();
  }
}
