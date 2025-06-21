import { IGroupEntity } from './IGroupEntity';
import { GroupPropertyVO } from '../group/GroupPropertyVO';

/**
 * Interface for the GroupAggregate - DDD aggregate root for group/collective logic in Game1.
 * Orchestrates group membership, roles, properties, and group-level decisions.
 */
export interface IGroupAggregate {
  getId(): string;
  getName(): string;
  getMembers(): string[];
  getRoleForMember(memberId: string): string | undefined;
  getAllRoles(): Record<string, string>;
  getProperty(key: string): unknown;
  getAllProperties(): Record<string, unknown>;

  addMember(memberId: string, role?: string): void;
  removeMember(memberId: string): void;
  setRoleForMember(memberId: string, role: string): void;
  setProperty(property: GroupPropertyVO): void;

  /**
   * Returns a serializable snapshot of current group state.
   */
  getSnapshot(): {
    id: string;
    name: string;
    members: string[];
    roles: Record<string, string>;
    properties: Record<string, unknown>;
  };

  // TODO: Add methods for:
  // - Group lifecycle management (e.g. dissolving, merging, splitting)
  // - Complex role reassignments and hierarchical specialization
  // - Event publishing and integration with the Deal and Network systems
  // - Group-level trust, decision-making, and collective action evaluation
}
