// Entity representing a group or collective in the simulation

export class GroupEntity {
  private readonly id: string;
  private name: string;

  // Member individual IDs
  private members: string[];

  // Roles mapped to member IDs (VO could be used here)
  private roles: Record<string, string>;

  // Internal: Group properties such as cohesion, specialization, trust metrics (VOs/pure domain data)
  private readonly properties: Record<string, unknown>;

  constructor(
    id: string,
    name: string,
    members: string[],
    roles: Record<string, string>,
    properties: Record<string, unknown>,
  ) {
    this.id = id;
    this.name = name;
    this.members = members;
    this.roles = roles;
    this.properties = properties;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getMembers(): string[] {
    return this.members;
  }

  getRoleForMember(memberId: string): string | undefined {
    return this.roles[memberId];
  }

  getProperty(prop: string): unknown {
    return this.properties[prop];
  }

  addMember(memberId: string, role?: string): void {
    if (!this.members.includes(memberId)) {
      this.members.push(memberId);
      if (role) {
        this.roles[memberId] = role;
      }
    }
  }

  removeMember(memberId: string): void {
    this.members = this.members.filter((id) => id !== memberId);
    delete this.roles[memberId];
  }
}
