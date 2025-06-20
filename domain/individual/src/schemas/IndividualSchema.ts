import { EntitySchema } from '@game1/types';
import { z } from 'zod/v4';

export const IndividualSchema = EntitySchema.extend({
  actionTokens: z.number().int().nonnegative(),
  focus: z.number().int().min(0).max(100),
});

export type IndividualDTO = z.infer<typeof IndividualSchema>;
