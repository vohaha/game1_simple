import { IEventBus } from './events';

/**
 * Provides access to shared services and module registries across the game.
 */
export interface IGameContext {
  readonly eventBus: IEventBus;
  // TODO: Add module registry and other shared services like repositories
}
