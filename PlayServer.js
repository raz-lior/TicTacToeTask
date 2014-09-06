
var SERVER_PORT = process.env.PORT || 1234;
var http = require('http');
var url = require("url");
var path = require("path");
var fs = require("fs");
var server = http.createServer(function(request, response){
	console.log(request.url);
	var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
    path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
});

server.on('error', function(e){
	if(e.code == 'EACCES'){
		console.log('port number ' + SERVER_PORT +' is allready taken.\nplease run the server on a different port.');
	}
	else
	{
		console.log(e);
	}
});


server.listen(SERVER_PORT, function(){
	console.log((new Date()) + ' Server is listening on port ' + SERVER_PORT);
});
	
var TicTacToeGame = require('./TicTacToeGame');	
var AutomaticTicTacToePlayer = require('./AutomaticTicTacToePlayer');	
var TicTacToeRemotePlayer = require('./TicTacToeRemotePlayer');	
var WebSocketServer = require('websocket').server;

var wsServer = new WebSocketServer({ httpServer: server});

var count = 0;
var games = {};

wsServer.on('request', function(r){ 
console.log('recieved a game request');
//TODO: change the protocol
	var connection = r.accept('echo-protocol',r.origin);
	var id = count++;
	
	var ticTactToeRemotePlayer = new TicTacToeRemotePlayer(connection, 3);
	
	games[id] = new TicTacToeGame(ticTactToeRemotePlayer,new AutomaticTicTacToePlayer(5));
	
	games[id].startGame();
	
	connection.on('close',function(reasonCode, description){
		delete games[id];
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
	});
});