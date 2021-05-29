const http = require('http');
const path = require('path');
const express = require('express');
const { Server: SocketIO } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new SocketIO(server);
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use(express.static(path.resolve('./public')));

const users = new Map();

io.on('connection', socket => {
  users.set(socket.id, socket.id);
  socket.on('outgoing:call', data => {
    const { fromOffer, to } = data;
    socket.to(to).emit('incomming:call', { from: socket.id, offer: fromOffer });
  });
  socket.on('call:accepted', data => {
    const { answer, to } = data;
    socket.to(to).emit('incomming:answer', { from: socket.id, offer: answer });
  });
  socket.on('disconnection', () => {
    users.delete(socket.id);
  });
});

server.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
