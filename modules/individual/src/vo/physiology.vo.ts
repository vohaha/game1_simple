import { AbstractValueObject, DomainError, DomainTime, Invariants } from '@core/ddd';

export interface IPhysiology {
  sleepSince: DomainTime | null;
}

export class Physiology extends AbstractValueObject<IPhysiology> {
  private constructor(props: IPhysiology) {
    super(props);
  }

  public static create(props: Partial<IPhysiology> = {}): Physiology {
    const defaults: IPhysiology = { sleepSince: null };
    const merged: IPhysiology = { ...defaults, ...props };
    const lastSleepSince = merged.sleepSince;

    if (lastSleepSince != null) {
      Physiology.invariants.check(
        () => !isNaN(lastSleepSince.toTimestamp()),
        () => new InvalidSleepTimestampError(lastSleepSince),
      );

      Physiology.invariants.check(
        () => !lastSleepSince.isInFuture(),
        () => new SleepInFutureError(lastSleepSince),
      );
    }

    Physiology.invariants.assert();
    return new Physiology(merged);
  }

  get sleepSince(): DomainTime | null {
    return this.props.sleepSince;
  }

  public isSleeping(): boolean {
    return this.sleepSince != null;
  }

  public isAwake(): boolean {
    return !this.isSleeping();
  }

  public markSleepStarted(): Physiology {
    Physiology.invariants.check(() => this.isAwake(), () => new AlreadySleepingError(this.sleepSince!));
    return Physiology.create({ ...this.props, sleepSince: DomainTime.now() });
  }

  public markSleepEnded(): Physiology {
    Physiology.invariants.check(() => this.isSleeping(), () => new NotSleepingError());
    return Physiology.create({ ...this.props, sleepSince: null });
  }
}

export class InvalidSleepTimestampError extends DomainError {
  constructor(time: DomainTime) {
    super(`Invalid sleepSince timestamp: <value>${time.toTimestamp()}</value>`);
  }
}

export class SleepInFutureError extends DomainError {
  constructor(time: DomainTime) {
    super(`sleepSince cannot be in the future: <value>${time.toTimestamp()}</value>`);
  }
}

export class AlreadySleepingError extends DomainError {
  constructor(since: DomainTime) {
    super(`Individual is already sleeping since: <value>${since.toTimestamp()}</value>`);
  }
}

export class NotSleepingError extends DomainError {
  constructor() {
    super(`Cannot end sleep when individual is not sleeping`);
  }
}
