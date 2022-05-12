import { Server, Socket } from 'socket.io';
import { z } from 'zod';

import { Types } from '../types/RunTimeTypes';

type memberIdData = {
  socketId: string;
  memberId: number;
};

export class Listener {
  static dataMessage = z.object({
    id: Types.Number,
    name: Types.String,
    message: Types.String,
    img_url: Types.String,
  });

  static membersId: memberIdData[] = [];

  static sendMessage(io: Server) {
    io.on('connect', (socket: Socket) => {
      socket.emit('connect_finish');
      socket.on('sendMessage', (data: z.infer<typeof Listener.dataMessage>) => {
        if (this.dataMessage.safeParse(data).success) {
          io.emit('addMessage', data);
        } else {
          console.log('Dados errados!');
        }
      });
      socket.on('disconnect', () => {});
    });
  }

  static setNewMemberOnline(io: Server) {
    io.on('connect', (socket: Socket) => {
      socket.on('setNewMemberOnline', (id: z.infer<typeof Types.Number>) => {
        if (Types.Number.safeParse(id).success) {
          if (this.membersId.length <= 1) {
            const data: memberIdData = {
              socketId: socket.id,
              memberId: id,
            };
            this.membersId.push(data);
          }
          io.emit('onlineMembers', this.membersId);
        } else {
          console.log('Dados errados!');
        }
      });
      socket.on('disconnect', () => {
        this.membersId = this.membersId.filter(
          (data: memberIdData) => data.socketId !== socket.id ?? data,
        );
        io.emit('onlineMembers', this.membersId);
      });
    });
  }
}
