import z from 'zod/v4';

export abstract class ValueObject<T> {
  readonly #value: T;

  constructor(value: unknown, schema: z.ZodType<T>) {
    this.#value = schema.parse(value);
  }

  public abstract equals(otherVo?: ValueObject<T>): boolean;

  public get value(): T {
    return this.#value;
  }
}

const ENERGY_DEFAULT_VALUE = 0;
const ENERGY_MIN_VALUE = 0;
const ENERGY_MAX_VALUE = 100;

export const EnergyValueSchema = z
  .int()
  .min(ENERGY_MIN_VALUE)
  .max(ENERGY_MAX_VALUE)
  .default(ENERGY_DEFAULT_VALUE);

export type EnergyValueType = z.infer<typeof EnergyValueSchema>;

export class EnergyVO extends ValueObject<EnergyValueType> {
  public static readonly DEFAULT = ENERGY_DEFAULT_VALUE;
  public static readonly MIN = ENERGY_MIN_VALUE;
  public static readonly MAX = ENERGY_MAX_VALUE;

  constructor(value: unknown = EnergyVO.DEFAULT) {
    super(value, EnergyValueSchema);
  }

  public spend(delta: number): EnergyVO {
    return new EnergyVO(this.value - delta);
  }

  public restore(delta: number): EnergyVO {
    return new EnergyVO(this.value + delta);
  }

  public override equals(otherEnergy?: EnergyVO): boolean {
    return otherEnergy != null && this.value === otherEnergy.value;
  }
}
