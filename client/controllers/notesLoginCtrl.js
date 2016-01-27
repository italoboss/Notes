angular.module('notesLogin', []);
angular.module('notesLogin').controller('notesLoginCtrl', function($scope, $http) {

    $scope.connect = function() {
        $http({method: 'GET', url: '/db/doLogin?login=' + $scope.login + '&password=' + $scope.password}).
            success(function(data, status) {
                if (data != 'Sucesso')
                	$scope.errorMsg = data;
                else
                	window.location = "/";
            }).
            error(function(data, status) {
                $scope.errorMsg = data || "Falha em conectar.";
            });  
    }

    $scope.enter = function(keyEvent) {
    	if(keyEvent.which === 13) {
    		$scope.connect();
    	}
    }

});