import { z } from 'zod/v4';
import { v4 as uuidv4 } from 'uuid';

export const IdSchema = z.uuidv4('ID must be a valid UUID v4');
export type IdType = z.infer<typeof IdSchema>;

export class AnId {
  private readonly _value: IdType;

  private constructor(value: unknown) {
    this._value = IdSchema.parse(value);
  }

  public static generate(): AnId {
    return new AnId(uuidv4());
  }

  public static fromValue(value: unknown): AnId {
    return new AnId(value);
  }

  public static safeParse(
    value: string
  ): { success: true; data: AnId } | { success: false; error: z.ZodError } {
    const result = IdSchema.safeParse(value);
    if (result.success) {
      return { success: true, data: new AnId(result.data) };
    }
    return { success: false, error: result.error };
  }

  public get value(): IdType {
    return this._value;
  }

  public equals(other: unknown): boolean {
    if (other == null) {
      return false;
    }
    if (!(other instanceof AnId)) {
      return false;
    }

    return this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }

  public validate(): boolean {
    return IdSchema.safeParse(this._value).success;
  }
}
