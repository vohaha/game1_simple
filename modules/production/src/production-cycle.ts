// TODO: Implement the production cycle logic, which could be a ValueObject or a simple class.
export class ProductionCycle {
  // Example properties
  private readonly startTime: number;
  private readonly duration: number;

  constructor(startTime: number, duration: number) {
    this.startTime = startTime;
    this.duration = duration;
  }

  isFinished(currentTime: number): boolean {
    return currentTime >= this.startTime + this.duration;
  }
}
