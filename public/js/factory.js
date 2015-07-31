myApp.factory('dataFactory', function($http) {
    var urlBase = 'https://'+window.location.hostname+'/computedashboard/instances';
    var _instFactory = {};
    _instFactory.getInstances = function() {
        return $http.get(urlBase);
    }; 
    return _instFactory;
});