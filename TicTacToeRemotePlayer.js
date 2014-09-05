var TicTacToePlayer = require('./TicTacToePlayer');

module.exports = TicTacToeRemotePlayer;

function TicTacToeRemotePlayer(webSocketConnection)
{
	var pointerToCurrentObject = this;
	this.Connection = webSocketConnection;
	this.Connection.on('message',function(message) { pointerToCurrentObject.HandleStep(message); } );
}

TicTacToeRemotePlayer.prototype = new TicTacToePlayer(1);

TicTacToeRemotePlayer.prototype.Notify = function(message){

	this.Connection.sendUTF(message);
}

TicTacToeRemotePlayer.prototype.HandleStep = function(message){
	//TODO: convert to step object
	
	var locations = message.utf8Data.split(',');
	
	if(!this.Game.processStep({ x:locations[0], y:locations[1] } ))
	{
		this.Notify('Step is either not valid or taken by other player.');
	}
}