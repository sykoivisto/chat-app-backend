var app = require('express')();
var http = require('http').createServer(app);

var io = require('socket.io')(http);

app.get('/', (req, res) => res.send('hello!'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg, usr) => {
        socket.broadcast.emit('message-broadcast', msg, usr);
       });
    socket.on('join', (usr) => {
        socket.broadcast.emit('message-broadcast', usr + ' joined the chat!', 'chat');
    });
  });

http.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:' + process.env.PORT);
});