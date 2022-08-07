const http = require("http");
const WebSocketServer = require("websocket").server;
var server = http.createServer((request) => {
  console.log(new Date() + " Received request for " + request.url);
});

server.listen(9898, () => {
  console.log(new Date() + " Listening on port 9898");
});

const wsServer = new WebSocketServer({
  httpServer: server,
});

var clients = [];
var chat = [];

wsServer.on("request", function (request) {
  var connection = request.accept(null, request.origin);
  console.log(new Date() + " Connection accepted. " + connection);
  clients.push(connection);

  connection.sendUTF(JSON.stringify(chat));

  connection.on("message", function (message) {
    obj = JSON.parse(message.utf8Data);
    let cuz = "Cuz" + "z".repeat(Math.abs(obj.messageLength - 3));

    obj.message = cuz;
    obj.key = Date.now;

    chat.push(obj);

    clients.forEach(function (client) {
      client.sendUTF(JSON.stringify(chat));
    });
  });

  connection.on("close", function (reasonCode, description) {
    new Date() + " Peer " + connection.remoteAddress + " disconnected.";
  });
});
