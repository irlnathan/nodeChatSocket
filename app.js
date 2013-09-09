var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

// Listen for a Connection Event
io.sockets.on('connection', function (socket) {

  // Displaying each sockets id
  console.log("The actual socket.id is: ", socket.id);

  // Upon connection send a message to the socket
  socket.emit('news', 'Welcome to chat!');

  // Listen for 'send message' and send 'new message'
  socket.on('send message', function (data) {
    io.sockets.emit('new message', data);
  });

  // beta room only
  socket.on('send message2', function (data) {
    io.sockets.in('beta').emit('new message', data);
  });

  socket.on('subscribe', function (data) { 
    socket.join(data.room); 
    console.log("These are the rooms: ", io.sockets.manager.rooms);
  });
  
});