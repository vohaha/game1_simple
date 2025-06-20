import { IAffordance } from 'src/index.ts';

export abstract class Affordance implements IAffordance {
  id;

  constructor(affordance: IAffordance) {
    this.id = affordance.id;
  }
}
