var express = require('express');
const http = require('http');
var socketIO =require('socket.io');
var app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static('public'));

io.on('connection',(socket) => {

  socket.emit('newMessage',{from :'Admin', text: 'Welcome to chat App'}
  );

  socket.broadcast.emit('newMessage',{from:'Admin',text :'New user Joined'});


  socket.on('newMessage',(data) => {
    io.sockets.emit('newMessage',{text: data.text, from: data.from});
  });

  socket.on('disconnect',() => {
   console.log("DisConnected User");
 });
 
});


server.listen(process.env.PORT||3000, function(){
  console.log('Server is listening on PORT');
});
