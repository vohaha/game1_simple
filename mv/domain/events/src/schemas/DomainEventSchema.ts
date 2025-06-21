import { z } from 'zod/v4';
import { IdSchema, TimestampSchema } from '@game1/types';

export const DomainEventContextSchema = z.enum([
  'player',
  'concentration',
  'action_tokens',
  'deal_template',
]);

export type DomainEventContextType = z.infer<typeof DomainEventContextSchema>;

export const DomainEventSchema = z.object({
  id: IdSchema,

  type: z.string().min(1, 'Event type cannot be empty'),

  occurredAt: TimestampSchema,

  domainContext: DomainEventContextSchema,

  data: z.record(z.string(), z.unknown()),

  metadata: z.record(z.string(), z.unknown()),
});

export type DomainEventType = z.infer<typeof DomainEventSchema>;
