import { z } from 'zod';
import { PlayerIdSchema } from '@/schemas/PlayerIdSchema.ts';

/**
 * Zod schema for Player Data Transfer Object.
 */
export const PlayerSchema = z.object({
  /** UUID string identifying the player */
  playerId: PlayerIdSchema,

  /** Number of remaining action tokens (non-negative integer) */
  actionTokens: z.number().int().nonnegative(),

  /** Current concentration level (0 to 100) */
  focus: z.number().int().min(0).max(100),
});

/** TypeScript type inferred from the PlayerSchema */
export type PlayerDTO = z.infer<typeof PlayerSchema>;
