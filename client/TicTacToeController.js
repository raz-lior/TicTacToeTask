angular.module('ticTacToe',[]).controller('TicTacToeController',['$scope',
function ($scope){
	var ws = new WebSocket('ws://localhost:1234', 'echo-protocol');
	
	$scope.message = "";
	$scope.isGameOver = true;
	$scope.board = [0,0,0,0,0,0,0,0,0];
	
	$scope.todos = [{text:"1"},{text:"2"}]
	
	$scope.getCellRepresentation = function(index){
		if($scope.board[index] === 1)
			return 'X';
		else if($scope.board[index] === 2)
			return 'O';
		else
			return '';
	}
	
	$scope.selectStep = function(index){
		
		if($scope.isGameOver)
		{
			return;
		}
		
		$scope.message = null;
	
		if($scope.board[index] === 0)
		{
			$scope.board[index] = 1;
			var xPos = index % 3;
			var yPos = parseInt(index / 3);
			var stepRequest = { 'x':xPos, 'y':yPos};
			var requestMsg = JSON.stringify(stepRequest);
			ws.send(requestMsg);
		}
		else{
			$scope.message = "The location is already taken.";
		}
	};
	
	ws.addEventListener('message', function(e){
		var msg = e.data;
		
		var turnResult  = JSON.parse(msg);
		$scope.isGameOver = turnResult.IsGameOver;
		$scope.message = turnResult.Message;
		
		if(!$scope.isGameOver)
		{
			var index = turnResult.OpponentStep.x + turnResult.OpponentStep.y*3;
			$scope.board[index] = 2; 
		}
		$scope.$apply();		
	});
}]);