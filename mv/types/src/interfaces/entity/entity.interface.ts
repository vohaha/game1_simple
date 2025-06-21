import z from 'zod/v4';

export const EntitySchema = z.object({
  id: z.uuidv4(),
  name: z.string().nonempty(),
});

export type IEntity = z.infer<typeof EntitySchema>;

export const EntityAction = z.function({
  input: [z.string()],
  output: z.record(z.string(), z.unknown()),
});
