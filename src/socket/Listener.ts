import { Server, Socket } from 'socket.io';
import { z } from 'zod';

import { Types } from '../types/RunTimeTypes';

export class Listener {
  static dataMessage = z.object({
    id: Types.Number,
    name: Types.String,
    message: Types.String,
    img_url: Types.String,
  });

  static sendMessage(io: Server) {
    io.on('connect', (socket: Socket) => {
      socket.emit('connect_finish');
      socket.on('sendMessage', (data: z.infer<typeof Listener.dataMessage>) => {
        if (this.dataMessage.safeParse(data).success) {
          console.log(data);
          io.emit('addMessage', data);
        } else {
          console.log('Dados errados');
        }
      });
      socket.on('disconnect', () => {});
    });
  }
}
