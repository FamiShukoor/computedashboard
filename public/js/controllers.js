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
myApp.controller("InstanceListCtrl", ['$scope', 'dataFactory','ngTableParams','$filter',
function($scope, dataFactory,ngTableParams,$filter) {
   $scope.instances = [];
    // Access the factory and get the latest products list
    dataFactory.getInstances().then(function(data) {
        $scope.instances = data.data;
        $scope.tableParams.reload();
    });
    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 2,           // count per page
        sorting: {
            instanceID: 'asc'     // initial sorting
        }
    }, {
        total: $scope.instances.length, // length of data
        counts: [],
        getData: function ($defer, params) {
            console.log($scope.instances.length);
            params.total($scope.instances.length); // set total for recalc pagination
            
            $scope.instances = params.sorting() ? $filter('orderBy')($scope.instances, params.orderBy()) : $scope.instances;

            $defer.resolve($scope.instances.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    })
}
]);