import { IAction, IActionPolicy } from '../../../core/actions';
import { IGameContext } from '../../../core/game-context';

export class GroupPolicy implements IActionPolicy<IAction> {
  canExecute(action: IAction, context: IGameContext): boolean {
    // TODO: Implement policy logic
    return true;
  }
}
