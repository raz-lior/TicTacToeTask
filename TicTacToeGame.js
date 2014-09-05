
module.exports = TicTacToeGame;

function TicTacToeGame(player1,player2)
{

	this.TotalMoves = 0;
	this.Winner = null;
	this.Loser = null;
	this.IsGameOver = false;
	this.Board = [0,0,0,0,0,0,0,0,0];
	this.Player1 = player1;
	this.Player2 = player2;
		
	this.Player1.Game = this;
	this.Player2.Game = this;
}

TicTacToeGame.prototype.startGame = function(){

	this.Player1.IsPlayerTurn = true;
	console.log((new Date()) + ' Game started.')
}

TicTacToeGame.prototype.processStep = function(step){
	
	if(!this._isStepInsideBoard(step) || !this._isPositionEmpty(step))
		return false;
	
	console.log('x: ' + step.x + ', y: ' + step.y);
	
	this._saveStep(step);
	
	if(this.IsGameOver)
	{
		this._endGame();
		return true;
	}
	
	this.Player1.SetPlayerTurn(!this.Player1.IsPlayerTurn);
	this.Player2.SetPlayerTurn(!this.Player1.IsPlayerTurn);
	
	return true;
}

TicTacToeGame.prototype._endGame = function(){
	
	if(this.Winner === null)
	{
		this.Player1.Notify('You have tied.');
		this.Player2.Notify('You have tied.');
	}
	else
	{
		this.Winner.Notify('You won!');
		this.Loser.Notify('You Lost.');
	}
}

TicTacToeGame.prototype._isStepInsideBoard = function(step){
	if(this._convertStepToArrayLocation(step) <= 8 && this._convertStepToArrayLocation(step) >= 0)
		return true;
		
	return false;
};
	
TicTacToeGame.prototype._isPositionEmpty = function(step){

	if(this.Board[this._convertStepToArrayLocation(step)] === 0)
		return true;
	
	return false;
};
	
TicTacToeGame.prototype._saveStep = function(step){
	var playerBattleSign = this.Player1.IsPlayerTurn ? this.Player1.BattleSign : this.Player2.BattleSign;
	
	this.Board[this._convertStepToArrayLocation(step)] = playerBattleSign;
	this.TotalMoves++;
	
	if(this._isWiningStep(playerBattleSign, step))
	{
		console.log('Game Over');
		this.IsGameOver = true;
		this.Winner = this.Player1.IsPlayerTurn ? this.Player1 : this.Player2;
		this.Loser = this.Player1.IsPlayerTurn ? this.Player2 : this.Player1;
	}
	else if(this.TotalMoves === 9)
	{
		this.IsGameOver = true;
	}
};
	
TicTacToeGame.prototype._isWiningStep = function(playerBattleSign, step){
	if(this._hasPlayerWiningColumns(playerBattleSign))
		return true;
		
	if(this._hasPlayerWiningRows(playerBattleSign))
		return true;
		
	if(this._hasPlayerWiningDiagonals(playerBattleSign))
		return true;
		
	return false;
};

TicTacToeGame.prototype._hasPlayerWiningColumns = function(playerBattleSign){
	for(var i=0; i <3; i++)
	{
		var victoriesInColumn = 0;
		for(var j=0; j < 3; j++)
		{
			var arrayLocation = this._convertStepToArrayLocation({'x':i,'y':j});
			if(this.Board[arrayLocation] === playerBattleSign)
				victoriesInColumn++;
		}
		
		if(victoriesInColumn === 3)
			return true;
	}
	
	return false;
}

TicTacToeGame.prototype._hasPlayerWiningRows = function(playerBattleSign){
	for(var i=0; i <3; i++)
	{
		var victoriesInRow = 0;
		for(var j=0; j < 3; j++)
		{
			var arrayLocation = this._convertStepToArrayLocation({'x':j,'y':i});
			if(this.Board[arrayLocation] === playerBattleSign)
				victoriesInRow++;
		}
		
		if(victoriesInRow === 3)
			return true;
	}
	
	return false;
}

TicTacToeGame.prototype._hasPlayerWiningDiagonals = function(playerBattleSign){
	
	var victoriesInDiagonal = 0;
	for(var i=0; i < 3; i++)
	{
		var arrayLocation = this._convertStepToArrayLocation({'x':i,'y':i});
		if(this.Board[arrayLocation] === playerBattleSign)
			victoriesInDiagonal++;
		
		if(victoriesInDiagonal === 3)
			return true;
	}
	
	victoriesInDiagonal = 0;
	
	for(var j=0, i=2; j < 3 && i >= 0; j++, i--)
	{
		var arrayLocation = this._convertStepToArrayLocation({'x':i,'y':j});
		if(this.Board[arrayLocation] === playerBattleSign)
			victoriesInDiagonal++;
	}
	
	if(victoriesInDiagonal === 3)
		return true;
	
	
	return false;
}

TicTacToeGame.prototype._convertStepToArrayLocation = function(step){
	
	return Number(step.x) + (Number(step.y)*3);
}







