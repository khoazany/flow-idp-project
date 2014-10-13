'use strict'

angular.module('idpApp')
.controller('NewDeadlineController', ['$scope', 'title', 'close', function($scope, title, close) {

	// Initiate Angular Validator
	$scope.formSubmit = {
		required: '',
		regexp: '',
		http: ''
	};

	// the submit function
	$scope.submit = function () {
		$validator.validate($scope, 'formSubmit')
		.success(function () {
        // validated success
        console.log('success');
    })
		.error(function () {
        // validated error
        console.log('error');
    });
	};

	$scope.title = title;

	$scope.close = function(result) {
		console.log("Huhu");
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

}]);