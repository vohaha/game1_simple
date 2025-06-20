import { IndividualDTO, IndividualSchema } from './individual_schema.ts';
import { EnergyValueType, EnergyVO } from './value-objects/index.ts';
import { Entity, ISerializable } from '@game1/types';

type IndividualEventCreate =
  | {
      type: 'energyChanged';
      payload: {
        prev: EnergyValueType;
        new: EnergyValueType;
      };
    }
  | {
      type: 'energyChangeFailed';
      payload: {
        error: Error;
      };
    };

export class Individual extends Entity<IndividualEventCreate> {
  #energy: EnergyVO;
  #origin: string;

  constructor(input: { name: string; energy?: number; id?: unknown }) {
    const individualInput = { ...input, origin: 'individual' };
    super(individualInput);
    this.#origin = individualInput.origin;
    this.#energy = new EnergyVO(individualInput.energy);
  }

  private set energy(newValue) {
    try {
      this.#energy = new EnergyVO(newValue);
      const prevEnergyValue = this.#energy.value;

      this.addEvent({
        type: 'energyChanged',
        payload: {
          prev: prevEnergyValue,
          new: this.#energy.value,
        },
      });
    } catch (e) {
      this.addEvent({
        type: 'energyChangeFailed',
        payload: {
          error: e instanceof Error ? e : new Error(String(e)),
        },
      });
    }
  }

  get energy(): EnergyVO {
    return this.#energy;
  }

  get origin(): string {
    return this.#origin;
  }

  static serialize(entity: Individual): string {
    const data: IndividualDTO = {
      id: entity.id,
      name: entity.name,
      energy: entity.energy.value,
    };

    const validated = IndividualSchema.safeParse(data);
    if (!validated.success) {
      throw new Error(
        `Serialization validation failed: ${validated.error.message}`
      );
    }

    return JSON.stringify(validated.data);
  }

  static deserialize(data: string): Individual | Error {
    try {
      const parsed = JSON.parse(data);
      const validated = IndividualSchema.safeParse(parsed);

      if (!validated.success) {
        return new Error(
          `Deserialization validation failed: ${validated.error.message}`
        );
      }

      const { id, name, energy } = validated.data;

      const individual = new Individual({
        id,
        name,
        energy,
      });

      return individual;
    } catch (error) {
      return new Error(
        `Failed to deserialize Individual: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}

// Type check to ensure Individual implements ISerializable correctly
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _check: ISerializable<Individual> = Individual;
