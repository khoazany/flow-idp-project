'use strict';

angular.module('idpApp')
.controller('ContactCtrl', function ($scope,$rootScope) {

  $scope.loggedIn = function() {
    return $rootScope.loggedInStatus;
  }

  $scope.flowIn = function() {
    $rootScope.loggedInStatus = 1;
    window.location.href = '/#/home';
  }

  $scope.flowOut = function() {
    $rootScope.loggedInStatus = 0;
    window.location.href = '/';
  }

  $scope.header = function() {
  	return "/views/header.html";
  };

  $scope.footer = function() {
    return "/views/footer.html";
  };

});
