'use strict';

angular.module('idpApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'fitVids',
  'infinite-scroll',
  'ngStorage',
  'angular-loading-bar',
  'angularModalService',
  'angularMoment',
  'validator',
  'validator.rules',
  'localytics.directives'
  ])
.constant('angularMomentConfig', {
})
.config(function ($routeProvider,$validatorProvider,cfpLoadingBarProvider) {
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
  .when('/quiz/:id', {
    templateUrl: 'views/quiz.html',
    controller: 'QuizCtrl'
  })
  .when('/subject/:id', {
    templateUrl: 'views/subject.html',
    controller: 'SubjectCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });

  /* Register a validator when submit request */
  $validatorProvider.register('requiredSubmit', {
    validator: /^.+$/,
    error: 'This field is required.'
  });

  /* Config loadingbar */
  cfpLoadingBarProvider.latencyThreshold = 20;
})

.run(function($rootScope,$sessionStorage,$location,ModalService,$validator) {
  // Storage variable
  $rootScope.$storage = $sessionStorage.$default({
    loggedInStatus : 0
  });

  /* Security */
  if($rootScope.$storage.loggedInStatus == 0 && $location.path() != '/' 
    && $location.path() != '/contact-us') {
    $location.path('/');    
}

$rootScope.$on('$locationChangeSuccess',function () {
 if($rootScope.$storage.loggedInStatus == 0 && $location.path() != '/'
  && $location.path() != '/contact-us') {
  $location.path('/');    
}
});

/* Data */
$rootScope.message = {
  status: '',
  content: ''
};
$rootScope.username = '';

$rootScope.eduLevels = [
'Secondary',
'JC',
'Polytechnique',
'University',
'Others'
];

$rootScope.modes = [
'OFF',
'ON'];

$rootScope.studyMode = false;

$rootScope.changeStudyMode = function () {
  $rootScope.studyMode = !$rootScope.studyMode; 
};

$rootScope.knowledgeTree = [
{'id' : 1,
'name' : 'Biology',
'eduLevel' : 'Secondary',
'description' : 'Biology Description',
'representingBox' : '<img src="http://placehold.it/60/8e44ad/FFF&text=B" alt="" class="" />',
'studying' : true,
'topics' : [
{'id' : 1,
'name' : 'Animals',
'description' : 'Description of Animals',
'status' : 0,
'total' : 10,
'completed': 5,
'subTopics' : []
},
{'id' : 2,
'name' : 'Reproduction',
'description' : 'Description of Reproduction',
'status' : 0,
'total' : 10,
'completed': 8,
'subTopics' : []
}
]},
{'id' : 2,
'name' : 'Chemistry',
'eduLevel' : 'Secondary',
'description' : 'Chemistry Description',
'representingBox' : '<span class="glyphicon glyphicon-tint glyphicon-lg"></span>',
'studying' : true,
'topics' : []},
{'id' : 3,
'name' : 'Math',
'eduLevel' : 'JC',
'description' : 'Math Description',
'representingBox' : '<span class="glyphicon glyphicon-plus-sign glyphicon-lg"></span>',
'studying' : true,
'topics' : []}
];

$rootScope.topics = [
{'id' : 1,
'name' : 'Animals',
'description' : 'Description of Animals',
'status' : 0,
'total' : 10,
'completed': 5,
'subTopics' : []
},
{'id' : 2,
'name' : 'Reproduction',
'description' : 'Description of Reproduction',
'status' : 0,
'total' : 10,
'completed': 8,
'subTopics' : []
}
];

$rootScope.quizzes = [
  {
    'id' : 0,
    'type' : 'diagnostic',
    'title' : 'Diagnostic Quiz',
    'questions' : [
      {
        'question' : 'Question 1',
        'number': '1',
        'answers' : [
          'Choice 1',
          'Choice 2',
          'Choice 3',
          'Choice 4'
        ]
      },
      {
        'question' : 'Question 2',
        'number': '2',
        'answers' : [
          'Choice 1',
          'Choice 2',
          'Choice 3',
          'Choice 4'
        ]
      }
    ]
  }, 
  {
    'id' : 1,
    'type' : 'normal',
    'title' : 'Quiz Title',
    'questions' : [
      {
        'question' : 'Question 1',
        'number': '1',
        'answers' : [
          'Choice 1',
          'Choice 2',
          'Choice 3',
          'Choice 4'
        ]
      },
      {
        'question' : 'Question 2',
        'number': '2',
        'answers' : [
          'Choice 1',
          'Choice 2',
          'Choice 3',
          'Choice 4'
        ]
      }
    ]
  }
];

$rootScope.studySubjects = [];

/* List of deadlines */
$rootScope.deadlines = [];
$rootScope.deadline = {
  'name' : null,
  'date' : null,
  'topics' : []
};

// Convert date string to day and month for displaying purpose
$rootScope.day = function (date) {
  return moment(date).format('DD');
};
$rootScope.month = function (date) {
  return moment(date).format('MMM');
};

  // LogIn - LogOut functionality

  $rootScope.flowIn = function() {
    $sessionStorage.loggedInStatus = 1;
    $location.path('/home');
  }

  $rootScope.flowOut = function() {
    $sessionStorage.loggedInStatus = 0;
    $location.path('/index');
  }

  $rootScope.showAModal = function() {

    // Just provide a template url, a controller and call 'showModal'.
    ModalService.showModal({
      templateUrl: "views/newdeadline.html",
      controller: "NewDeadlineController",
      inputs: {
        title: "Add New Deadline"
      }
    }).then(function(modal) {
      // The modal object has the element built, if this is a bootstrap modal
      // you can call 'modal' to show it, if it's a custom modal just show or hide
      // it as you need to.

      modal.element.modal();
      modal.close.then(function(result) {
        $rootScope.message = (result == 'Yes') ? 
        {
          status: "success", 
          content: "New deadline added!", 
          time: new Date()
        } : {
          status: "warning", 
          content: "You have cancel the request",
          time: new Date()
        };
      });
    });

  };

  $rootScope.resetMessage = function () {
    var time = $rootScope.message.time;
    $rootScope.message = {
      status: '',
      content: '',
      time: time
    };
  };

  return $validator.register('requiredRun', {
    invoke: 'watch',
    validator: /^.+$/,
    error: 'This field is requrired.'
  });
});
