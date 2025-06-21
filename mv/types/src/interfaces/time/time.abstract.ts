import { TimestampSchema } from './time.interface.ts';

export class Timestamp {
  static now() {
    return new Date().toISOString();
  }
  static parse(timestamp: unknown) {
    const { success, data } = TimestampSchema.safeParse(timestamp);
    if (success) {
      return new Date(data);
    }
    return null;
  }
}
