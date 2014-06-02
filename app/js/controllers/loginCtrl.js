'use strict';

app.controller('loginCtrl', ['$scope', '$location', 'loginService', function($scope, $location, loginService){
    
    $scope.mensagem = "";
    
    $scope.login = function(usuario){
        var $promise = loginService.login(usuario);
        
        $promise.then(function(retorno){
            if(retorno.data === 'success') {
                $location.path( "/dados-basicos" );
                
            } else {
                $scope.mensagem = "Usuário/Senha inválidos.";
            }
        });
    };
}]);