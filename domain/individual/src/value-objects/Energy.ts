export class Energy {
  public static readonly DEFAULT: number = 0;
  public static readonly MIN: number = 0;
  public static readonly MAX: number = 100;

  public readonly value: number;

  constructor(value: number) {
    this.value = Energy.clamp(value);
  }

  public add(delta: number): Energy {
    return new Energy(this.value + delta);
  }

  public equals(other: Energy): boolean {
    return this.value === other.value;
  }

  private static clamp(value: number): number {
    if (value < Energy.MIN) return Energy.MIN;
    if (value > Energy.MAX) return Energy.MAX;
    return Math.floor(value);
  }
}
