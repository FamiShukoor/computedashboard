myApp.controller("HeaderCtrl", ['$scope', '$location', 'UserAuthFactory',
function($scope, $location, UserAuthFactory) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }
    $scope.logout = function () {
        UserAuthFactory.logout();
    }
}
]);
/// snipp
myApp.controller("InstanceListCtrl", ['$scope', 'dataFactory',
function($scope, dataFactory) {
    $scope.instances = [];
    // Access the factory and get the latest products list
    dataFactory.getInstances().then(function(data) {
    $scope.instances = data.data;
    });
}
]);