import z from 'zod/v4';

const ENERGY_DEFAULT_VALUE = 0;
const ENERGY_MIN_VALUE = 0;
const ENERGY_MAX_VALUE = 100;

export const EnergyValueSchema = z
  .int()
  .min(ENERGY_MIN_VALUE)
  .max(ENERGY_MAX_VALUE)
  .default(ENERGY_DEFAULT_VALUE);

export type EnergyValueType = z.infer<typeof EnergyValueSchema>;

export class EnergyVO {
  public static readonly DEFAULT = ENERGY_DEFAULT_VALUE;
  public static readonly MIN = ENERGY_MIN_VALUE;
  public static readonly MAX = ENERGY_MAX_VALUE;

  public readonly value: EnergyValueType;

  constructor(value: unknown) {
    const validatedEnergyValue = EnergyValueSchema.safeParse(value);
    if (validatedEnergyValue.success) {
      this.value = EnergyVO.clamp(validatedEnergyValue.data as EnergyValueType);
    } else {
      this.value = EnergyVO.DEFAULT;
    }
  }

  public change(delta: number): EnergyVO {
    return new EnergyVO(this.value + delta);
  }

  public equals(other: EnergyVO): boolean {
    return this.value === other.value;
  }

  private static clamp(value: number): number {
    if (value < EnergyVO.MIN) return EnergyVO.MIN;
    if (value > EnergyVO.MAX) return EnergyVO.MAX;
    return Math.floor(value);
  }
  fromValue(value: unknown): EnergyVO {
    return new EnergyVO(value);
  }
}
