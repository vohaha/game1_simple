import { PlayerId } from '../value-objects/PlayerId.ts';
import { Energy } from '../value-objects/Energy.ts';

/**
 * Represents a player in the simulation.
 * Aggregate root for player-related state and behaviors.
 */
export class Player {
  /**
   * Unique identity for the player.
   */
  public readonly id: PlayerId;

  /**
   * Display name for the player.
   */
  private _name: string;

  /**
   * Energy value object.
   */
  private _energy: Energy;

  /**
   * Create a new Player.
   * @param id PlayerId
   * @param name Player's display name
   * @param reputation Initial reputation
   * @param energy Initial energy
   */
  constructor({
    id,
    name,
    energy,
  }: {
    id: PlayerId;
    name: string;
    energy: Energy;
  }) {
    this.id = id;
    this._name = name;
    this._energy = energy;
  }

  get name(): string {
    return this._name;
  }

  get energy(): Energy {
    return this._energy;
  }

  /**
   * Change the player's display name.
   * @param newName New name
   */
  changeName(newName: string): void {
    this._name = newName;
  }

  /**
   * Update the player's energy.
   * @param energy New energy value object
   */
  updateEnergy(energy: Energy): void {
    this._energy = energy;
  }
}
