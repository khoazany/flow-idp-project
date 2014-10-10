'use strict';

angular.module('idpApp')
.controller('HomeCtrl', function ($scope,$rootScope) {

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

  $scope.images = ['Quiz 1','Quiz 2','Quiz 3','Quiz 4'];

  $scope.loadMore = function() {
    var last = $scope.images[$scope.images.length - 1];
    for(var i = 1; i <= 8; i++) {
      $scope.images.push(last + i);
    }
  };

  $scope.showModal = false;

  $(document).ready(function() {

    $(".owl-carousel").each(function () {
      $(this).owlCarousel({
        items : 4,
        lazyLoad : true,
        navigation : true
      });
    });

    // Instance the tour
    var tour = new Tour({
      name: "newuser-tour",
      steps: [
      {
        element: "#popular-item-list",
        title: "Test 1",
        content: "Content of my step"
      },
      {
        element: "#current-studying-header",
        title: "Test 2",
        content: "Content of my step"
      }
      ],
      storage: false,
      backdrop: true
    });

// Initialize the tour
tour.init();

// Start the tour
//tour.start(); 

$('.progresslabel').each(function(){
    if($(this).width() > $(this).parent().width()){
     $(this).css("color","black");   
    }
});

});

});
