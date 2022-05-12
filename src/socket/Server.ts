import express = require('express');
import * as http from 'http';
import path from 'path';
import { Server as ServerIO } from 'socket.io';

import { Config } from '../config/Main';
import { Listener } from './Listener';
import { Middleware } from './Middleware';

export class Server {
  constructor() {
    const app = express();
    const server = http.createServer(app);
    const io = Middleware.checkAuthentication(new ServerIO(server));
    Listener.sendMessage(io);
    Listener.setNewMemberOnline(io);

    app.use('/assets', express.static(path.join(Config.PATH_PUBLIC, 'assets')));

    app.get('/', (_req, _res) => {
      _res.sendFile(`${path.join(Config.PATH_PUBLIC, 'index.html')}`);
    });

    app.get('/login', (_req, _res) => {
      _res.sendFile(`${path.join(Config.PATH_PUBLIC, 'login.html')}`);
    });

    server.listen(Config.PORT, () => {
      console.log(
        `Server listening in ${Config.ENV} in port ${Config.PORT}...`,
      );
    });
  }
}
