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
  'localytics.directives',
  'pdf',
  'angular.directives-round-progress'
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
  .when('/subject/:id/quizzes', {
    templateUrl: 'views/quizlist.html',
    controller: 'SubjectCtrl'
  })
  .when('/subtopic/:id', {
    templateUrl: 'views/subtopic.html',
    controller: 'SubtopicCtrl'
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
{'id' : 0,
'name' : 'Biology',
'eduLevel' : 'Secondary',
'description' : 'Biology Description',
'representingBox' : '<img src="http://placehold.it/60/8e44ad/FFF&text=B" alt="" class="" />',
'studying' : true,
'topics' : [
{'id' : 0,
'name' : 'Cell Structure',
'description' : 'Cell Structure Description',
'status' : 0,
'total' : 10,
'completed': 5,
'subTopics' : [
{'id' : 0,
'quiz' : {
  'id' : 0
}
},
{'id' : 1,
'quiz' : {
  'id' : 0
}
}
]
},
{'id' : 1,
'name' : 'Plasma Membrane',
'description' : 'Plasma Membrane Description',
'status' : 0,
'total' : 10,
'completed': 8,
'subTopics' : [
{'id' : 2,
'quiz' : {
  'id' : 0
}
},
{'id' : 3,
'quiz' : {
  'id' : 0
}
}
]
}
]},
{'id' : 1,
'name' : 'Chemistry',
'eduLevel' : 'Secondary',
'description' : 'Chemistry Description',
'representingBox' : '<span class="glyphicon glyphicon-tint glyphicon-lg"></span>',
'studying' : true,
'topics' : [
{'id' : 2,
'name' : 'Atom',
'description' : 'Atom Description',
'status' : 0,
'total' : 10,
'completed': 5,
'subTopics' : [
{'id' : 4,
'quiz' : {
  'id' : 0
}
},
{'id' : 5,
'quiz' : {
  'id' : 0
}
}
]
},
{'id' : 3,
'name' : 'Acid and Bases',
'description' : 'Acid and Bases Description',
'status' : 0,
'total' : 10,
'completed': 8,
'subTopics' : [
{'id' : 6,
'quiz' : {
  'id' : 0
}
},
{'id' : 7,
'quiz' : {
  'id' : 0
}
}
]
}
]},
{'id' : 2,
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
  'subject' : {
    'name' : 'ADD NEW DEADLINE',
    'id' : ''
  },
  'subTopic' : {
    'id' : ''
  },
  'questions' : [
  {
    'question' : 'Question 1',
    'number': '1',
    'answers' : [
    'Choice 1',
    'Choice 2',
    'Choice 3',
    'Choice 4'
    ],
    'selected' : ''
  },
  {
    'question' : 'Question 2',
    'number': '2',
    'answers' : [
    'Choice 1',
    'Choice 2',
    'Choice 3',
    'Choice 4'
    ],
    'selected' : ''
  }
  ]
}, 
{
  'id' : 1,
  'type' : 'normal',
  'title' : 'Eukaryotic Quiz',
  'subject' : {
    'id' : '0'
  },
  'subTopic' : {
    'id' : '0'
  },
  'saved' : false,
  'submitted' : false,
  'score' : 0,
  'questions' : [
  {
    'question' : 'Which of the following is found both in eukaryotic and prokaryotic cells?',
    'number': '1',
    'answers' : [
    'nucleus',
    'ribosomes',
    'vacuoles',
    'mitochondrion'
    ],
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 0
    }
  },
  {
    'question' : 'Eukaryotic cells contain the following:',
    'number': '2',
    'answers' : [
    'All of these answers',
    'Circular chromosomal structures within a membrane-bound nucleus',
    'Structures that specialize in energy production',
    'A nucleus that is not surrounded by a membrane'
    ],
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 0
    }
  },
  {
    'question' : 'If the nucleolus were not able to carry out its function, which nucleus-synthesized organelles would be affected?',
    'number': '3',
    'answers' : [
    'Ribosomes',
    'Chromosomes',
    'DNA',
    'Proteins'
    ],
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 0
    }
  }
  ]
}
];

$rootScope.subTopicList = [
{'id' : 0,
'name' : 'Prokaryotic Cells',
'pdfLink' : '/slides/bio1.pdf',
'subject' : {
  'id': 0
},
'quiz' : {
  'id' : 1
}
},
{'id' : 1,
'name' : 'Eukaryotic Cells',
'pdfLink' : '/slides/bio2.pdf',
'subject' : {
  'id': 0
},
'quiz' : {
  'id' : 1
}
},
{'id' : 2,
'name' : 'Active Transport',
'pdfLink' : '/slides/bio3.pdf',
'subject' : {
  'id': 0
},
'quiz' : {
  'id' : 1
}
},
{'id' : 3,
'name' : 'Fluid Mosaic Model',
'pdfLink' : '/slides/bio4.pdf',
'subject' : {
  'id': 0
},
'quiz' : {
  'id' : 1
}
},
{'id' : 4,
'name' : 'History of Atomic Structure',
'pdfLink' : '/slides/chem1.pdf',
'subject' : {
  'id': 1
},
'quiz' : {
  'id' : 1
}
},
{'id' : 5,
'name' : 'The Structure of The Atom',
'pdfLink' : '/slides/chem2.pdf',
'subject' : {
  'id': 1
},
'quiz' : {
  'id' : 1
}
},
{'id' : 6,
'name' : 'Strength of Acids',
'pdfLink' : '/slides/chem3.pdf',
'subject' : {
  'id': 1
},
'quiz' : {
  'id' : 1
}
},
{'id' : 7,
'name' : 'The pH Scale',
'pdfLink' : '/slides/chem4.pdf',
'subject' : {
  'id': 1
},
'quiz' : {
  'id' : 1
}
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

  $(document).ready(function() {
    /* Toggle Tree  when clicked */
    $(document).on('click','label.tree-toggler', function () {
      $(this).parent().children('ul.tree').toggle(300);
    });
  });

  return $validator.register('requiredRun', {
    invoke: 'watch',
    validator: /^.+$/,
    error: 'This field is requrired.'
  });
});
