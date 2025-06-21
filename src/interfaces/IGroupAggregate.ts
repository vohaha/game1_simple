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

  /**
   * Adds a member and emits GroupMembershipChangedEvent via DomainEventBus.
   */
  addMember(memberId: string, role?: string): void;

  /**
   * Removes a member and emits GroupMembershipChangedEvent via DomainEventBus.
   */
  removeMember(memberId: string): void;

  /**
   * Assigns or updates the role for a member. Emits GroupMembershipChangedEvent if applicable.
   */
  setRoleForMember(memberId: string, role: string): void;

  /**
   * Sets or updates a group property; should emit group property change events if required for integration.
   */
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
  // - Group lifecycle management (dissolving, merging, splitting), each with event publishing via DomainEventBus.
  // - Complex role reassignments, hierarchical specialization, property change notifications.
  // - Deep event-driven integration using shared/events/DomainEvent and integration/DomainEventBus.
  // - Group-level trust modeling, decision-making, and collective action evaluation, all observable via events for downstream contexts.
}
