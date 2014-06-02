'use strict';

app.controller('experienciaProfissionalCtrl', ['$http', '$scope', '$location', function($http, $scope, $location){
    
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
                    $location.path( "/dados-basicos" );

                } else {
                    $scope.mensagem = retorno.data.mensagem;
                }
            });
        }
    };
}]);