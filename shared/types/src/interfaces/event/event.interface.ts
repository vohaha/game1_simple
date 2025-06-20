import { TimestampSchema } from 'src/index.ts';
import { z } from 'zod/v4';

const sourceSchema = z.string().nonempty();
const typeSchema = z.string().nonempty();
const separator = ':';

export const EventSchema = z
  .object({
    occurredAt: TimestampSchema.readonly(),
    payload: z.object().required(),
    source: sourceSchema,
    type: z.templateLiteral([sourceSchema, separator, typeSchema]),
  })
  .refine((event) => {
    const [eventSource] = event.type.split(separator);
    if (eventSource !== event.source) return false;
    return true;
  });

export type IEvent = z.infer<typeof EventSchema>;

export interface IEventAware {
  addEvent(event: IEvent): void;
  getEvents(): IEvent[];
  clearEvents(): void;
}
