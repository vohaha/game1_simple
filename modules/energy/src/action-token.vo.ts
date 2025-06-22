import { AbstractValueObject } from '../../../core/ddd';

export interface ActionTokenProps {
  type: string;
  cost: number;
}

export class ActionToken extends AbstractValueObject<ActionTokenProps> {
  private constructor(props: ActionTokenProps) {
    super(props);
  }

  public static create(props: ActionTokenProps): ActionToken {
    // TODO: Add validation
    return new ActionToken(props);
  }
}

