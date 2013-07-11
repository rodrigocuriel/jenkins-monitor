var io = require('socket.io').listen(3000);
var request = require("request");

send_json = function(type, url) {
  request({
    url: url
  }, function(err, res, data) {
    var obj = JSON.parse(data);
    io.sockets.emit(type, data);
    console.log(type + ' sent');
  });
}

io.sockets.on('connection', function(socket) {
  console.log('i got a new connection');

  socket.on('getJobs', function() {
    console.log('getJobs event');
    send_json('jobs', 'http://founders:8080/api/json');
  });

  socket.on('getJob', function(data) {
    console.log('getJob event with data: ' + data);
    send_json('job', data.url);
  });

  socket.on('my other event', function(data) {
    console.log(data);
  });

  socket.broadcast.emit('someone connected');
});

send_json = function(type, url) {
  request({
    url: url
  }, function(err, res, data) {
    var obj = JSON.parse(data);
    io.sockets.emit(type, data);
    console.log(type + ' sent');
  });
}