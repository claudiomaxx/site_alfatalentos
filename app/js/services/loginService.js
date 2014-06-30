'use strict';

app.factory('loginService', ['$http', function($http){

    return {
        login: function(usuario){
            return $http.post('/talentos/php/login.php', usuario);
        }
    };
}]);