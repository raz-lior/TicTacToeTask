var TicTacToePlayer = require('./TicTacToePlayer');

module.exports = AutomaticTicTacToePlayer;

function AutomaticTicTacToePlayer(battleSign)
{
	this.BattleSign = battleSign;
}

AutomaticTicTacToePlayer.prototype = new TicTacToePlayer(1);

AutomaticTicTacToePlayer.prototype.Notify = function(message){

	var turnResult  = JSON.parse(message);
	if(turnResult.Message !== null && turnResult.Message !== undefined)
		console.log(turnResult.Message);
}

AutomaticTicTacToePlayer.prototype.HandleStep = function(step){
	return this.Game.processStep(step);
}

AutomaticTicTacToePlayer.prototype.SetPlayerTurn = function(isPlayerTurn){
	this.IsPlayerTurn = isPlayerTurn;
	
	if(isPlayerTurn)
	{
		var nextStep = this._getBlockingStep();
		if(nextStep === undefined)
			nextStep = this._getNextAvailableCorner();
		
		if(nextStep === undefined)
			nextStep = this._getNextAvailableStep();
		
		if(nextStep !== undefined)		
			console.log('AutomaticTicTacToePlayer ' + this.BattleSign + ' step: ' + nextStep.x + ',' + nextStep.y);
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

AutomaticTicTacToePlayer.prototype._getNextAvailableCorner = function(){
	for(var i=0; i < 3; i+=2)
	{
		for(var j=0; j < 3; j+=2)
		{
			var index = i + j*3;
			if(this.Game.Board[index] === 0)
				return { x: i, y: j };
		}
	}
}

AutomaticTicTacToePlayer.prototype._getBlockingStep = function(){

	var nextStep = this._getBlockingStepOnColumns(this.BattleSign);
	
	if(nextStep === undefined)
		nextStep = this._getBlockingStepOnRows(this.BattleSign);
		
	if(nextStep === undefined)
		nextStep = this._getBlockingStepOnDiagonals(this.BattleSign);
	
	return nextStep;
}



AutomaticTicTacToePlayer.prototype._getBlockingStepOnColumns = function(playerBattleSign){
	for(var i=0; i <3; i++)
	{
		var victoriesInColumn = 0;
		var openIndexX = -1;
		var openIndexY = -1;
		for(var j=0; j < 3; j++)
		{
			var arrayLocation = this._convertStepToArrayLocation({'x':i,'y':j});
			if(this.Game.Board[arrayLocation] !== playerBattleSign && this.Game.Board[arrayLocation] !== 0)
				victoriesInColumn++;
			else if(this.Game.Board[arrayLocation] === 0)
			{
				openIndexX = i;
				openIndexY = j;
			}
		}
		
		if(victoriesInColumn === 2 && openIndexX !== -1)
			return { x: openIndexX, y: openIndexY};
	}
}

AutomaticTicTacToePlayer.prototype._getBlockingStepOnRows = function(playerBattleSign){
	for(var i=0; i <3; i++)
	{
		var victoriesInRow = 0;
		var openIndexX = -1;
		var openIndexY = -1;
		for(var j=0; j < 3; j++)
		{
			var arrayLocation = this._convertStepToArrayLocation({'x':j,'y':i});
			if(this.Game.Board[arrayLocation] !== playerBattleSign && this.Game.Board[arrayLocation] !== 0)
				victoriesInRow++;
			else if(this.Game.Board[arrayLocation] === 0)
			{
				openIndexX = j;
				openIndexY = i;
			}
		}
		
		if(victoriesInRow === 2 && openIndexX !== -1)
			return { x: openIndexX, y: openIndexY};
	}
}

AutomaticTicTacToePlayer.prototype._getBlockingStepOnDiagonals = function(playerBattleSign){
	
	var victoriesInDiagonal = 0;
	var openIndexX = -1;
	var openIndexY = -1;
	for(var i=0; i < 3; i++)
	{
		var arrayLocation = this._convertStepToArrayLocation({'x':i,'y':i});
		if(this.Game.Board[arrayLocation] !== playerBattleSign && this.Game.Board[arrayLocation] !== 0)
			victoriesInDiagonal++;
		else if(this.Game.Board[arrayLocation] === 0)
		{
			openIndexX = i;
			openIndexY = i;
		}
		
		if(victoriesInDiagonal === 2 && openIndexX !== -1)
			return { x: openIndexX, y: openIndexY};
	}
	
	victoriesInDiagonal = 0;
	openIndexX = -1;
	openIndexY = -1;
	
	for(var j=0, i=2; j < 3 && i >= 0; j++, i--)
	{
		var arrayLocation = this._convertStepToArrayLocation({'x':i,'y':j});
		if(this.Game.Board[arrayLocation] !== playerBattleSign && this.Game.Board[arrayLocation] !== 0)
			victoriesInDiagonal++;
		else if(this.Game.Board[arrayLocation] === 0)
		{
			openIndexX = i;
			openIndexY = j;
		}
	}
	
	if(victoriesInDiagonal === 2 && openIndexX !== -1)
			return { x: openIndexX, y: openIndexY};
}

AutomaticTicTacToePlayer.prototype._convertStepToArrayLocation = function(step){
	
	return Number(step.x) + (Number(step.y)*3);
}