import { z } from 'zod/v4';
import { v4 as uuidv4 } from 'uuid';
import { EventAware, IEntity, IEventAware } from 'src/index.ts';

const IdValueSchema = z.uuidv4();
type IdValueType = z.infer<typeof IdValueSchema>;

export abstract class Entity
  extends EventAware
  implements IEntity<string>, IEventAware
{
  private readonly _id: IdValueType;

  constructor(id: unknown) {
    super();
    if (id == null) {
      this._id = Entity.generateId();
    } else if (Entity.validateId(id)) {
      this._id = id as IdValueType;
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
