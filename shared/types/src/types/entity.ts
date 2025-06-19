import { AnId, IdType } from './id.ts';

export abstract class Entity {
  protected readonly _id: AnId;

  constructor() {
    this._id = AnId.generate();
  }

  id(): IdType {
    return this._id.value;
  }

  equals(entity?: unknown): boolean {
    return this._id.equals(entity);
  }
}
