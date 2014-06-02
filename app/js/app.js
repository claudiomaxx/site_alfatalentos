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

app.factory('usuarioService', function() {
    var usuario = {
        
    };
    
    return {
        add : function(u) {
            usuario = u;
            console.log(u);
            console.log(usuario);
        },
        get : function() {
            return usuario;
        }
    };
});