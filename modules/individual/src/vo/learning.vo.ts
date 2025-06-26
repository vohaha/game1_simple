import { AbstractValueObject } from '@core/ddd';

export interface ILearning {
  currentTopic: string;
  progress: number;
}

export class Learning extends AbstractValueObject<ILearning> {
  get currentTopic(): string {
    return this.props.currentTopic;
  }

  get progress(): number {
    return this.props.progress;
  }

  private constructor(props: ILearning) {
    super(props);
  }

  public static create(props: Partial<ILearning> = {}): Learning {
    const defaults: ILearning = {
      currentTopic: 'None',
      progress: 0,
    };
    return new Learning({ ...defaults, ...props });
  }
}
