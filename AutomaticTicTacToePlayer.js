var TicTacToePlayer = require('./TicTacToePlayer');

module.exports = AutomaticTicTacToePlayer;

function AutomaticTicTacToePlayer()
{
}

AutomaticTicTacToePlayer.prototype = new TicTacToePlayer(2);

AutomaticTicTacToePlayer.prototype.Notify = function(message){

	console.log(message);
}

AutomaticTicTacToePlayer.prototype.HandleStep = function(step){
	return this.Game.processStep(step);
}

AutomaticTicTacToePlayer.prototype.SetPlayerTurn = function(isPlayerTurn){
	this.IsPlayerTurn = isPlayerTurn;
	
	if(isPlayerTurn)
	{
		var nextStep = this._getNextAvailableStep();
		stepSaved = this.HandleStep(nextStep);
	}
}

AutomaticTicTacToePlayer.prototype._getNextAvailableStep = function(){
	for(var i=0; i < this.Game.Board.length; i++)
	{
		if(this.Game.Board[i] === 0)
			return { x: i%3, y: parseInt(i/3) };
	}
}