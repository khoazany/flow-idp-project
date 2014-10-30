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
  'ui.bootstrap',
  'countTo',
  'slick'
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
  'id' : 1
}
},
{'id' : 1,
'quiz' : {
  'id' : 2
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
  'id' : 3
}
},
{'id' : 3,
'quiz' : {
  'id' : 4
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
  'id' : 5
}
},
{'id' : 5,
'quiz' : {
  'id' : 6
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
  'id' : 7
}
},
{'id' : 7,
'quiz' : {
  'id' : 8
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
  ]
},

{
  'id' : 1,
  'type' : 'normal',
  'title' : 'Prokaryotic Quiz',
  'subject' : {
    'id' : '0'
  },
  'subTopic' : {
    'id' : '1'
  },
  'saved' : false,
  'submitted' : 'Not yet done','recommended' : 0,
  'score' : 0,
  'questions' : [
  {
    'question' : 'What makes an organism a prokaryote?',
    'number': '1',
    'answers' : [
    'It\'s cellular components are found within cytoplasm',
    'They have plasma membranes to protect them from their surrounding environment',
    'They contain DNA and ribosomes within the cell',
    'Prokaryotes lack a membrane-bound nucleus and membranous organelles'
    ],
    'correctAns' : 3,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 1
    }
  },
  {
    'question' : 'Which of the following is NOT a characteristic of prokaryotes?',
    'number': '2',
    'answers' : [
    'Cell membrane',
    'DNA',
    'Endoplasmic reticulum',
    'Cell wall'
    ],
    'correctAns' : 0,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 1
    }
  },
  {
    'question' : 'Another common bacterial shape is that of a rod, often called',
    'number': '3',
    'answers' : [
    'Coccus',
    'Bacillus',
    'Pleomorphi'
    ],
    'correctAns' : 1,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 1
    }
  },
  {
    'question' : 'In bacterial cells, ribosomes are packed into the cytoplasmic matrix and also loosely attached to the plasma membrane. What is the function of ribosomes?',
    'number': '4',
    'answers' : [
    'Site of energy production',
    'Site of protein synthesis',
    'Site of genetic reproduction'
    ],
    'correctAns' : 1,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 1
    }
  }
  ]
},

{
  'id' : 2,
  'type' : 'normal',
  'title' : 'Eukaryotic Quiz',
  'subject' : {
    'id' : '0'
  },
  'subTopic' : {
    'id' : '0'
  },
  'saved' : false,
  'submitted' : 'Not yet done','recommended' : 0,
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
    'correctAns' : 1,
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
    'correctAns' : 2,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 0
    }
  },
  {
    'question' : 'Which of the following are correct regarding diffusion through the lipid bilayer that makes up the plasma membrane?',
    'number': '3',
    'answers' : [
    'Polar molecules are repelled by the non-polar lipids that line the inside of the bilayer.',
    'Large particles cannot fit in between the individual phospholipids that are packed together',
    'Only materials that are relatively small and non-polar can go through easily',
    'All of these answers are correct'
    ],
    'correctAns' : 3,
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
    'number': '4',
    'answers' : [
    'Ribosomes',
    'Chromosomes',
    'DNA',
    'Proteins'
    ],
    'correctAns' : 2,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 0
    }
  }
  ]
},

{
  'id' : 3,
  'type' : 'normal',
  'title' : 'Active Transport Quiz',
  'subject' : {
    'id' : '0'
  },
  'subTopic' : {
    'id' : '3'
  },
  'saved' : false,
  'submitted' : 'Not yet done','recommended' : 0,
  'score' : 0,
  'questions' : [
  {
    'question' : 'How does active transport move substances against the electrochemical gradient?',
    'number': '1',
    'answers' : [
    'Sodium and potassium help push substances across membranes',
    'ATP causes red blood cells to break down membranes.',
    'All of these answers',
    'With the help of ATP, pumps move substances across membranes'
    ],
    'correctAns' : 3,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 3
    }
  },
  {
    'question' : 'Which of the following describes the mechanism of the sodium-potassium pump?',
    'number': '2',
    'answers' : [
    'After ATP is hydrolyzed, the phosphate group attaches to the enzyme before the sodium ions',
    'The process begins when potassium attaches to the enzyme, which then hydrolyzes ATP',
    'Sodium and potassium ions bind to the enzyme at the same time, and then sodium is released',
    'Potassium cannot attach to the enzyme until the sodium ions detach from the enzyme'
    ],
    'correctAns' : 3,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 3
    }
  },
  {
    'question' : 'Which of the following applies to secondary active transport and not primary active transport?',
    'number': '3',
    'answers' : [
    'It always involves moving a molecule into the cell',
    'It does not directly require energy from ATP',
    'It utilizes only antiporter proteins',
    'It only involves moving a molecule up its concentration gradient'
    ],
    'correctAns' : 1,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 3
    }
  }
  ]
},

