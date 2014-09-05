module.exports = TicTacToePlayer;

function TicTacToePlayer(battleSign){
	
	this.Game = null;
	this.BattleSign = battleSign;
	this.IsPlayerTurn = false;
}

TicTacToePlayer.prototype.SetPlayerTurn = function(isPlayerTurn){
		this.IsPlayerTurn = isPlayerTurn;
};

TicTacToePlayer.prototype.HandleStep = function(message){
	//TODO: do we need to have the same signature? should we implement a default handling
	console.log(message.utf8Data);
};