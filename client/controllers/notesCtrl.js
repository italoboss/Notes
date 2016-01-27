angular.module('notes', []);
angular.module('notes').controller('notesCtrl', function($scope, $http) {
    $scope.noteContent = '';

    $scope.getAllNotes = function() {
         $http({method: 'GET', url: '/db/readNotes'}).
            success(function(data, status) { 
                $scope.dataset = data;
            }).
            error(function(data, status) {
                $scope.dataset = data || "Request failed ";
            });
    }       

    $scope.addNote = function() { 
        $http({method: 'GET', url: '/db/addNote?noteContent=' + $scope.noteContent}).
            success(function(data, status) { 
                alert('Nova nota adicionada!');
                $scope.getAllNotes();
            });  
    }

    $scope.delNote = function(noteId) {
        console.log(noteId);
        if(confirm('Tem certeza que deseja [DELETAR] essa nota?'))
        {
            $http({method: 'GET', url: '/db/delNote?id=' + noteId}).
                success(function(data, status) {  
                    $scope.getAllNotes();
                });
        }
    }

    $scope.doLogout = function() {
        $http({method: 'GET', url: '/db/doLogout'}).
                success(function(data, status) {  
                    window.location = "/";
                });
    }

    $scope.getAllNotes();
}); 