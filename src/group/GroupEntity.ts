// Entity representing a group or collective in the simulation

export class GroupEntity {
  private readonly id: string;
  private name: string;
  private members: string[];
  private roles: Record<string, string>;
  private properties: Record<string, unknown>;

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
    return [...this.members];
  }

  getRoleForMember(memberId: string): string | undefined {
    return this.roles[memberId];
  }

  getAllRoles(): Record<string, string> {
    return { ...this.roles };
  }

  getProperty(key: string): unknown {
    return this.properties[key];
  }

  getAllProperties(): Record<string, unknown> {
    return { ...this.properties };
  }

  addMember(memberId: string, role?: string): void {
    if (!this.members.includes(memberId)) {
      this.members.push(memberId);
    }
    if (role) {
      this.roles[memberId] = role;
    }
  }

  removeMember(memberId: string): void {
    this.members = this.members.filter((id) => id !== memberId);
    delete this.roles[memberId];
  }

  setRoleForMember(memberId: string, role: string): void {
    if (this.members.includes(memberId)) {
      this.roles[memberId] = role;
    }
    // TODO: Else, throw or handle error if needed
  }

  setProperty(key: string, value: unknown): void {
    this.properties[key] = value;
  }

  getSnapshot(): {
    id: string;
    name: string;
    members: string[];
    roles: Record<string, string>;
    properties: Record<string, unknown>;
  } {
    return {
      id: this.id,
      name: this.name,
      members: [...this.members],
      roles: { ...this.roles },
      properties: { ...this.properties },
    };
  }
}
