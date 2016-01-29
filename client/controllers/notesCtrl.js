angular.module('notes', []);
angular.module('notes').controller('notesCtrl', function($scope, $http) {
    // Valor padrao para cor da nota
    $scope.noteColor = 'y';
    /*
     * Funcao para obter as notas do usuario e passa-las para a view.
     */
    $scope.getAllNotes = function() {
         $http({method: 'POST', url: '/db/readNotes'}).
            success(function(data, status) { 
                $scope.dataset = data;
            }).
            error(function(data, status) {
                $scope.dataset = data || "Request failed ";
            });
    }
    /*
     * Funcao para adicionar uma nota do usuario e atualizar a view.
     */
    $scope.addNote = function() { 
        $http({method: 'POST', url: '/db/addNote?noteContent=' + $scope.noteContent + '&noteColor=' + $scope.noteColor}).
            success(function(data, status) { 
                // alert('Nova nota adicionada!');
                $scope.addClicked = false;
                $scope.getAllNotes();
                delete $scope.noteContent;
            });  
    }
    /*
     * Funcao para deletar uma nota do usuario e atualizar a view.
     */
    $scope.delNote = function(noteId) {
        if(confirm('Tem certeza que deseja [DELETAR] essa nota?'))
        {
            $http({method: 'POST', url: '/db/delNote?id=' + noteId}).
                success(function(data, status) {  
                    $scope.getAllNotes();
                });
        }
    }
    /*
     * Funcao para desconectar o usuario e encaminhar para o tela de login.
     */
    $scope.doLogout = function() {
        $http({method: 'POST', url: '/db/doLogout'}).
                success(function(data, status) { 
                    window.location = "/";
                });
    }
    /*
     * Funcoes para identificar quando o mouse entrar ou sair de uma nota.
     */
    $scope.hoverIn = function() {
        this.isHover = true;
    };
    $scope.hoverOut = function() {
        this.isHover = false;
    };
    /*
     * Funcao para identificar quando o botao de adicionar nota for clicado.
     */
    $scope.newNoteClick = function() {
        $scope.addClicked = !$scope.addClicked;
    };

    /*
     * Funcao para modificar a cor da nota a ser adicionada.
     */
    $scope.changeColorNote = function(charColor) {
        $scope.noteColor = charColor;
    }

    $scope.getAllNotes();
}); 