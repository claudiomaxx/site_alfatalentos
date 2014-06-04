'use strict';

app.controller('cadastroInicialCtrl', ['$http', '$scope', '$location', function($http, $scope, $location){
    
    $http.get('/site_alfatalentos/php/logout.php');
    
    $scope.mensagem = "";
    $scope.tipoCadastro = 0;
    $scope.usuario = {
        nome: "",
        email: "",
        senha: ""
    };
    
    $scope.cadastrar = function(){
        $scope.mensagem = "";
        
        if($scope.tipoCadastro < 1 || $scope.tipoCadastro > 2) {
            $scope.mensagem = "Tipo de cadastro não selecionado.";
            
        } else if($scope.usuario.nome === "") {
            $scope.mensagem = "Nome não informado.";
            
        } else if($scope.usuario.email === "") {
            $scope.mensagem = "Email não informado.";

        } else if($scope.usuario.email.indexOf("@") < 1 || $scope.usuario.email.indexOf(".") < 3) {
            $scope.mensagem = "Email inválido.";
            
        } else if($scope.usuario.senha === "") {
            $scope.mensagem = "Senha não informada.";
            
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