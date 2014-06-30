'use strict';

app.controller('dadosBasicosCtrl', ['$scope', '$location', '$http', '$filter', 'usuarioService', function($scope, $location, $http, $filter, usuarioService){
    $scope.mensagem = "";
    
    console.log(usuarioService.usuarioLogado);
    
    usuarioService.getUsuario().success(function(response){
        if(response.mensagem === '' && response.usuario instanceof Object) {
            $scope.usuario = response.usuario;
            console.log($scope.usuario);
            
            usuarioService.usuarioLogado = response.usuario;
            
            $scope.usuario.dataNascimento = $filter('date')($scope.usuario.dataNascimento, "dd/MM/yyyy");
            $scope.usuario.pretensaoSalarial = $filter('number')($scope.usuario.pretensaoSalarial, 2);
            $scope.usuario.estadoCivil = $scope.listaEstadoCivil[$scope.usuario.estadoCivil_id - 1];

        } else {
            $location.path('/');
        }
    });
    
    $scope.listaEstadoCivil = [
        { codigo: 1, descricao: "Solteiro(a)" },
        { codigo: 2, descricao: "Casado(a)" },
        { codigo: 3, descricao: "Separado(a)" },
        { codigo: 4, descricao: "Divorciado(a)" },
        { codigo: 5, descricao: "Viúvo(a)" }
    ];
    
    $scope.listaHabilitacao = [ 'AB', 'A', 'B', 'C', 'D', 'E'];
   
    $scope.salvar = function(usuario){
        if(usuario.estadoCivil instanceof Object) {
            usuario.estadoCivil_id = usuario.estadoCivil.codigo;
        }

        var $promise = $http.post('/talentos/php/dados-basicos.php', usuario);

        $promise.then(function(retorno){
            if(retorno.data.mensagem === '') {
                $scope.mensagem = "Dados salvos com sucesso!";

            } else {
                $scope.mensagem = retorno.data.mensagem;
            }
        });
    };
}]);