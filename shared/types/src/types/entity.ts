import z from 'zod/v4';
import { AnId, IdSchema, IdType } from './id.ts';

export const EntitySchema = z.object({
  id: IdSchema,
});

export abstract class Entity {
  protected readonly _id: AnId;

  constructor(id: unknown) {
    this._id = id ? AnId.fromValue(id) : AnId.generate();
  }

  id(): IdType {
    return this._id.value;
  }

  equals(entity?: Entity): boolean {
    return this._id.equals(entity);
  }
}
