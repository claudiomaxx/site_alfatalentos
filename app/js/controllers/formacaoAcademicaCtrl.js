'use strict';

app.controller('formacaoAcademicaCtrl', ['$http', '$scope', '$location', 'usuarioService', function($http, $scope, $location, usuarioService){
    
    $scope.formAtivo = false;
    $scope.mensagem = "";
    $scope.usuario = "";
    $scope.items = [];
    $scope.formacao = {
        id: 0,
        usuario_id: 0,
        nomeInstituicao: "",
        tipoFormacao: "",
        areaFormacao: "",
        statusFormacao: "",
        periodoAtual: "",
        mesAnoConclusao: ""
    };
    
    $scope.listaTipoFormacao = [
        { codigo: 1, descricao : 'Ensino Fundamental'},
        { codigo: 2, descricao : 'Ensino Médio'},
        { codigo: 3, descricao : 'Superior'},
        { codigo: 4, descricao : 'Especialização'},
        { codigo: 5, descricao : 'Mestrado'},
        { codigo: 6, descricao : 'Doutorado'},
        { codigo: 7, descricao : 'PHD'}
    ];
    
    $scope.listaAreaFormacao = [
        { codigo: 1, descricao : 'TI'}
    ];
    
    $scope.listaStatusFormacao = [
        { codigo: 1, descricao : 'Incompleto'},
        { codigo: 2, descricao : 'Cursando'},
        { codigo: 3, descricao : 'Completo'}
    ];
    
    var itemAntesEdicao = {};
    
    $scope.selecionar = function(item) {
        itemAntesEdicao = angular.copy(item);
        $scope.formacao = item;
        
        $scope.formacao.areaFormacao = $scope.listaAreaFormacao[$scope.formacao.areaFormacao_id - 1];
        $scope.formacao.tipoFormacao = $scope.listaTipoFormacao[$scope.formacao.tipoFormacao_id - 1];
        $scope.formacao.statusFormacao = $scope.listaStatusFormacao[$scope.formacao.statusFormacao_id - 1];
        
        console.log($scope.formacao);
        
        $scope.formAtivo = true;
    };
    
    $scope.cancelar = function(item) {
        angular.copy(itemAntesEdicao, item);
        itemAntesEdicao = {};
        
        $scope.formacao = {
            id: 0,
            usuario_id: 0,
            nomeInstituicao: "",
            tipoFormacao: "",
            areaFormacao: "",
            statusFormacao: "",
            periodoAtual: "",
            mesAnoConclusao: ""
        };
        
        $scope.formAtivo = false;
    };
    
    $scope.excluir = function(item) {
        
        $http.post('/talentos/php/formacao-academica-delete.php', { id: item.id, usuario_id: $scope.usuario.id}).success(function(retorno){
            if(retorno.mensagem === '') {
                $scope.mensagem = "Dados excluídos com sucesso!";
                
                if(retorno.dados instanceof Object) {
                    $scope.items = retorno.dados;
                    $scope.formAtivo = false;
                
                } else {
                    $scope.items = [];
                    $scope.formAtivo = true;
                }

            } else {
                $scope.items = [];
                $scope.mensagem = retorno.mensagem;
            }
        });
    };
    
    $scope.novo = function() {
        $scope.formacao = {
            id: 0,
            usuario_id: 0,
            nomeInstituicao: "",
            tipoFormacao: "",
            areaFormacao: "",
            statusFormacao: "",
            periodoAtual: "",
            mesAnoConclusao: ""
        };
        
        $scope.formAtivo = true;
    };
    
    $scope.salvar = function(){
        $scope.mensagem = "";
        
        if($scope.formacao.nomeInstituicao === "") {
            $scope.mensagem = "Nome instituição não informado.";
            
        } else if($scope.formacao.tipoFormacao === "") {
            $scope.mensagem = "Tipo de formação não informado.";
            
        //} else if($scope.formacao.areaFormacao === "") {
        //    $scope.mensagem = "Área de formação não informado.";    
            
        } else if($scope.formacao.statusFormacao === "") {
            $scope.mensagem = "Status formação não informado.";    
            
        } else {
            $scope.formacao.usuario_id = $scope.usuario.id;
            
            var formacaoEnvio = {
                usuario_id : $scope.formacao.usuario_id,
                id: $scope.formacao.id,
                mesAnoConclusao: $scope.formacao.mesAnoConclusao,
                nomeInstituicao: $scope.formacao.nomeInstituicao,
                periodoAtual: $scope.formacao.periodoAtual,
                areaFormacao: $scope.formacao.areaFormacao ? $scope.formacao.areaFormacao.codigo : "",
                statusFormacao: $scope.formacao.statusFormacao ? $scope.formacao.statusFormacao.codigo : "",
                tipoFormacao: $scope.formacao.tipoFormacao ? $scope.formacao.tipoFormacao.codigo : ""
            };
            
            var $promise = $http.post('/talentos/php/formacao-academica.php', formacaoEnvio);

            $promise.then(function(retorno){
                console.log(retorno);
                if(retorno.data.mensagem === '' && retorno.data.dados instanceof Object) {
                    $scope.mensagem = "Dados salvos com sucesso!";
                    $scope.items = retorno.data.dados;
                    
                    $scope.formacao = {
                        id: 0,
                        usuario_id: 0,
                        nomeInstituicao: "",
                        tipoFormacao: "",
                        areaFormacao: "",
                        statusFormacao: "",
                        periodoAtual: "",
                        mesAnoConclusao: ""
                    };
                    
                    $scope.formAtivo = false;
                    
                } else {
                    $scope.mensagem = retorno.data.mensagem;
                }
            });
        }
    };
    
    usuarioService.getUsuario().success(function(response){
        if(response.mensagem === '' && response.usuario instanceof Object) {
            $scope.usuario = response.usuario;
            
            $http.post('/talentos/php/formacao-academica-lista.php', { usuario_id : $scope.usuario.id}).success(function(retorno){

                if(retorno.dados) {
                    $scope.items = retorno.dados;
                }
                
                if($scope.items.length === 0) {
                    $scope.formAtivo = true;
                }
            });
            
        } else {
            $location.path('/');
        }
    });
}]);