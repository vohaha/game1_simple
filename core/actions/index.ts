import { IGameContext } from '../game-context';
import { Entity } from '../ddd';

/**
 * Represents a command or operation to be performed.
 */
export interface IAction<T = any> {
  readonly type: string;
  readonly payload: T;
}

/**
 * Handles the execution logic for a specific action.
 */
export interface IActionHandler<T extends IAction> {
  execute(action: T, context: IGameContext): void | Promise<void>;
}

/**
 * Defines a policy that checks if an action can be executed.
 */
export interface IActionPolicy<T extends IAction> {
  canExecute(action: T, context: IGameContext): boolean | Promise<boolean>;
}

/**
 * Represents the abilities of an entity, determining what actions it can perform.
 */
export interface IAbility<T extends Entity<any>> {
  can(action: IAction, subject: T, context: IGameContext): boolean;
  actions(subject: T, context: IGameContext): IAction[];
}
