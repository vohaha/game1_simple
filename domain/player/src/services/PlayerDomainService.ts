/**
 * Domain service for Player aggregate.
 * Encapsulates player-related business logic that doesn't belong to the Player entity itself.
 */

import { Player } from '@/entities/Player.ts';

/**
 * PlayerDomainService provides domain operations involving Player aggregates.
 */
export class PlayerDomainService {
  /**
   * Checks if two players are the same based on their identity.
   * @param params
   * @returns true if players have the same PlayerId.
   */
  static isSamePlayer(params: { playerA: Player; playerB: Player }): boolean {
    return params.playerA.id.equals(params.playerB.id);
  }

  /**
   * Example: Determines if a player can join a group based on domain rules.
   * Extend this method with actual group membership logic as needed.
   * @param params
   * @returns true if player can join the group.
   */
  static canJoinGroup(params: {
    player: Player;
    currentGroupCount: number;
    maxGroups: number;
  }): boolean {
    return params.currentGroupCount < params.maxGroups;
  }
}
