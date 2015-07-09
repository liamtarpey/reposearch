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
	$scope.reposPerPage   = 0;
	$scope.repoPageNum    = 1;
	$scope.showMoreBtn    = true;
	$scope.showInifinite  = false;

	$scope.getRepos = function(val) {

		// Show loading 
		$scope.loading = true;

		// Remove expand if true
		$scope.showSingle = false;

		// Reset scopes
		$scope.perPage      = 0;
		$scope.pageNumber   = 1;
		$scope.showMoreBtn  = true;
		$scope.showInfinite = false;

		// Increment the page number by 1 once the API call reaches the max limit of 100 results per page
		if($scope.reposPerPage > 100) {

			$scope.repoPageNum += 1;
		} else { // Increment the posts per page by 30 on every call

			$scope.reposPerPage += 30;
		};

		// API call with value passed from input
		api.getData(getRepoUrl+val+"&per_page="+$scope.reposPerPage+"&page="+$scope.repoPageNum).then(function(data) {

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

			if($scope.repositories.length >= 30) {

				$scope.showInfinite = true;
			};
		});
	};

	$scope.getRepositoryIssues = function(item, fullname) {

		// Show loading 
		$scope.loading = true;

		// Reset scopes
		$scope.reposPerPage = 0;
		$scope.repoPageNum  = 1;
		$scope.showMoreBtn  = true;
	
		// Increment the page number by 1 once the API call reaches the max limit of 100 results per page
		if($scope.perPage > 100) {

			$scope.pageNumber += 1;
		} else { // Increment the posts per page by 10 on every call

			$scope.perPage += 10;
		};

		// API call to retreive issues
  		api.getData(getRepoIssues+fullname+"/issues?per_page="+$scope.perPage+"&page="+$scope.pageNumber).then(function(data) {

  			$scope.issues = data;

  			// Show loading 
			$scope.loading = false;

  			// Hide load more button if no more issues to load
  			if($scope.perPage > $scope.issues.length) {

				$scope.showMoreBtn = false;
			};
  		});
	};

	$scope.showSingleRepo = function(item, fullname, page) {

		// Show loading 
		$scope.loading = true;

		// Remove all other items from repository array
		var index   = $scope.repositories.indexOf(item),
  		    spliced = $scope.repositories.splice(index, 1);  

  		$scope.repositories = spliced;

  		// Reset scopes
  		$scope.reposPerPage = 0;
  		$scope.showInfinite = false;

  		// Rerun get repo function for selected repository
  		$scope.getRepositoryIssues(item, fullname, page);

  		// Hide all results and show single repo view
  		$timeout(function() {
  			
			$scope.showSingle = true;
  		},500);

  		// Fade in info with timeout
  		$timeout(function() {
  			
  			$scope.delayInfo = true;
  		}, 1000);
	};

}]);



