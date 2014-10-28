'use strict';

angular.module('idpApp')
.controller('QuizCtrl', function ($scope,$rootScope,$routeParams,$location) {

  $scope.id = $routeParams.id;

  $scope.quiz = $rootScope.quizzes[$routeParams.id];

  $scope.subTopic = '';

  if($scope.quiz.type == 'normal') {
    $scope.subTopic = $rootScope.subTopicList[$scope.quiz.subTopic.id];
  }

  $scope.subject = $rootScope.knowledgeTree[$scope.quiz.subject.id];

  $scope.$watch('quiz', function () {
    $rootScope.quizzes[$routeParams.id];
  });

  $scope.header = function() {
  	return "/views/header.html";
  };

  $scope.footer = function() {
    return "/views/footer.html";
  };

  $scope.goBack = function () {
    if($scope.quiz.type == 'normal') {
      return '#/subject/' + $scope.subject.id;
    } else {
      return '#/home';
    }
  };

  $scope.numberOfSubTopics = function () {
    var count = 0;
    for (var i = 0;i < $scope.subject.topics.length;i++) {
      for (var j = 0;j < $scope.subject.topics[i].subTopics.length;j++) {
        count = count + 1;
      }
    }
    console.log(count);
    return count;
  };

  $scope.getSubTopic = function (id) {
    return $rootScope.subTopicList[id].name;
  };

  $scope.submitQuiz = function () {
    $scope.quiz.submitted = true;
    $scope.quiz.score = 10;

    /* Reset data for the particular quiz */
    $scope.quiz.saved = false;
    for(var i = 0;i < $scope.quiz.questions.length;i++) {
      $scope.quiz.questions[i].saved = false;
      $scope.quiz.questions[i].hinted = false;
      $scope.quiz.questions[i].selected = '';
    }
    $location.path('/subject/' + $scope.subject.id + '/quizzes');
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
