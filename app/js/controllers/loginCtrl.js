'use strict';

app.controller('loginCtrl', ['$scope', '$location', '$http', 'usuarioService', function($scope, $location, $http, usuarioService){
    
    $scope.mensagem = "";
    
    $scope.login = function(usuario){
        if($scope.usuario.email === "") {
            $scope.mensagem = "Email não informado.";

        } else if($scope.usuario.email.indexOf("@") < 1 || $scope.usuario.email.indexOf(".") < 3) {
            $scope.mensagem = "Email inválido.";
            
        } else if($scope.usuario.senha === "") {
            $scope.mensagem = "Senha não informada.";
            
        } else {
            var $promise = $http.post('/talentos/php/login.php', usuario);

            $promise.then(function(retorno){
                if(retorno.data.mensagem === '' && retorno.data.usuario instanceof Object) {
                    usuarioService.usuarioLogado = retorno.data.usuario;
                    $location.path( "/dados-basicos" );

                } else {
                    $scope.mensagem = retorno.data.mensagem;
                }
            });
        }
        
    };
}]);