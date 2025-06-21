import { v4 as uuidv4 } from 'uuid';
import { IEntity, EntitySchema } from './entity.interface.ts';
import z from 'zod/v4';

type ActionProcess = (
  entity: EntityAggregate,
  ...args: unknown[]
) => Promise<Record<string, unknown>>;
type ActionName = string;
type ProcessName = string;

abstract class EntityAggregate {
  #actions: Map<ActionName, Map<ProcessName, ActionProcess>>;

  constructor() {
    this.#actions = new Map();
  }

  protected get actions() {
    return this.#actions;
  }

  public registerAction(
    actionName: ActionName,
    processName: string,
    actionProcess: ActionProcess
  ) {
    if (!this.#actions.has(actionName)) {
      this.#actions.set(actionName, new Map());
    }
    if (!z.string().nonempty().safeParse(processName).success) {
      throw new Error('invalid action process name');
    }
    this.actions.get(actionName)?.set(processName, actionProcess);
  }

  public unregisterAction(actionName: ActionName) {
    this.actions.delete(actionName);
  }

  public unregisterProcess(actionName: ActionName, processName: ProcessName) {
    this.actions.get(actionName)?.delete(processName);
  }

  public async performAction(
    actionName: ActionName,
    processName: ProcessName,
    ...args: unknown[]
  ) {
    try {
      const process = this.actions.get(actionName)?.get(processName);
      if (!process) {
        throw new Error(`action ${actionName} not found`);
      }
      await process(this, ...args);
    } catch (e) {
      console.log(e);
    }
  }
}

type Id = IEntity['id'];
export abstract class Entity extends EntityAggregate {
  readonly #id: Id;
  #name: string;

  constructor(input: { name: string; origin: string; id?: unknown }) {
    super();
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
}
