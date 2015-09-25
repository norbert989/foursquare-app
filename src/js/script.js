(function(angular) {
	'use strict';
	angular.module('httpExample', [])
		.controller('FetchController', ['$scope', '$http', '$templateCache',
			function($scope, $http, $templateCache) {
				$scope.method = 'GET';

				$scope.fetch = function() {
					$scope.searchUrl = 'https://api.foursquare.com/v2/venues/explore?client_id=MXTT00M3AK5GRDZSSDKJN1TDWHBMS3CUAWSVA03YTTKLRB4M&client_secret=JMN2VC3HHOVPJDOTPCNYQGNB23SSHNNW0ENRPS4AJ4PWWWR4&v=20130815&limit=15&near='+$scope.place;
					$scope.response = null;

					if ($scope.place){
						$http({method: $scope.method, url: $scope.searchUrl, cache: $templateCache}).
							then(function(response) {
								$scope.status = response.status;
								$scope.data = response.data;
								$scope.items = $scope.data.response.groups[0].items;
								console.log($scope.items);
							}, function(response) {
								$scope.data = response.data || "Request failed";
								$scope.status = response.status;
							});
					}
				};
			}]);
})(window.angular);