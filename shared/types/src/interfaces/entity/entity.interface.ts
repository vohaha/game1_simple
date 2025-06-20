import z from 'zod/v4';

export const EntitySchema = z.object({
  id: z.uuidv4(),
  name: z.string().nonempty(),
});

type EntityDataType = z.infer<typeof EntitySchema>;

export interface IEntity extends EntityDataType {
  equals(otherId: unknown): boolean;
  changeName(newName: string): void;
}
