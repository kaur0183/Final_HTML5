angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('ChatsCtrl', function ($scope, $http) {
	$scope.data = [];
	$http({
		method: "GET",
		url: "https://www.goodreads.com/event/index.xml?search%5Bcountry_code%5D=CA&key=JnRjJQO6Ifgq8MfifyXZHQ"
	}).then(function (response) {
		console.log(response);
		$scope.data = response.data.GoodreadsResponse.events.event;
	}, function (err) {
		console.log(err);
	})
})

.controller('ChatDetailCtrl', function ($scope, $http, $stateParams) {
	$scope.bookID = $stateParams.bookID;
	$http({
		method: "GET",
		url: "https://www.goodreads.com/book/show/" + $scope.bookID + ".xml?key=JnRjJQO6Ifgq8MfifyXZHQ"
			//url: "http://localhost:8100/search/index.xml?key=JnRjJQO6Ifgq8MfifyXZHQ" + "&q=" + $scope.value
	}).then(function (response) {
		$scope.book = response.data.GoodreadsResponse.book;
		console.log($scope.book);
	}, function (err) {
		console.log(err);
	})

})

.controller('AccountCtrl', function ($scope, $http, $ionicLoading) {
	$scope.search = function () {
		$scope.value = document.getElementById("books").value;
		$ionicLoading.show();
		$http({
			method: "GET",
			url: "http://www.goodreads.com/search/index.xml?key=JnRjJQO6Ifgq8MfifyXZHQ" + "&q=" + $scope.value
				//url: "http://localhost:8100/search/index.xml?key=JnRjJQO6Ifgq8MfifyXZHQ" + "&q=" + $scope.value

		}).then(function (response) {
			console.log(response);
			console.log(response.data);
			console.log($scope.value);
			$scope.data = response.data.GoodreadsResponse.search.results.work;
			console.log($scope.data);
			$ionicLoading.hide();
		}, function (err) {
			console.log(err);
		}).finally(function () {
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
		});
	}

});