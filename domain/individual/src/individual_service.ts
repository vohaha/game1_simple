import { Individual } from './individual_entity.ts';

export class IndividualDomainService {
  static isSameIndividual(params: {
    individualA: Individual;
    individualB: Individual;
  }): boolean {
    return params.individualA.equals(params.individualB);
  }

  static canJoinGroup(params: {
    player: Individual;
    currentGroupCount: number;
    maxGroups: number;
  }): boolean {
    return params.currentGroupCount < params.maxGroups;
  }
}
