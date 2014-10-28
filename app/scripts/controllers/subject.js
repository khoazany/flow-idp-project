'use strict';

angular.module('idpApp')
.controller('SubjectCtrl', function ($scope,$rootScope,$routeParams) {
  $scope.id = $routeParams.id;

  $scope.subject = $rootScope.knowledgeTree[$routeParams.id];

  $scope.header = function() {
  	return "/views/header.html";
  };

  $scope.footer = function() {
    return "/views/footer.html";
  };

  $scope.numberOfSubTopics = function () {
    var count = 0;
    for (var i = 0;i < $scope.subject.topics.length;i++) {
      for (var j = 0;j < $scope.subject.topics[i].subTopics.length;j++) {
        count = count + 1;
      }
    }
    return count;
  };

  $scope.numberOfQuizzes = function () {
    var count = 0;
    for (var i = 0;i < $scope.subject.topics.length;i++) {
      for (var j = 0;j < $scope.subject.topics[i].subTopics.length;j++) {
        if($scope.subject.topics[i].subTopics[j].quiz.id !== '') {
          count = count + 1;
        }
      }
    }
    return count;
  };

  $scope.getQuizBySubTopicId = function (id) {
    return $rootScope.quizzes[$rootScope.subTopicList[id].quiz.id];
  };

  $scope.test = {
      label: 20,
      percentage: 20
  }

  $scope.$watch('test', function (newValue) {
          newValue.percentage = newValue.label / 100;
        }, true);

  $scope.getSubTopicBySubTopicId = function (id) {
    return $rootScope.subTopicList[id];
  };

  $(document).ready(function() {

    if ($('.progress-outer').height() > $('.progress-outer').width()) {
    $('.progress').css("width", "50%");
    $('.progress').css("height", $('.progress').width() + "px");
    $('.progress').css("font-size", ($('.progress').width() / 5) + "px");
    $('.progress').css("line-height", ($('.progress').width() / 100 * 90) + "px");
  } else {
    $('.progress').css("height", "50%");
    $('.progress').css("width", $('.progress').height() + "px");
    $('.progress').css("font-size", ($('.progress').height() / 5) + "px");
    $('.progress').css("line-height", ($('.progress').height() / 100 * 90) + "px");
  }
  $(window).resize(function() {
    if ($(window).height() > $(window).width()) {
      $('.progress').css("width", "50%");
      $('.progress').css("height", $('.progress').width() + "px");
      $('.progress').css("font-size", ($('.progress').width() / 5) + "px");
      $('.progress').css("line-height", ($('.progress').width() / 100 * 90) + "px");
    } else {
      $('.progress').css("height", "50%");
      $('.progress').css("width", $('.progress').height() + "px");
      $('.progress').css("font-size", ($('.progress').height() / 5) + "px");
      $('.progress').css("line-height", ($('.progress').height() / 100 * 90) + "px");
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
