import z from 'zod/v4';

export const EntitySchema = z.object({
  id: z.uuidv4(),
  name: z.string().nonempty(),
});
