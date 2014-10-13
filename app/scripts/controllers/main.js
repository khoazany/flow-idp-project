'use strict';

angular.module('idpApp')
.controller('MainCtrl', function ($scope,$rootScope,$location) {
  if($rootScope.$storage.loggedInStatus == 1 && $location.path != '/home') {
    $location.path('/home');    
  }

  $scope.header = function() {
  	return "/views/header.html";
  };

  $scope.footer = function() {
    return "/views/footer.html";
  };

});
