import { z } from 'zod';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

/**
 * Zod schema for PlayerId (UUID v4 only).
 */
export const PlayerIdSchema = z
  .string()
  .refine((val) => uuidValidate(val) && uuidVersion(val) === 4, {
    message: 'Invalid PlayerId: must be a valid UUID v4',
  });
