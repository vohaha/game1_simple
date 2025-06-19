/**
 * PlayerFactory is responsible for creating Player aggregates.
 * Encapsulates construction logic and ensures invariants at creation.
 */

import { Player } from '@/entities/Player.ts';
import { PlayerId } from '@/value-objects/PlayerId.ts';
import { Energy } from '@/value-objects/Energy.ts';

export interface CreatePlayerProps {
  id: string;
  name: string;
  energy?: number;
}

/**
 * Factory for Player aggregate creation.
 */
export class PlayerFactory {
  /**
   * Creates a new Player aggregate.
   * @param props - Properties required to instantiate a Player.
   */
  public static create(props: CreatePlayerProps): Player {
    const playerId = new PlayerId(props.id);
    const energy = new Energy(props.energy ?? Energy.DEFAULT);

    return new Player({
      id: playerId,
      name: props.name,
      energy,
    });
  }
}
