// Domain Service for the Group context
// Used for operations involving multiple GroupAggregates or cross-group coordination logic

import { GroupAggregate } from './GroupAggregate';
import { GroupPropertyVO } from './GroupPropertyVO';

export class GroupDomainService {
  // Example: Form an alliance between two groups (could be modeled as a higher-level VO or Aggregate)
  static formAlliance(groupA: GroupAggregate, groupB: GroupAggregate): boolean {
    // Placeholder: In full version, establish trust/cooperation properties and possibly create a new alliance entity
    return true;
  }

  // Example: Split a group into subgroups (returns group IDs for new groups)
  static splitGroup(
    group: GroupAggregate,
    memberIds1: string[],
    memberIds2: string[],
  ): { group1Members: string[]; group2Members: string[] } {
    // Placeholder logic
    return {
      group1Members: memberIds1,
      group2Members: memberIds2,
    };
  }

  // Example: Evaluate compatibility of merging two groups based on properties
  static areGroupsCompatible(
    groupA: GroupAggregate,
    groupB: GroupAggregate,
    propertyKey: string,
  ): boolean {
    const propA = groupA.getProperty(propertyKey);
    const propB = groupB.getProperty(propertyKey);
    return JSON.stringify(propA) === JSON.stringify(propB);
  }

  // Calculate average property value across a set of groups (e.g., mean cohesion)
  static averageGroupProperty(groups: GroupAggregate[], propertyKey: string): number | null {
    const values = groups
      .map((g) => g.getProperty(propertyKey))
      .filter((v): v is number => typeof v === 'number');

    if (values.length === 0) return null;
    const sum = values.reduce((acc, v) => acc + v, 0);
    return sum / values.length;
  }
}
