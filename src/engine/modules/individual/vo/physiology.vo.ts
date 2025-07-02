import { AbstractValueObject, DomainError, DomainTime } from '../../../core/ddd';
import { TimeUtils } from '../../../shared/utils/time.util';

export class Sleep extends AbstractValueObject<{
  started: DomainTime | null;
  ended: DomainTime | null;
}> {
  private constructor(props: { started: DomainTime | null; ended: DomainTime | null }) {
    super(props);
  }

  public static create(started: DomainTime | null, ended: DomainTime | null): Sleep {
    Sleep.invariants.check(
      () => (started == null) != (ended == null),
      () => new InvalidSleepError(started, ended),
    );

    Sleep.invariants.check(
      () => started == null || TimeUtils.isInPast(started),
      () => new InvalidSleepStartedTimeError(started),
    );

    Sleep.invariants.check(
      () => ended == null || TimeUtils.isInPast(ended),
      () => new InvalidSleepEndedTimeError(ended),
    );

    Sleep.invariants.assert();
    return new Sleep({ started, ended });
  }

  public get started() {
    return this.props.started;
  }

  public start() {
    return Sleep.create(TimeUtils.now(), null);
  }

  public get ended() {
    return this.props.ended;
  }

  public end() {
    return Sleep.create(null, TimeUtils.now());
  }

  public get duration() {
    if (this.started == null) return 0;
    return TimeUtils.diffMs(this.started);
  }

  public get debt() {
    if (this.ended == null) return 0;
    return TimeUtils.diffMs(this.ended);
  }
}

export interface IPhysiology {
  sleep: Sleep;
}

export class Physiology extends AbstractValueObject<IPhysiology> {
  private constructor(props: IPhysiology) {
    super(props);
  }

  public static create(props: Partial<IPhysiology> = {}): Physiology {
    const defaults: IPhysiology = { sleep: Sleep.create(null, Date.now()) };
    const merged: IPhysiology = { ...defaults, ...props };

    Physiology.invariants.assert();
    return new Physiology(merged);
  }

  public get sleepDuration() {
    return this.props.sleep.duration;
  }

  public get sleepDebt() {
    return this.props.sleep.debt;
  }

  public get sleepSince() {
    return this.props.sleep.started;
  }

  public isSleeping() {
    return this.sleepSince != null;
  }

  public isAwake() {
    return !this.isSleeping();
  }

  public markSleepStarted(): Physiology {
    Physiology.invariants.check(
      () => this.isAwake(),
      () => new AlreadySleepingError(this.sleepSince!),
    );
    return Physiology.create({ ...this.props, sleep: this.props.sleep.start() });
  }

  public markSleepEnded(): Physiology {
    Physiology.invariants.check(
      () => this.isSleeping(),
      () => new NotSleepingError(),
    );
    return Physiology.create({ ...this.props, sleep: this.props.sleep.end() });
  }
}

export class InvalidSleepTimestampError extends DomainError {
  constructor(time: DomainTime) {
    super(`Invalid sleepSince timestamp: <value>${time}</value>`);
  }
}

export class SleepInFutureError extends DomainError {
  constructor(time: DomainTime) {
    super(`sleepSince cannot be in the future: <value>${time}</value>`);
  }
}

export class AlreadySleepingError extends DomainError {
  constructor(since: DomainTime) {
    super(`Individual is already sleeping since: <value>${since}</value>`);
  }
}

export class NotSleepingError extends DomainError {
  constructor() {
    super(`Cannot end sleep when individual is not sleeping`);
  }
}

export class InvalidSleepError extends DomainError {
  constructor(started: DomainTime | null, ended: DomainTime | null) {
    super(`Sleep can be started or ended.`);
  }
}

export class InvalidSleepStartedTimeError extends DomainError {
  constructor(started: DomainTime | null) {
    super(`Invalid sleep started time: <value>${started}</value>`);
  }
}

export class InvalidSleepEndedTimeError extends DomainError {
  constructor(ended: DomainTime | null) {
    super(`Invalid sleep ended time: <value>${ended}</value>`);
  }
}
