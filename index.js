var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.use('/public', express.static(__dirname + '/public'));

var nicknames = {};

io.on('connection', function(socket) {
   // add user to nicknames
   socket.on('adduser', function(nickname){
      socket.nickname = nickname;
      nicknames[nickname] = nickname
      console.log(nickname + ' connected');
   });

   // receive message
   socket.on('chat message', function(msg){
      // send out message
      io.emit('chat message', socket.nickname + ': ' + msg);
      console.log(socket.nickname + ': ' + msg);
   });
});

http.listen(3000, function(){
   console.log('listening on 3000');
});