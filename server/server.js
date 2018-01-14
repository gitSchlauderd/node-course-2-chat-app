const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newEmail', {
    from: 'example@example.com',
    text: 'Hey, what is going on',
    createAt: 123
  });

  socket.emit('newMessage', {
    from: 'sierra',
    text: 'heyooooo',
    createAt: 123123
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('createEmail', (newEamil) => {
    console.log('createEmail', newEamil);
  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected from server');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
