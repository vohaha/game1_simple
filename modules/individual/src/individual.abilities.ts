import { IAbility, IAction } from '../../../core/actions';
import { IGameContext } from '../../../core/game-context';
import { Individual } from './individual.entity';

export class IndividualAbilities implements IAbility<Individual> {
  can(action: IAction, subject: Individual, context: IGameContext): boolean {
    // TODO: Implement ability checks
    return false;
  }

  actions(subject: Individual, context: IGameContext): IAction[] {
    // TODO: Return available actions
    return [];
  }
}
