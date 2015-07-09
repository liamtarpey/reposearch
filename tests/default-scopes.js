
// Show single repo test
describe('defaultScopes', function() {

	beforeEach(module('reposearch'));

	var searchController,
		scope;

	beforeEach(inject(function ($rootScope, $controller) {

		scope = $rootScope.$new();

		searchController = $controller('search', {

			$scope: scope
		});
	}));

	it('default scope tests', function () {

		expect(scope.showResults).toBe(false);
		expect(scope.pushSearchLeft).toBe(false);
		expect(scope.showSingle).toBe(false);
		expect(scope.loading).toBe(false);
		expect(scope.delayInfo).toBe(false);
		expect(scope.showIssues).toBe(false);
		expect(scope.perPage).toEqual(0);
		expect(scope.pageNumber).toEqual(1);
		expect(scope.reposPerPage).toEqual(0);
		expect(scope.repoPageNum).toEqual(1);
		expect(scope.showMoreBtn).toBe(true);
	});
});