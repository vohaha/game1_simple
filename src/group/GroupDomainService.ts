// Domain Service for the Group context.
// Used for operations involving multiple GroupAggregates or cross-group coordination logic.

import { GroupAggregate } from './GroupAggregate';
import { GroupPropertyVO } from './GroupPropertyVO';

export class GroupDomainService {
  /**
   * Forms an alliance between two groups.
   * TODO: Implement alliance creation, trust evaluation, and inter-group invariant enforcement.
   */
  static formAlliance(groupA: GroupAggregate, groupB: GroupAggregate): boolean {
    // TODO: Create alliance aggregate/entity with appropriate group relationship properties.
    // This may emit cross-context alliance events.
    return true;
  }

  /**
   * Splits a group into two subgroups by member lists.
   * TODO: Implement actual group splitting, membership transfer, and publish domain events.
   */
  static splitGroup(
    group: GroupAggregate,
    memberIds1: string[],
    memberIds2: string[],
  ): { group1Members: string[]; group2Members: string[] } {
    // TODO: Implement real group split logic, handling membership, role, and property replication.
    return {
      group1Members: memberIds1,
      group2Members: memberIds2,
    };
  }

  /**
   * Evaluates whether two groups are compatible for merging based on a given property.
   * TODO: Implement compatibility checks on all relevant group properties, not only basic equality.
   */
  static areGroupsCompatible(
    groupA: GroupAggregate,
    groupB: GroupAggregate,
    propertyKey: string,
  ): boolean {
    const propA = groupA.getProperty(propertyKey);
    const propB = groupB.getProperty(propertyKey);
    return JSON.stringify(propA) === JSON.stringify(propB);
  }

  /**
   * Calculates average value of a group property across a set of groups.
   */
  static averageGroupProperty(groups: GroupAggregate[], propertyKey: string): number | null {
    const values = groups
      .map((g) => g.getProperty(propertyKey))
      .filter((v): v is number => typeof v === 'number');

    if (values.length === 0) return null;
    const sum = values.reduce((acc, v) => acc + v, 0);
    return sum / values.length;
  }
}
