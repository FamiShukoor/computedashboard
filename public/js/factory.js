myApp.factory('dataFactory', function($http) {
/** https://docs.angularjs.org/guide/providers **/
var urlBase = 'http://localhost:8001/ciscodashboard/instances';
var _instFactory = {};
_instFactory.getInstances = function() {
return $http.get(urlBase);
}; 
return _instFactory;
});