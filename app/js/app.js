'use strict';

var app = angular.module('talentosApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/login', {templateUrl: 'partials/login.html'});
    $routeProvider.when('/dados-basicos', {templateUrl: 'partials/dados-basicos.html', controller: 'dadosBasicosCtrl'});
    $routeProvider.when('/experiencia-profissional', {templateUrl: 'partials/experiencia-profissional.html', controller: 'experienciaProfissionalCtrl'});
    $routeProvider.when('/formacao-academica', {templateUrl: 'partials/formacao-academica.html', controller: 'formacaoAcademicaCtrl'});
    $routeProvider.when('/idiomas', {templateUrl: 'partials/idiomas.html', controller: 'idiomasCtrl'});
    $routeProvider.otherwise({redirectTo: '/login'});
}]);

app.factory('usuarioService',['$location', '$http', function($location, $http) {
    return {
        getUsuario : function(){
            return $http.get('/site_alfatalentos/php/usuario.php');
        }
    };
}]);

app.controller('mainCtrl', ['$scope', '$location', function($scope, $location){
    $scope.go = function(to) {
        $location.path(to);
    }
}]);