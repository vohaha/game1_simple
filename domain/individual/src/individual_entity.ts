import { IndividualDTO, IndividualSchema } from './individual_schema.ts';
import { EnergyVO } from './value-objects/index.ts';
import { Entity, ISerializable } from '@game1/types';

// type IndividualEventCreate =
//   | {
//       type: 'energyChanged';
//       payload: {
//         prev: EnergyValueType;
//         new: EnergyValueType;
//       };
//     }
//   | {
//       type: 'energyChangeFailed';
//       payload: {
//         error: Error;
//       };
//     };

export class Individual extends Entity {
  #energy: EnergyVO;

  constructor(input: { name: string; energy?: number; id?: unknown }) {
    super({ ...input, origin: 'individual' });
    this.#energy = new EnergyVO(input.energy);
  }

  protected performAction() {
    this.#energy = this.#energy.spend(1);
  }

  public get energy() {
    return this.#energy;
  }

  static serialize(entity: Individual): string {
    const data: IndividualDTO = {
      id: entity.id,
      name: entity.name,
      energy: entity.#energy.value,
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
console.log(_check);