{
  'id' : 4,
  'type' : 'normal',
  'title' : 'Membrane Fluidity Quiz',
  'subject' : {
    'id' : '0'
  },
  'subTopic' : {
    'id' : '2'
  },
  'saved' : false,
  'submitted' : 'Not yet done','recommended' : 0,
  'score' : 0,
  'questions' : [
  {
    'question' : 'Which of the following attributes most accurately describes plasma membranes?',
    'number': '1',
    'answers' : [
    'Made exclusively from lipids',
    'Are the same in all cells',
    'Inhibit integral protein attachment',
    'Provide very flexible cell borders'
    ],
    'correctAns' : 3,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 2
    }
  },
  {
    'question' : 'Which of the following statements best describes the lipid bilayer plasma membrane?',
    'number': '2',
    'answers' : [
    'The interior and exterior surfaces of the membrane are hydrophobic and the middle is hydrophilic',
    'The interior surface and the middle of the membrane are hydrophobic and the exterior is hydrophilic',
    'The exterior surface and the middle of the membrane are hydrophobic and the interior is hydrophilic',
    'The interior and exterior surfaces of the membrane are hydrophilic and the middle is hydrophobic'
    ],
    'correctAns' : 0,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 2
    }
  },
  {
    'question' : 'What does the term \'mosaic\' refer to in the fluid mosaic model of the plasma membrane?',
    'number': '3',
    'answers' : [
    'That scientists had to put together pieces from various models to make one to fit',
    'The different sizes of plasma membranes that exist in nature',
    'The heterogeneous composition of phospholipids, cholesterol, proteins, and carbohydrates',
    'The array of colors seen when the plasma membrane is viewed with a'
    ],
    'correctAns' : 2,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 2
    }
  },
  {
    'question' : 'What role does cholesterol play in plasma membrane fluidity?',
    'number': '4',
    'answers' : [
    'Cholesterol has a detrimental role in membrane fluidity.',
    'Cholesterol acts like a magnet pulling proteins around the membrane.',
    'Cholesterol extends the range of temperature in which the membrane is fluid and functional.',
    'Cholesterol forces out the unsaturated fatty acids that \'kink\' from the membrane.'
    ],
    'correctAns' : 2,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 0
    }
  }
  ]
},

{
  'id' : 5,
  'type' : 'normal',
  'title' : 'History of Atomic Structure Quiz',
  'subject' : {
    'id' : '1'
  },
  'subTopic' : {
    'id' : '4'
  },
  'saved' : false,
  'submitted' : 'Not yet done','recommended' : 0,
  'score' : 0,
  'questions' : [
  {
    'question' : 'All of the following are examples of Dalton\'s theories of atomic structure and reactivity EXCEPT:',
    'number': '1',
    'answers' : [
    'The fundamental structure of atoms can change during chemical reactions',
    'The atoms of different elements differ in mass and size',
    'All atoms of a given element are identical',
    'Atoms are indestructible'
    ],
    'correctAns' : 0,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 4
    }
  },
  {
    'question' : 'Which of the following is the correct definition for the Law of Conservation of Mass as expressed by Lavoisier in 1789?',
    'number': '2',
    'answers' : [
    'Mass is conserved during a chemical reaction except when a gas is produced.',
    'Mass is conserved within an isolated system except during chemical reactions.',
    'Despite chemical reactions or physical transformations, mass is conserved within an isolated system.',
    'The mass that is lost during a chemical reaction is a result of phase changes during the reaction.'
    ],
    'correctAns' : 2,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 4
    }
  },
  {
    'question' : 'Which of the following is the correct definition for Proust\'s Law of Definite Composition?',
    'number': '3',
    'answers' : [
    'Chemical compounds are formed of constant and defined ratios of elements, as determined by mass',
    'Elements can mix in any ratio to form chemical compounds',
    'Atoms always combine in the same constant and defined ratio when forming compounds',
    'The composition of a compound can always be explicitly defined'
    ],
    'correctAns' : 0,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 4
    }
  }
  ]
},

