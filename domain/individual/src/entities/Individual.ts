import { Energy } from '../value-objects/Energy.ts';
import { Entity } from '@game1/types';
import { IDomainEvent } from '@game1/events';

export class Individual extends Entity {
  private _name: string;
  private _energy: Energy;
  private _domainEvents: IDomainEvent[] = [];

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

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
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

  protected addDomainEvent(event: IDomainEvent): void {
    this._domainEvents.push(event);
  }
}
