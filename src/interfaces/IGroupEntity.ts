/**
 * Interface for the GroupEntity, representing a collective of individuals in the simulation.
 * Encapsulates identity, membership, roles, group properties, and dynamic state.
 */
export interface IGroupEntity {
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
  setProperty(key: string, value: unknown): void;

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

  // TODO: Add methods for group lifecycle, merging/splitting logic, and event emission.
}
