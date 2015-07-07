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
	$scope.delayInfo      = false;

	$scope.getRepos = function(val) {

		// Show loading message
		$scope.loading = true;

		// Remove expand if true
		$scope.showSingle   = false;

		// API call with value passed from input
		api.getData(getRepoUrl+val).then(function(data) {

			// Hide loading message
			$scope.loading = false;

			// Slide search area to the left
			$scope.pushSearchLeft = true;

			// Append data to scope
			$scope.repositories = data.items;

			// If results > 0, show list items
			if(!$scope.repositories.length == 0) {

				$scope.showResults = true;
			}

			console.log($scope.repositories);
		});
	};

	$scope.showSingleRepo = function(item) {

		var index   = $scope.repositories.indexOf(item),
  		    spliced = $scope.repositories.splice(index, 1);  

  		$scope.repositories = spliced;

  		$timeout(function() {

  			// Hide all results and show single repo view
			$scope.showSingle = true;
  		},500);

  		$timeout(function() {

  			$scope.delayInfo = true;
  		}, 1000);
	};

}]);



