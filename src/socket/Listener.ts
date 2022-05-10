import { Server, Socket } from 'socket.io';
import { z } from 'zod';

import { Types } from '../types/RunTimeTypes';

export class Listener {
  static dataPing = z.object({
    id: Types.Number,
    name: Types.String,
    online: Types.Boolean,
  });

  static ping(io: Server) {
    io.on('connect', (socket: Socket) => {
      socket.on('ping', (data: z.infer<typeof Listener.dataPing>) => {
        if (this.dataPing.safeParse(data).success) {
          console.log('ping...');
          const dataReturn = data;
          // data.online = false;
          dataReturn.online = true;
          dataReturn.name = 'Kleber Bernardo';
          socket.emit('pong', dataReturn);
        } else {
          socket.emit('error', 'safeParse: Invalid type in dataPong');
        }
      });

      socket.on('disconnect', () => {});
    });
  }
}
