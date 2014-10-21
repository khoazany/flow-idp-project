'use strict';

angular.module('idpApp')
.controller('SubjectCtrl', function ($scope,$rootScope,$routeParams) {
  console.log($routeParams.id);

  $scope.header = function() {
  	return "/views/header.html";
  };

  $scope.footer = function() {
    return "/views/footer.html";
  };

  $(document).ready(function() {

    $(".owl-carousel").each(function () {
      $(this).owlCarousel({
        items : 4,
        lazyLoad : true,
        navigation : true
      });
    });

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
