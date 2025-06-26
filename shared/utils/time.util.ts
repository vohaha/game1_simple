export class TimeUtils {
  static now(): number {
    return Date.now();
  }

  static diffMs(from: number, to: number = TimeUtils.now()): number {
    return to - from;
  }

  static diffSec(from: number, to: number = TimeUtils.now()): number {
    return Math.floor(TimeUtils.diffMs(from, to) / 1000);
  }

  static diffMin(from: number, to: number = TimeUtils.now()): number {
    return Math.floor(TimeUtils.diffMs(from, to) / 60000);
  }

  static hasElapsed(since: number, durationMs: number, now: number = TimeUtils.now()): boolean {
    return now - since >= durationMs;
  }

  static addMs(time: number, ms: number): number {
    return time + ms;
  }

  static isInFuture(time: number, now: number = TimeUtils.now()): boolean {
    return time > now;
  }

  static isInPast(time: number, now: number = TimeUtils.now()): boolean {
    return time <= now;
  }

  static safeDiffMs(from: number | null, to: number | null = TimeUtils.now()): number | null {
    if (from == null || to == null) return null;
    return to - from;
  }
}
