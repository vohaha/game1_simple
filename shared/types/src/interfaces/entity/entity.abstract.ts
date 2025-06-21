import { v4 as uuidv4 } from 'uuid';
import { IEntity, EntitySchema } from './entity.interface.ts';

type Id = IEntity['id'];
type IdeaPayload = { name: string; description: string };
type ActionPayload = {
  type: 'product' | 'service';
  requiredEnergyValue: number;
};

export abstract class Entity {
  readonly #id: Id;
  #name: string;

  constructor(input: { name: string; origin: string; id?: unknown }) {
    this.#name = input.name;
    const validId = Entity.validateId(input.id);
    if (input.id == null || !validId) {
      this.#id = Entity.generateId();
    } else {
      this.#id = input.id as Id;
    }
  }

  static generateId() {
    return uuidv4();
  }

  static validateId(id: unknown): boolean {
    return EntitySchema.pick({ id: true }).safeParse(id).success;
  }

  protected get id() {
    return this.#id;
  }

  protected get name() {
    return this.#name;
  }

  protected set name(newName: string) {
    this.#name = newName;
  }

  protected equals(otherEntity: unknown): boolean {
    if (otherEntity == null) {
      return false;
    }
    if (!(otherEntity instanceof Entity)) {
      return false;
    }
    return this.#id === otherEntity.#id;
  }

  protected abstract idea(ideaProps: IdeaPayload): ActionPayload;

  protected abstract performAction(ideaCreate: ActionPayload): unknown;
}
