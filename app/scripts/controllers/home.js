'use strict';

angular.module('idpApp')
.controller('HomeCtrl', function ($scope,$rootScope,ModalService) {

  $scope.header = function() {
  	return "/views/header.html";
  };

  $scope.footer = function() {
    return "/views/footer.html";
  };

  $scope.images = ['Quiz 1','Quiz 2','Quiz 3','Quiz 4'];

  $(document).ready(function() {

    // Initiate Carousel
    $(".owl-carousel").each(function () {
      $(this).owlCarousel({
        items : 4,
        lazyLoad : true,
        navigation : true
      });
    });

    // Change text color in progress label
    $('.progresslabel').each(function(){
    if($(this).width() > $(this).parent().width()){
     $(this).css("color","black");   
    }
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

});

});
