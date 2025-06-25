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

// Action for providing a service to a target entity
export interface ProvideServicePayload {
  serviceType: string;
  initiatorId: string;
  targetId: string;
}

export class ProvideServiceAction implements IAction<ProvideServicePayload> {
  readonly type = 'ProvideService';
  constructor(public readonly payload: ProvideServicePayload) {}
}

// Policy for whether the service can be provided
export class ProvideServicePolicy implements IActionPolicy<ProvideServiceAction> {
  async canExecute(action: ProvideServiceAction, context: IGameContext): Promise<boolean> {
    const initiator = await context.individuals.getById(action.payload.initiatorId);
    const serviceCost = await context.services.getEnergyCost(action.payload.serviceType);
    return initiator.currentEnergy() >= serviceCost;
  }
}

// Handler for providing the service
export class ProvideServiceHandler implements IActionHandler<ProvideServiceAction> {
  async execute(action: ProvideServiceAction, context: IGameContext): Promise<void> {
    const initiator = await context.individuals.getById(action.payload.initiatorId);
    const target = await context.individuals.getById(action.payload.targetId);
    const serviceCost = await context.services.getEnergyCost(action.payload.serviceType);

    if (initiator.currentEnergy() < serviceCost) {
      return;
    }

    initiator.updateEnergy(initiator.currentEnergy() - serviceCost);
    await context.services.applyServiceEffect(action.payload.serviceType, initiator, target);
  }
}

// Action for creating a product
export interface CreateProductPayload {
  description: string;
  initiatorId: string;
}

export class CreateProductAction implements IAction<CreateProductPayload> {
  readonly type = 'CreateProduct';
  constructor(public readonly payload: CreateProductPayload) {}
}

// Policy for whether the action can be executed
export class CreateProductPolicy implements IActionPolicy<CreateProductAction> {
  async canExecute(action: CreateProductAction, context: IGameContext): Promise<boolean> {
    const individual = await context.individuals.getById(action.payload.initiatorId);
    const energyRequired = await context.production.estimateEnergyCost(action.payload.description);
    return individual.currentEnergy() >= energyRequired;
  }
}

// Handler for executing the action
export class CreateProductHandler implements IActionHandler<CreateProductAction> {
  async execute(action: CreateProductAction, context: IGameContext): Promise<void> {
    const individual = await context.individuals.getById(action.payload.initiatorId);
    const energyRequired = await context.production.estimateEnergyCost(action.payload.description);

    if (individual.currentEnergy() < energyRequired) {
      await context.production.pauseCreation(action.payload.description, individual.id);
      return;
    }

    individual.updateEnergy(individual.currentEnergy() - energyRequired);
    const product = await context.production.createProduct(action.payload.description, individual.id);
    await context.inventory.storeProduct(individual.id, product);
  }
}
