import { z } from 'zod';

export const Types = {
  String: z.string(),
  Number: z.number(),
  Boolean: z.boolean(),
  Bigint: z.bigint(),
  Undefined: z.undefined(),
  Null: z.null(),
  Void: z.void(),
  Any: z.any(),
  Never: z.never(),
};
