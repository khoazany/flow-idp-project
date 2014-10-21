'use strict'

angular.module('idpApp')
.controller('NewDeadlineController', ['$scope', 'title', 'close', '$validator', '$rootScope', '$location',
  function($scope, title, close, $validator, $rootScope, $location) {

	$scope.formWatch = {
		name: '',
		date: '',
		submit: function() {
			return $validator.validate($scope, 'formWatch').success(function() {
				console.log($scope.formWatch.name);
				$rootScope.deadline.name = $scope.formWatch.name;
				$rootScope.deadline.date = $scope.formWatch.date; 
				$rootScope.deadlines.push($rootScope.deadline);
          		$rootScope.deadline = {
            	'name' : null,
            	'date' : null,
            	'topics' : []
          	};
          		/* Manually remove the backdrop */
          		angular.element('body').removeClass('modal-open');
				angular.element('.modal-backdrop').remove();
				close("", 500); // close, but give 500ms for bootstrap to animate

				/* Go to diagnostic quiz page */
				$location.path('/quiz/0');
				return console.log('success');
			}).error(function() {
				return console.log('error');
			});
		},
		reset: function() {
			return $validator.reset($scope, 'formWatch');
		}
	};

	$scope.title = title;

	$scope.close = function(result) {
		console.log("Huhu");
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

}]);