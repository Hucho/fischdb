function AppCtrl($scope, $http) {
	console.log("Hello from AppCtrl")

	var showTotal = function(){

		$http.get('./gesamtergebnis').success(function(response){

				console.log("I got the data I requested!");
			$scope.gesamtergebnis = response;
			
		});
	}
}