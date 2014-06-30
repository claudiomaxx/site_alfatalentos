'use strict';

app.controller('experienciaProfissionalCtrl', ['$http', '$scope', '$location', 'usuarioService', function($http, $scope, $location, usuarioService){
    
    $scope.formAtivo = false;
    $scope.mensagem = "";
    $scope.usuario = "";
    $scope.items = [];
    $scope.experiencia = {
        id: 0,
        usuario_id: 0,
        empresa: "",
        cargo: "",
        atividades: "",
        motivoSaida: "",
        dataEntrada: "",
        dataSaida: ""
    };
    
    var itemAntesEdicao = {};
    
    $scope.selecionar = function(item) {
        itemAntesEdicao = angular.copy(item);
        $scope.experiencia = item;
        $scope.formAtivo = true;
    };
    
    $scope.cancelar = function(item) {
        angular.copy(itemAntesEdicao, item);
        itemAntesEdicao = {};
        
        $scope.experiencia = {
            id: 0,
            usuario_id: 0,
            empresa: "",
            cargo: "",
            atividades: "",
            motivoSaida: "",
            dataEntrada: "",
            dataSaida: ""
        };
        
        $scope.formAtivo = false;
    };
    
    $scope.excluir = function(item) {
        
        $http.post('/talentos/php/experiencia-profissional-delete.php', { id: item.id, usuario_id: $scope.usuario.id}).success(function(retorno){
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
        $scope.experiencia = {
            id: 0,
            usuario_id: 0,
            empresa: "",
            cargo: "",
            atividades: "",
            motivoSaida: "",
            dataEntrada: "",
            dataSaida: ""
        };
        
        $scope.formAtivo = true;
    };
    
    $scope.salvar = function(){
        $scope.mensagem = "";
        
        if($scope.experiencia.empresa === "") {
            $scope.mensagem = "Empresa não informada.";
            
        } else if($scope.experiencia.cargo === "") {
            $scope.mensagem = "Cargo não informado.";
            
        } else if($scope.experiencia.atividades === "") {
            $scope.mensagem = "Atividades não informadas.";    
            
        } else if($scope.experiencia.dataEntrada === "") {
            $scope.mensagem = "Data Entrada não informada.";    
            
        } else {
            $scope.experiencia.usuario_id = $scope.usuario.id;
            
            var $promise = $http.post('/talentos/php/experiencia-profissional.php', $scope.experiencia);

            $promise.then(function(retorno){
                if(retorno.data.mensagem === '' && retorno.data.dados instanceof Object) {
                    $scope.mensagem = "Dados salvos com sucesso!";
                    $scope.items = retorno.data.dados;
                    
                    $scope.experiencia = {
                        id: 0,
                        usuario_id: 0,
                        empresa: "",
                        cargo: "",
                        atividades: "",
                        motivoSaida: "",
                        dataEntrada: "",
                        dataSaida: ""
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
            
            $http.post('/talentos/php/experiencia-profissional-lista.php', { usuario_id : $scope.usuario.id}).success(function(retorno){
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