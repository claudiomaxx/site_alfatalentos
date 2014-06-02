'use strict';

app.controller('dadosBasicosCtrl', ['$scope', '$location', '$http', 'usuarioService', function($scope, $location, $http, usuarioService){
    $scope.mensagem = "teste";
    $scope.usuarioLogado = usuarioService.get();
    $scope.usuario = {
        nome: $scope.usuarioLogado.nome,
        email: $scope.usuarioLogado.email,
        dataNascimento: "",
        sexo: "",
        estadoCivil: "",
        habilitacao: "",
        fumante: "",
        veiculo: "",
        pretensaoSalarial: "",
        estado: "",
        cidade: "",
        endereco: "",
        complemento: "",
        bairro: "",
        cep: "",
        telefoneResidencial: "",
        telefoneComercial: "",
        telefoneCelular: ""
    };

    $scope.busca = function() {
        var $promise = $http.get('/site_alfatalentos/php/usuario.php');

        $promise.then(function(retorno){
            if(retorno.data.usuario instanceof Object) {
                var u = retorno.data.usuario;
                
                $scope.usuario.nome = u.nome;
                $scope.usuario.email = u.email;
                $scope.usuario.dataNascimento = u.dataNascimento;
                $scope.usuario.sexo = u.sexo;
                $scope.usuario.estadoCivil = u.estadoCivil;
                $scope.usuario.habilitacao = u.habilitacao;
                $scope.usuario.fumante = u.fumante;
                $scope.usuario.veiculo = u.veiculo;
                $scope.usuario.pretensaoSalarial = u.pretensaoSalarial;
                $scope.usuario.estado = u.estado;
                $scope.usuario.cidade = u.cidade;
                $scope.usuario.endereco = u.endereco;
                $scope.usuario.complemento = u.complemento;
                $scope.usuario.bairro = u.bairro;
                $scope.usuario.cep = u.cep;
                $scope.usuario.telefoneResidencial = u.telefoneResidencial;
                $scope.usuario.telefoneComercial = u.telefoneComercial;
                $scope.usuario.telefoneCelular = u.telefoneCelular;
            
            } else {
                console.log("Necessário efetuar login.");
                $location.path( "/login" );
            }
        });
    };

    $scope.salvar = function(usuario){
        var $promise = $http.post('/site_alfatalentos/php/dados-basicos.php', usuario);

        $promise.then(function(retorno){
            if(retorno.data.mensagem === '') {
                $scope.mensagem = "Dados salvos com sucesso!";

            } else {
                $scope.mensagem = retorno.data.mensagem;
            }
        });
    };
}]);