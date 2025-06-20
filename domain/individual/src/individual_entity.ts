import { IndividualDTO } from './individual_schema.ts';
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

export class Individual
  extends Entity<IndividualEventCreate>
  implements ISerializable
{
  #energy: EnergyVO;

  constructor(input: {
    name: string;
    origin: string;
    energy?: number;
    id?: unknown;
  }) {
    super(input);
    this.#energy = new EnergyVO(input.energy);
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

  static serialize() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      energy: this.#energy.value,
    } satisfies IndividualDTO);
  }

  static deserialize(data: string) {
    try {
      const individualDto: IndividualDTO = JSON.parse(data);
      return {
        id: individualDto.id,
        name: individualDto.name,
        energy: this.energy.fromValue(individualDto.energy),
      };
    } catch (e) {
      return e instanceof Error ? e : new Error(String(e));
    }
  }
}
