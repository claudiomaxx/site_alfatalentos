'use strict';

app.controller('idiomaCtrl', ['$http', '$scope', '$location', 'usuarioService', function($http, $scope, $location, usuarioService){
    
    $scope.formAtivo = false;
    $scope.mensagem = "";
    $scope.usuario = "";
    $scope.items = [];
    $scope.idioma = {
        id: 0,
        usuario_id: 0,
        nome: "",
        nivelIdioma: ""
    };

    $scope.listaNivelIdioma = [
        { codigo: 1, descricao : 'BÁSICO'},
        { codigo: 2, descricao : 'INTERMEDIÁRIO'},
        { codigo: 3, descricao : 'AVANÇADO'},
        { codigo: 4, descricao : 'FLUENTE'}
    ];
    
    var itemAntesEdicao = {};
    
    $scope.selecionar = function(item) {
        itemAntesEdicao = angular.copy(item);
        $scope.idioma = item;
        $scope.idioma.nivelIdioma = $scope.listaNivelIdioma[$scope.idioma.nivelIdioma_id - 1];
        $scope.formAtivo = true;
    };
    
    $scope.cancelar = function(item) {
        angular.copy(itemAntesEdicao, item);
        itemAntesEdicao = {};
        
        $scope.idioma = {
            id: 0,
            usuario_id: 0,
            nome: "",
            nivelIdioma: ""
        };
        
        $scope.formAtivo = false;
    };
    
    $scope.excluir = function(item) {
        
        $http.post('/talentos/php/idioma-delete.php', { id: item.id, usuario_id: $scope.usuario.id}).success(function(retorno){
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
        $scope.idioma = {
            id: 0,
            usuario_id: 0,
            nome: "",
            nivelIdioma: ""
        };
        
        $scope.formAtivo = true;
    };
    
    $scope.salvar = function(){
        $scope.mensagem = "";
        
        if($scope.idioma.nome === "") {
            $scope.mensagem = "Idioma não informado.";
            
        } else if($scope.idioma.nivelIdioma === "") {
            $scope.mensagem = "Nível idioma não informado.";
            
        } else {
            $scope.idioma.usuario_id = $scope.usuario.id;
            
            var envio = {
                usuario_id : $scope.idioma.usuario_id,
                id: $scope.idioma.id,
                nome: $scope.idioma.nome,
                nivelIdioma: $scope.idioma.nivelIdioma ? $scope.idioma.nivelIdioma.codigo : ""
            };
            
            var $promise = $http.post('/talentos/php/idioma.php', envio);

            $promise.then(function(retorno){
                console.log(retorno);
                if(retorno.data.mensagem === '' && retorno.data.dados instanceof Object) {
                    $scope.mensagem = "Dados salvos com sucesso!";
                    $scope.items = retorno.data.dados;
                    
                    angular.forEach($scope.items, function (item) {
                        item.nivelIdioma = $scope.listaNivelIdioma[item.nivelIdioma_id - 1];
                    });
                    
                    $scope.idioma = {
                        id: 0,
                        usuario_id: 0,
                        nome: "",
                        nivelIdioma: ""
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
            
            $http.post('/talentos/php/idioma-lista.php', { usuario_id : $scope.usuario.id}).success(function(retorno){

                if(retorno.dados) {
                    $scope.items = retorno.dados;
                    
                    angular.forEach($scope.items, function (item) {
                        item.nivelIdioma = $scope.listaNivelIdioma[item.nivelIdioma_id - 1];
                    });
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