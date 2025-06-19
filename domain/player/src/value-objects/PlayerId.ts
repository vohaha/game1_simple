import { v4 as uuidv4 } from 'uuid';
import { PlayerIdSchema } from '../schemas/PlayerIdSchema.ts';

/**
 * Value Object representing a unique Player identifier.
 * Immutable and validated on creation.
 */
export class PlayerId {
  public readonly value: string;

  /**
   * Creates a new PlayerId.
   * @param value The unique identifier string.
   * @throws Error if value is not a valid UUID v4.
   */
  constructor(value: string) {
    PlayerIdSchema.parse(value);
    this.value = value;
  }

  /**
   * Generates a new PlayerId with a random UUID v4.
   */
  public static generate(): PlayerId {
    return new PlayerId(uuidv4());
  }

  /**
   * Checks equality with another PlayerId.
   * @param other The other PlayerId.
   */
  public equals(other: PlayerId): boolean {
    return this.value === other.value;
  }
}
