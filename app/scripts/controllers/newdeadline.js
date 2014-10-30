'use strict'

angular.module('idpApp')
.controller('NewDeadlineController', ['$scope', 'title', 'close', '$validator', '$rootScope', '$location',
	function($scope, title, close, $validator, $rootScope, $location) {

		$scope.topics = [];
		console.log($rootScope.studySubjects.length);
		for(var i = 0;i < $rootScope.studySubjects.length;i++) {
			for(var j = 0;j < $rootScope.studySubjects[i].topics.length;j++) {
				$scope.topics.push($rootScope.studySubjects[i].topics[j]);
			}
		}

		$scope.formWatch = {
			name: '',
			date: '',
			submit: function() {
				return $validator.validate($scope, 'formWatch').success(function() {
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
			$scope.formWatch.name = '';
			$scope.formWatch.date = '';
		}
	};

	$scope.title = title;

	$scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

}]);