{
  'id' : 6,
  'type' : 'normal',
  'title' : 'Structure of Atom Quiz',
  'subject' : {
    'id' : '1'
  },
  'subTopic' : {
    'id' : '5'
  },
  'saved' : false,
  'submitted' : 'Not yet done','recommended' : 0,
  'score' : 0,
  'questions' : [
  {
    'question' : 'Which of the following statements correctly describes the relative masses of the three subatomic particles?',
    'number': '1',
    'answers' : [
    'Neutrons and electrons weigh the same, protons weigh much less',
    'Protons, neutrons and electrons all weight the same',
    'Protons and neutrons weigh the same, electrons weigh much less',
    'Protons and electrons weigh the same, neutrons weigh much less'
    ],
    'correctAns' : 2,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 4
    }
  },
  {
    'question' : 'Which of the following statements correctly describes the relative charges of the three subatomic particles?',
    'number': '2',
    'answers' : [
    'Protons and neutrons have a charge of +1, while electrons have a much smaller charge',
    'Electrons are positive, protons are neutral, neutrons are negative',
    'Neutrons are positive, electrons are neutral, protons are negative',
    'Protons are positive, neutrons are neutral, electrons are negative'
    ],
    'correctAns' : 3,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 5
    }
  },
  {
    'question' : 'Which of the following statements accurately describes the locations of the three subatomic particles that make up an atom?',
    'number': '3',
    'answers' : [
    'The protons and neutrons are in the nucleus, while the electrons orbit the nucleus',
    'The neutrons and electrons are in the nucleus, while the protons orbit the nucleus',
    'The protons and electrons are in the nucleus, while the neutrons orbit the nucleus',
    'The protons, neutrons and electrons are all in the nucleus'
    ],
    'correctAns' : 0,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 5
    }
  },
  {
    'question' : 'If an element has a mass number of 18, what can be said about the number of protons and neutrons it contains?',
    'number': '4',
    'answers' : [
    'It has 8 protons and 10 neutrons',
    'It cannot be determined from the information given',
    'It has 9 protons and 9 neutrons',
    'It has 10 protons and 8 neutrons'
    ],
    'correctAns' : 1,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 5
    }
  }
  ]
},

{
  'id' : 7,
  'type' : 'normal',
  'title' : 'Strength of Acids Quiz',
  'subject' : {
    'id' : '1'
  },
  'subTopic' : {
    'id' : '6'
  },
  'saved' : false,
  'submitted' : 'Not yet done','recommended' : 0,
  'score' : 0,
  'questions' : [
  {
    'question' : 'What is the final pH of a solution resulting from the addition of 200ml of 4M HCl to 100mL of water?',
    'number': '1',
    'answers' : [
    '-0.426',
    '-0.602',
    '0.0969',
    'None of these answers'
    ],
    'correctAns' : 0,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 6
    }
  },
  {
    'question' : 'What is the pH of 500 mL of 0.1 M CH3OOH? The pKa of CH3OOH is 4.76.',
    'number': '2',
    'answers' : [
    '3.56',
    '2.38',
    '2.88',
    '1.44'
    ],
    'correctAns' : 2,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 6
    }
  },
  {
    'question' : 'Why can we omit the concentration of water when calculating equilibrium values for weak acid solutions? We can omit this value because ____________.',
    'number': '3',
    'answers' : [
    'The concentration of water remains relatively constant',
    'Water is amphoteric and has no net effect on acid-base equilibrium',
    'We assume the amount of water is small compared to the amount of acid',
    'Water is neutral and does not affect acid-base equilibrium'
    ],
    'correctAns' : 0,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 6
    }
  },
  {
    'question' : 'Write out the equilibrium reaction for formic acid (CHOOH) in water. What effect will the addition of CHOONa have on the pH of the solution?',
    'number': '4',
    'answers' : [
    'None of these answers',
    'It will become more acidic',
    'It will have no effect',
    'It will become more basic'
    ],
    'correctAns' : 3,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 6
    }
  }
  ]
},

