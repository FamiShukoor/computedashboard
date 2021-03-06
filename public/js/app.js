/* 
Compute Dashboard
Copyright (c) 2015 FamiShukoor
Author: fshukoor@cisco.com    
*/
var dashboardApp = angular.module('computedashboard', ['ngRoute','ngTable']);
dashboardApp.config(function($routeProvider, $httpProvider) {//routing to each view
    $httpProvider.interceptors.push('TokenInterceptor');
    $routeProvider
    .when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl',
    access: {
    requiredLogin: false
    }
    }).when('/', {
    templateUrl: 'partials/home.html',
    access: {
    requiredLogin: true
    }
    }).otherwise({
    redirectTo: '/login'
    });
});
dashboardApp.run(function($rootScope, $window, $location, AuthenticationFactory) {
    // when the page refreshes, check if the user is already logged in
    AuthenticationFactory.check();
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
    $location.path("/login");
    } else {
    // check if user object exists else fetch it. This is incase of a page refresh
    if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
    if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
    }
    });
    $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    $rootScope.role = AuthenticationFactory.userRole;
    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
    $location.path('/');
    }
    });
});