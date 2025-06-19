import { z } from 'zod/v4';
import { v4 as uuidv4 } from 'uuid';

export const IdSchema = z.uuidv4('ID must be a valid UUID v4');

export class Id {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = IdSchema.parse(value);
  }

  public static generate(): Id {
    return new Id(uuidv4());
  }

  public static fromValue(value: string): Id {
    return new Id(value);
  }

  public static safeParse(
    value: string
  ): { success: true; data: Id } | { success: false; error: z.ZodError } {
    const result = IdSchema.safeParse(value);
    if (result.success) {
      return { success: true, data: new Id(result.data) };
    }
    return { success: false, error: result.error };
  }

  public get value(): string {
    return this._value;
  }

  public equals(other: Id): boolean {
    return this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }

  public validate(): boolean {
    return IdSchema.safeParse(this._value).success;
  }
}
