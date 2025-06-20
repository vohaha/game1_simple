import { EventSchema, Id } from '@game1/types';
import z from 'zod/v4';

export const AffordanceSchema = z.object({
  id: Id,
});

export type IAffordance = z.infer<typeof AffordanceSchema>;

export const AffordanceDomainEventSchema = EventSchema.extend({
  payload: z.object({
    affordanceId: z.string(),
  }),
});

export type IAffordanceDomainEvent = z.infer<
  typeof AffordanceDomainEventSchema
>;
