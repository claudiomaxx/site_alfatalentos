'use strict';

app.factory('loginService', ['$http', '$q', function($http, $q){

    return {
        login: function(usuario){
            return $http.post('/site_alfatalentos/php/login.php', usuario);
        }
    };
}]);