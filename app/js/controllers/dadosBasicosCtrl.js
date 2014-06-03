'use strict';

app.controller('dadosBasicosCtrl', ['$scope', '$location', '$http', 'usuarioService', function($scope, $location, $http, usuarioService){
    $scope.mensagem = "teste";
    $scope.usuarioLogado = usuarioService.get();
    
    $scope.listaEstadoCivil = [
        { codigo: 1, descricao: "Solteiro(a)" },
        { codigo: 2, descricao: "Casado(a)" },
        { codigo: 3, descricao: "Separado(a)" },
        { codigo: 4, descricao: "Divorciado(a)" },
        { codigo: 5, descricao: "Viúvo(a)" }
    ];
    
    $scope.listaHabilitacao = [ 'AB', 'A', 'B', 'C', 'D', 'E'];
    
    $scope.usuario = {
        nome: $scope.usuarioLogado.nome,
        email: $scope.usuarioLogado.email,
        dataNascimento: "",
        sexo: "",
        estadoCivil: "",
        filhos: 0,
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
                
                console.log(u.estadoCivil);
                
                $scope.usuario.nome = u.nome;
                $scope.usuario.email = u.email;
                $scope.usuario.dataNascimento = u.dataNascimento;
                $scope.usuario.sexo = u.sexo;
                $scope.usuario.estadoCivil = u.estadoCivil;
                $scope.usuario.filhos = u.filhos;
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