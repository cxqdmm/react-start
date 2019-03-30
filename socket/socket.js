exports.initSocket = function(server) {
    const io = require('socket.io')(server, {
      path: '/test',
      serveClient: false,
      // below are engine.IO options
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false
    });
    io.on('connection', function (socket) {
        socket.on('message', function () { });
        socket.on('disconnect', function () { });
      });
}
