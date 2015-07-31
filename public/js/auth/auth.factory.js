/* 
Compute Dashboard
Copyright (c) 2015 FamiShukoor
Author: fshukoor@cisco.com    
*/
dashboardApp.factory('AuthenticationFactory', function($window) {
    var auth = {
        isLogged: false,
        check: function() {
            if ($window.sessionStorage.token && $window.sessionStorage.user) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
                delete this.user;
            }
        }
    }
    return auth;
});
dashboardApp.factory('UserAuthFactory', function($window, $location, $http, AuthenticationFactory) {
    return {
        login: function(username, password) {
            var locationport = location.port;
            if(locationport){
                var urlBase = 'http://'+window.location.hostname+':'+locationport+'/login';
            }else{
                var urlBase = 'https://'+window.location.hostname+'/login';  
            }
            return $http.post(urlBase, {
                username: username,
                password: password
            });
        },
        logout: function() {
        if (AuthenticationFactory.isLogged) {
            AuthenticationFactory.isLogged = false;
            delete AuthenticationFactory.user;
            delete AuthenticationFactory.userRole;
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.user;
            delete $window.sessionStorage.userRole;
            $location.path("/login");
        }
        }
    }
});
dashboardApp.factory('TokenInterceptor', function($q, $window) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['X-Access-Token'] = $window.sessionStorage.token;
                config.headers['X-Key'] = $window.sessionStorage.user;
                config.headers['Content-Type'] = "application/json";
            }
            return config || $q.when(config);
        },
        response: function(response) {
            return response || $q.when(response);
        }
    };
});