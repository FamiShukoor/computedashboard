myApp.factory('dataFactory', function($http) {
    
    var locationport = location.port;
    if(locationport){
        var urlBase = 'http://'+window.location.hostname+':'+locationport+'/computedashboard/instances';
    }else{
        var urlBase = 'https://'+window.location.hostname+'/computedashboard/instances';  
    }
    
    var _instFactory = {};
    _instFactory.getInstances = function() {
        return $http.get(urlBase);
    }; 
    return _instFactory;
});