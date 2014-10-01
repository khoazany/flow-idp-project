'use strict';

angular.module('idpApp')
.controller('MainCtrl', function ($scope) {
  $scope.eduLevels = [
  'Secondary',
  'JC',
  'Polytechnique',
  'University',
  'Others'
  ];

  $scope.showModal = false;

});
