myApp.factory('dataFactory', function($http) {
    var urlBase = 'http://'+window.location.hostname+':'+window.location.port+'/ciscodashboard/instances';
    var _instFactory = {};
    _instFactory.getInstances = function() {
        return $http.get(urlBase);
    }; 
    return _instFactory;
});