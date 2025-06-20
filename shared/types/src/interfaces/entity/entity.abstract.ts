import { z } from 'zod/v4';
import { v4 as uuidv4 } from 'uuid';
import { EventAware, IEventAware, IEventCreate } from '../event/index.ts';
import { IEntity } from './entity.interface.ts';

const IdValueSchema = z.uuidv4();
type IdValueType = z.infer<typeof IdValueSchema>;

export abstract class Entity<TEntityEventCreate extends IEventCreate>
  extends EventAware<TEntityEventCreate>
  implements IEntity, IEventAware
{
  private readonly _id: IdValueType;
  public _name = '';

  constructor(input: { origin: string; id?: unknown }) {
    super(input);
    if (input.id == null) {
      this._id = Entity.generateId();
    } else if (Entity.validateId(input.id)) {
      this._id = input.id as IdValueType;
    } else {
      throw new Error('invalid entity id');
    }
  }

  static generateId() {
    return uuidv4();
  }

  static validateId(id: unknown): boolean {
    return IdValueSchema.safeParse(id).success;
  }

  public get id() {
    return this._id;
  }

  private set name(newName) {
    this._name = newName;
  }

  public get name() {
    return this._name;
  }

  public changeName(newName: string): void {
    this.name = newName;
  }

  public equals(otherEntity: unknown): boolean {
    if (otherEntity == null) {
      return false;
    }
    if (!(otherEntity instanceof Entity)) {
      return false;
    }

    return this._id === otherEntity._id;
  }
}
