'use strict';

app.controller('cadastroInicialCtrl', ['$http', '$scope', '$location', 'usuarioService', function($http, $scope, $location, usuarioService){
    
    $scope.mensagem = "";
    $scope.tipoCadastro = 0;
    $scope.usuario = {
        nome: "",
        email: "",
        senha: ""
    };
    
    $scope.cadastrar = function(){
        if($scope.tipoCadastro < 1 || $scope.tipoCadastro > 2) {
            $scope.mensagem = "Tipo de cadastro não selecionado.";
            
        } else {
            var cadastro = {
                tipoCadastro: $scope.tipoCadastro,
                usuario: $scope.usuario
            };

            var $promise = $http.post('/site_alfatalentos/php/cadastro-inicial.php', cadastro);

            $promise.then(function(retorno){
                if(retorno.data.mensagem === '') {
                    usuarioService.add(usuario);
                    $location.path( "/dados-basicos" );

                } else {
                    $scope.mensagem = retorno.data.mensagem;
                }
            });
        }
    };
}]);