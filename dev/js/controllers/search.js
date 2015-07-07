app.controller('search', 
	['$scope', 
	'$http', 
	'$sce', 
	'$timeout', 
	'api', 
	function ($scope, $http, $sce, $timeout, api) {

	// Vars
	var getRepoUrl = "https://api.github.com/search/repositories?q=";

	// Scope vars
	$scope.showResults    = false;
	$scope.pushSearchLeft = false;
	$scope.showSingle     = false;
	$scope.loading        = false;
	$scope.expandHeader   = false;

	$scope.getRepos = function(val) {

		// Show loading message
		$scope.loading = true;

		// API call with value passed from input
		api.getData(getRepoUrl+val).then(function(data) {

			// Hide loading message
			$scope.loading = false;

			// Slide search area to the left & show results
			$scope.pushSearchLeft = true;
			$scope.showResults    = true;

			// Append data to scope
			$scope.repositories = data.items;

			console.log($scope.repositories);
		});
	};

	$scope.showSingleRepo = function(item) {

		// Hide all results and show single repo view
		$scope.showSingle = true;

		console.log(item);

		var index   = $scope.repositories.indexOf(item),
  		    spliced = $scope.repositories.splice(index, 1);  

  		$scope.repositories = spliced;

  		$timeout(function() {

  			$scope.expandHeader = true;
  		},500);
	};

}]);



