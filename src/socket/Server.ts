import express from 'express';
import * as http from 'http';
import { Server as ServerIO } from 'socket.io';

import { Config } from '../config/Main';
import { Listener } from './Listener';
import { Middleware } from './Middleware';

export class Server {
  constructor() {
    const app = express();
    const server = http.createServer(app);
    const io = Middleware.checkAuthentication(new ServerIO(server));
    Listener.ping(io);

    app.get('/', (_req, _res) => {
      _res.sendFile(`${Config.PATH_PUBLIC}/index.html`);
    });

    server.listen(Config.PORT, () => {
      console.log(
        `Server listening in ${Config.ENV} in port ${Config.PORT}...`,
      );
    });
  }
}
