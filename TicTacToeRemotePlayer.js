var TicTacToePlayer = require('./TicTacToePlayer');

module.exports = TicTacToeRemotePlayer;

function TicTacToeRemotePlayer(webSocketConnection, battleSign)
{
	var pointerToCurrentObject = this;
	this.BattleSign = battleSign;
	this.Connection = webSocketConnection;
	this.Connection.on('message',function(message) { pointerToCurrentObject.HandleStep(message); } );
}

TicTacToeRemotePlayer.prototype = new TicTacToePlayer(1);

TicTacToeRemotePlayer.prototype.Notify = function(message){

	this.Connection.sendUTF(message);
}

TicTacToeRemotePlayer.prototype.HandleStep = function(message){
	
	if(this.Game.IsGameOver)
	{
		this.Notify('The game is over.');
		return;
	}
	var stepRequest = JSON.parse(message.utf8Data);
	
	if(!this.Game.processStep(stepRequest))
	{
		this.Notify('Step is either not valid or taken by a player.');
	}
}