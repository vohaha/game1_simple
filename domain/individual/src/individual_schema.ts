import { EntitySchema } from '@game1/types';
import { EnergyValueSchema } from './value-objects/index.ts';
import { z } from 'zod/v4';

export const IndividualSchema = EntitySchema.extend({
  energy: EnergyValueSchema,
});

export type IndividualDTO = z.infer<typeof IndividualSchema>;
