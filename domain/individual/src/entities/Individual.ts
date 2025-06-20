import { Energy } from '../value-objects/Energy.ts';
import { Entity } from '@game1/types';
import { DomainEventAware } from '@game1/events';

export class Individual extends Entity implements DomainEventAware {
  private _name: string;
  private _energy: Energy;

  constructor(input: { name: string; energy: Energy; id?: unknown }) {
    super(input.id);
    this._name = input.name;
    this._energy = input.energy;
  }

  get name(): string {
    return this._name;
  }

  get energy(): Energy {
    return this._energy;
  }

  changeName(newName: string): void {
    this._name = newName;
    // Example event can be added here, e.g. PlayerNameChanged
    // this._domainEvents.push(new PlayerNameChanged(this.id, newName));
  }

  updateEnergy(energy: Energy): void {
    this._energy = energy;
    // Example event can be added here, e.g. PlayerEnergyUpdated
    // this._domainEvents.push(new PlayerEnergyUpdated(this.id, energy));
  }
}
