/**
 * Value Object representing a Player's Energy.
 * Immutable and bounded between MIN and MAX.
 */
export class Energy {
  public static readonly DEFAULT: number = 0;
  public static readonly MIN: number = 0;
  public static readonly MAX: number = 100;

  public readonly value: number;

  /**
   * @param value The energy value, will be clamped to [MIN, MAX].
   */
  constructor(value: number) {
    this.value = Energy.clamp(value);
  }

  /**
   * Returns a new Energy instance with the given value added.
   * @param delta The amount to add (can be negative).
   */
  public add(delta: number): Energy {
    return new Energy(this.value + delta);
  }

  /**
   * Returns true if this energy is equal to another.
   */
  public equals(other: Energy): boolean {
    return this.value === other.value;
  }

  /**
   * Clamp a value to the allowed energy bounds.
   */
  private static clamp(value: number): number {
    if (value < Energy.MIN) return Energy.MIN;
    if (value > Energy.MAX) return Energy.MAX;
    return Math.floor(value);
  }
}
