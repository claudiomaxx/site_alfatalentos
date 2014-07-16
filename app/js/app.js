'use strict';

var app = angular.module('talentosApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/login', {templateUrl: 'partials/login.html'});
    $routeProvider.when('/dados-basicos', {templateUrl: 'partials/dados-basicos.html', controller: 'dadosBasicosCtrl'});
    $routeProvider.when('/experiencia-profissional', {templateUrl: 'partials/experiencia-profissional.html', controller: 'experienciaProfissionalCtrl'});
    $routeProvider.when('/formacao-academica', {templateUrl: 'partials/formacao-academica.html', controller: 'formacaoAcademicaCtrl'});
    $routeProvider.when('/idiomas', {templateUrl: 'partials/idiomas.html', controller: 'idiomaCtrl'});
    $routeProvider.otherwise({redirectTo: 'login'});
}]);

app.factory('usuarioService', ['$http', function($http) {
    var usuarioLogado = null;
    
    return {
        usuarioLogado : usuarioLogado,
        getUsuario : function(){
            return $http.get('/talentos/php/usuario.php');
        }
    };
}]);

app.controller('mainCtrl', ['$scope', '$location', 'usuarioService', function($scope, $location, usuarioService){
    $scope.go = function(to) {
        $location.path(to);
    };
    
    $scope.sair = function(){
        usuarioService.usuarioLogado = null;
        $location.path('/');
    };
    
    $scope.usuarioService = usuarioService;
}]);

app.directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});


app.directive('textOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^a-z A-Z]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});


app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue);
            });

            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\,+]/g, '');
                elem.val($filter('number')(plainNumber));
                return plainNumber;
            });
        }
    };
}]);

app.directive('loading', ['$http' ,function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v) {
                if(v){
                    elm.show();
                }else{
                    elm.hide();
                }
            });
        }
    };

}]);