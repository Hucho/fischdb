var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', '$filter', function ($scope, $http){
		console.log("Hello from AppCtrl");

	var refresh = function(){
		$http.get('/totals').success(function(response){
			console.log("I got the data I requested!");
			$scope.totals = response;
			
		});

	}

	refresh();

}]);