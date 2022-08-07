const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(9898);
const wsServer = new WebSocketServer({
	httpServer: server
});

var clients = [];
var chat = [];

wsServer.on('request', function(request) {
	var connection = request.accept(null, request.origin);
    clients.push(connection);
    
    connection.sendUTF(JSON.stringify(chat));
	  
	connection.on('message', function(message) {
        obj = JSON.parse(message.utf8Data);
        let cuz = 'Cuz' + 'z'.repeat(Math.abs(obj.messageLength - 3));

        obj.message = cuz;
        obj.key = Date.now;

        chat.push(obj);

		clients.forEach(function(client) {
			client.sendUTF(JSON.stringify(chat));
		});
    });
    
	connection.on('close', function(reasonCode, description) {
		console.log('Client has disconnected.');
    });
});
