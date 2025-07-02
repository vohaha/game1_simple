import { AbstractEntity } from '../../core/ddd';
import { EntityId } from '../../core/types';
import { Energy } from './vo/energy.vo';
import { Metadata } from './vo/metadata.vo';
import { Physiology } from './vo/physiology.vo';

/**
 * Represents an Individual entity in the game.
 * It has a unique identity and properties.
 */
export class Individual extends AbstractEntity<EntityId> {
  private _metadata: Metadata;
  private _energy: Energy;
  private _physiology: Physiology;

  private constructor(id: EntityId, metadata: Metadata, energy: Energy, physiology: Physiology) {
    super(id);
    this._metadata = metadata;
    this._energy = energy;
    this._physiology = physiology;
  }

  public static create(
    id: EntityId,
    metadata: Metadata,
    energy: Energy,
    physiology: Physiology,
  ): Individual {
    return new Individual(id, metadata, energy, physiology);
  }

  public get metadata(): Metadata {
    return this._metadata;
  }

  public get energy(): Energy {
    return this._energy;
  }

  public set energy(value: Energy) {
    this._energy = value;
  }

  public get physiology(): Physiology {
    return this._physiology;
  }

  public set physiology(value: Physiology) {
    this._physiology = value;
  }

  public get snapshot() {
    return {
      id: this.id,
      metadata: this._metadata.snapshot,
      energy: this._energy.snapshot,
      physiology: this._physiology.snapshot,
    };
  }
}
