app.controller('search', 
	['$scope', 
	'$http', 
	'$sce', 
	'$timeout', 
	'api', 
	function ($scope, $http, $sce, $timeout, api) {

	// Vars
	var getRepoUrl    = "https://api.github.com/search/repositories?q=",
		getRepoIssues = "https://api.github.com/repos/";


	// Scope vars
	$scope.showResults    = false;
	$scope.pushSearchLeft = false;
	$scope.showSingle     = false;
	$scope.loading        = false;
	$scope.delayInfo      = false;
	$scope.showIssues     = false;
	$scope.perPage        = 0;
	$scope.pageNumber     = 1;

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

	$scope.getRepositoryIssues = function(item, fullname) {

		// Increment the posts per page by 3 on every call
		$scope.perPage += 3;

		// Increment the page number by 1 once the API call reaches the max limit of 100 results per page
		if($scope.perPage > 100) {

			$scope.pageNumber += 1;
		};

		// API call to retreive issues
  		api.getData(getRepoIssues+fullname+"/issues?per_page="+$scope.perPage+"&page="+$scope.pageNumber).then(function(data) {

  			$scope.issues = data;
  		});
	};

	$scope.showSingleRepo = function(item, fullname, page) {

		// Remove all other items from repository array
		var index   = $scope.repositories.indexOf(item),
  		    spliced = $scope.repositories.splice(index, 1);  

  		$scope.repositories = spliced;

  		$scope.getRepositoryIssues(item, fullname, page);

  		$timeout(function() {

  			// Hide all results and show single repo view
			$scope.showSingle = true;
  		},500);

  		$timeout(function() {

  			// Fade in info with timeout
  			$scope.delayInfo = true;
  		}, 1000);
	};

}]);



