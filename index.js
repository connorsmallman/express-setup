const http = require('http');
const path = require('path');
const express = require('express');
const { Server: SocketIO } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new SocketIO(server);
const PORT = process.env.PORT || 8000;

app.use(express.static(path.resolve('./public')));

server.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
