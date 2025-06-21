import { z } from 'zod/v4';
import { TimestampSchema } from '../time/time.interface.ts';

const OriginSchema = z.string().nonempty();
const TypeSchema = z.string().nonempty();
const separator = ':';

export const EventSchema = z
  .object({
    occurredAt: TimestampSchema,
    payload: z.record(z.string(), z.unknown()),
    origin: OriginSchema,
    type: z.templateLiteral([OriginSchema, separator, TypeSchema]),
  })
  .refine((event) => {
    const [origin] = event.type.split(separator);
    if (origin !== event.origin) return false;
    return true;
  });

export type IEvent = z.infer<typeof EventSchema>;

export type IEventCreate = Pick<IEvent, 'payload'> & {
  type: string;
};
