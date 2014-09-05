
var SERVER_PORT = 1234;
var http = require('http');
var server = http.createServer(function(request, response){});

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

//TODO: change the protocol
	var connection = r.accept('echo-protocol',r.origin);
	var id = count++;
	
	var ticTactToeRemotePlayer = new TicTacToeRemotePlayer(connection);
	
	games[id] = new TicTacToeGame(ticTactToeRemotePlayer,new AutomaticTicTacToePlayer());
	
	games[id].startGame();
	
	connection.on('close',function(reasonCode, description){
		delete games[id];
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
	});
});