{
  'id' : 8,
  'type' : 'normal',
  'title' : 'The pH scale Quiz',
  'subject' : {
    'id' : '1'
  },
  'subTopic' : {
    'id' : '7'
  },
  'saved' : false,
  'submitted' : 'Not yet done','recommended' : 0,
  'score' : 0,
  'questions' : [
  {
    'question' : 'What is the [OH-] of an acid with pH of 4.76?',
    'number': '1',
    'answers' : [
    '5.50 x 10-5 M',
    '6.78 x 10-1 M',
    '5.75 x 10-10 M',
    '9.67 x 10-1 M'
    ],
    'correctAns' : 2,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 7
    }
  },
  {
    'question' : 'Which of the following is acidic?',
    'number': '2',
    'answers' : [
    'Water',
    'NaOH (aq)',
    'H2CO3 (aq)',
    'Blood'
    ],
    'correctAns' : 2,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 7
    }
  },
  {
    'question' : 'What buffers blood to maintain its pH between 7.35 to 7.45?',
    'number': '3',
    'answers' : [
    'Carbonic acid and bicarbonate',
    'Water',
    'Carbon dioxide',
    'Oxygen pressure'
    ],
    'correctAns' : 0,
    'selected' : '',
    'saved' : false,
    'hinted' : false,
    'hint' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
    'subTopic' : {
      'id' : 7
    }
  }
  ]
}
];

$rootScope.subTopicList = [
{'id' : 0,
'name' : 'Prokaryotic Cells',
'description' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
'pdfLink' : '/slides/bio1.pdf',
'status' : 0,
'recommended' : 0,
'subject' : {
  'id': 0
},
'quiz' : {
  'id' : 1
}
},
{'id' : 1,
'name' : 'Eukaryotic Cells',
'description' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
'pdfLink' : '/slides/bio2.pdf',
'status' : 0,
'recommended' : 0,
'subject' : {
  'id': 0
},
'quiz' : {
  'id' : 2
}
},
{'id' : 2,
'name' : 'Active Transport',
'description' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
'pdfLink' : '/slides/bio3.pdf',
'status' : 0,
'recommended' : 0,
'subject' : {
  'id': 0
},
'quiz' : {
  'id' : 3
}
},
{'id' : 3,
'name' : 'Fluid Mosaic Model',
'description' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
'pdfLink' : '/slides/bio4.pdf',
'status' : 0,
'recommended' : 0,
'subject' : {
  'id': 0
},
'quiz' : {
  'id' : 4
}
},
{'id' : 4,
'name' : 'History of Atomic Structure',
'description' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
'pdfLink' : '/slides/chem1.pdf',
'status' : 0,
'recommended' : 0,
'subject' : {
  'id': 1
},
'quiz' : {
  'id' : 5
}
},
{'id' : 5,
'name' : 'The Structure of The Atom',
'description' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
'pdfLink' : '/slides/chem2.pdf',
'status' : 0,
'recommended' : 0,
'subject' : {
  'id': 1
},
'quiz' : {
  'id' : 6
}
},
{'id' : 6,
'name' : 'Strength of Acids',
'description' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
'pdfLink' : '/slides/chem3.pdf',
'status' : 0,
'recommended' : 0,
'subject' : {
  'id': 1
},
'quiz' : {
  'id' : 7
}
},
{'id' : 7,
'name' : 'The pH Scale',
'description' : 'Donec pulvinar neque sed semper lacinia. Curabitur lacinia ullamcorper nibh; quis imperdiet velit eleifend ac.',
'pdfLink' : '/slides/chem4.pdf',
'status' : 0,
'recommended' : 0,
'subject' : {
  'id': 1
},
'quiz' : {
  'id' : 8
}
}
];

/* Current ongoing quiz */
$rootScope.ongoingQuiz = [];

$rootScope.getOngoingQuizId = function () {
  if($rootScope.ongoingQuiz.length > 0) {
    return $rootScope.ongoingQuiz[$rootScope.ongoingQuiz.length - 1];
  } else {
    return '';
  }
}

/* List of deadlines */
$rootScope.deadlines = [];
$rootScope.deadline = {
  'name' : null,
  'date' : null,
  'topics' : [],
  'score': 0
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

  $rootScope.studySubjects = [];

  /* Deadline items */
  $rootScope.deadlineItems = [];

  $rootScope.$watch('deadlineItems', function () {
    console.log($rootScope.deadlineItems.length);
  });


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
})

.directive('slickSlider',function($timeout){
 return {
   restrict: 'A',
   link: function(scope,element,attrs) {
     $timeout(function() {
         $(element).slick(scope.$eval(attrs.slickSlider));
     });
   }
 }
}); 
