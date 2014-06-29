'use strict';

app.factory('loginService', ['$http', function($http){

    return {
        login: function(usuario){
            return $http.post('/site_alfatalentos/php/login.php', usuario);
        }
    };
}]);