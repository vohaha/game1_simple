import { z } from 'zod/v4';
import { v4 as uuidv4 } from 'uuid';
import { EventAware, IEventCreate } from '../event/index.ts';

const IdValueSchema = z.uuidv4();
type IdValueType = z.infer<typeof IdValueSchema>;

export abstract class Entity<
  TEntityEventCreate extends IEventCreate
> extends EventAware<TEntityEventCreate> {
  readonly #id: IdValueType;
  #name: string;

  constructor(input: { name: string; origin: string; id?: unknown }) {
    super(input);
    this.#name = input.name;
    if (input.id == null) {
      this.#id = Entity.generateId();
    } else if (Entity.validateId(input.id)) {
      this.#id = input.id as IdValueType;
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
    return this.#id;
  }

  public get name() {
    return this.#name;
  }

  public changeName(newName: string): void {
    this.#name = newName;
  }

  public equals(otherEntity: unknown): boolean {
    if (otherEntity == null) {
      return false;
    }
    if (!(otherEntity instanceof Entity)) {
      return false;
    }

    return this.#id === otherEntity.#id;
  }
}
