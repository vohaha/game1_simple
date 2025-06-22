import { IAction, IActionHandler } from '../../../core/actions';
import { IGameContext } from '../../../core/game-context';

export class CreateDealAction implements IAction {
  readonly type = 'CreateDeal';
  constructor(public readonly payload: { /* TODO: Define payload */ }) {}
}

export class CreateDealHandler implements IActionHandler<CreateDealAction> {
  execute(action: CreateDealAction, context: IGameContext): void {
    // TODO: Implement handler logic
  }
}
