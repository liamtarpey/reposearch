var app = angular.module('reposearch', ['ngRoute','ngSanitize']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
 	
 	$routeProvider

        .when('/', {
        	templateUrl: '/ng-views/search.html',
        	controller : 'search'
        })

        
  	$locationProvider.html5Mode({
	  	enabled: true,
	  	requireBase: false
	});

}]);