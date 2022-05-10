import { z } from 'zod';

import { Config } from '../config/Main';
import { Types } from '../types/RunTimeTypes';

export class Auth {
  static NIUM: string = 'a';

  static isValidToken = (token: z.infer<typeof Types.String>) => {
    if (Types.String.safeParse(token).success && token === Config.TOKEN) {
      return true;
    }
    return false;
  };
}
