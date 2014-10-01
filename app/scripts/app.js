'use strict';

angular.module('idpApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'fitVids',
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
