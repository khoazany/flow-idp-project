'use strict';

angular.module('idpApp')
.controller('SubtopicCtrl', function ($scope,$rootScope,$routeParams) {

  $scope.subTopic = $rootScope.subTopicList[$routeParams.id];

  $scope.subject = $rootScope.knowledgeTree[$scope.subTopic.subject.id];

  $scope.$watch('subTopic', function () {
    $rootScope.subTopicList[$routeParams.id];
  });

  $scope.header = function() {
  	return "/views/header.html";
  };

  $scope.footer = function() {
    return "/views/footer.html";
  };

  $scope.pdfUrl = $scope.subTopic.pdfLink;

  $scope.numberOfSubTopics = function () {
    var count = 0;
    for (var i = 0;i < $scope.subject.topics.length;i++) {
      for (var j = 0;j < $scope.subject.topics[i].subTopics.length;j++) {
        count = count + 1;
      }
    }
    console.log(count);
    return count;
  }

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
