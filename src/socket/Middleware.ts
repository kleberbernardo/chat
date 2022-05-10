import { Socket, Server } from 'socket.io';

import { Auth } from '../middlewares/Auth';

export class Middleware {
  static checkAuthentication(io: Server): Server {
    return io.use((socket: Socket, next: Function) => {
      const { token } = socket.handshake.auth;
      Auth.isValidToken(token) ? next() : next(new Error('Token Inválido'));
    });
  }
}
