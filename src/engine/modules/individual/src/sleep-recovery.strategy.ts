import { Individual } from './individual.entity';

/**
 * Interface for sleep recovery strategy.
 * Allows customization of how sleep restores energy based on individual attributes.
 */
export interface ISleepRecoveryStrategy {
  compute(hours: number, individual: Individual): number;
}

/**
 * Default sleep recovery strategy based on fixed full rest hours.
 */
export class DefaultSleepRecoveryStrategy implements ISleepRecoveryStrategy {
  constructor(private readonly fullRestHours: number = 7) {}

  compute(hours: number, individual: Individual): number {
    const max = individual.energy.max;
    const ratio = Math.min(hours / this.fullRestHours, 1);
    return Math.floor(ratio * max);
  }
}
