import { IAction, IActionHandler } from '../../../core/actions';
import { IGameContext } from '../../../core/game-context';

export class JoinGroupAction implements IAction {
  readonly type = 'JoinGroup';
  constructor(public readonly payload: { groupId: string; individualId: string }) {}
}

export class JoinGroupHandler implements IActionHandler<JoinGroupAction> {
  execute(action: JoinGroupAction, context: IGameContext): void {
    // TODO: Implement handler logic
  }
}
