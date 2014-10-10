'use strict';

angular.module('idpApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'fitVids',
  'infinite-scroll',
  'ngStorage'
  ])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  })
  .when('/contact-us', {
    templateUrl: 'views/contact.html',
    controller: 'ContactCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
})
.run(function($rootScope) {
  $rootScope.username = '';
  $rootScope.loggedInStatus = 0;

  $rootScope.eduLevels = [
  'Secondary',
  'JC',
  'Polytechnique',
  'University',
  'Others'
  ];

  $rootScope.modes = [
  'Public Mode',
  'Private Mode'];
})
.directive('akModal', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.$watch(attrs.akModal, function(value) {
                if (value) element.modal('show');
                else element.modal('hide');
            });
        }
    };
});;
