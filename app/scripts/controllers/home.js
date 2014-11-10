'use strict';

angular.module('idpApp')
.controller('HomeCtrl', function ($scope,$rootScope,ModalService,$location,$timeout) {

  $scope.header = function() {
  	return "/views/header.html";
  };

  $scope.footer = function() {
    return "/views/footer.html";
  };

  $scope.firstTime = true;

  $scope.studySubjects = [];

  /* Progress bar */
  $scope.countFrom = 0;

  $scope.countTo = function (id) {
    countCompleted = 0;
    countTotal = 0;
    for (var i = 0;i < $rootScope.knowledgeTree[id].topics.length;i++) {
      for (var j = 0;j < $rootScope.knowledgeTree[id].topics[i].subTopics.length;j++) {
        if($rootScope.knowledgeTree[id].topics[i].subTopics[j].status == 1) {
          countCompleted = countCompleted + 1;
        }
        if($rootScope.quizzes[$rootScope.knowledgeTree[id].topics[i].subTopics[j].quiz.id].submitted == 'Submitted') {
          countCompleted = countCompleted + 1;
        }
        countTotal = countTotal + 1;
      }
    }
    return countCompleted*100.0/countTotal;
  }

  $scope.getProgressByTopic = function (topic) {
    var statusDoneCount = 0;
    for(var i = 0;i < topic.subTopics.length;i++) {
      if (topic.subTopics[i].status == 1) {
        statusDoneCount  = statusDoneCount + 1;
      }
    }
    if(topic.subTopics.length > 0) {
      return statusDoneCount/topic.subTopics.length;
    } else {
      return 0;
    }
  }
  
  $timeout(function(){
    $scope.progressValue = $scope.countTo;
  }, 200);

  $scope.$watch('studySubjects', function () {
    $rootScope.studySubjects = $scope.studySubjects;
  });

  /* Get regular items */
  $scope.getRegularItems = function () {
    var count1 = 0;
    var hasCompleted = false;
    var recommendedArray = [];
    var recommendScore = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for(var s = 0;s < $scope.studySubjects.length;s++) {
      for(var i = 0;i < $scope.studySubjects[s].topics.length;i++) {
        for(var j = 0;j < $scope.studySubjects[s].topics[i].subTopics.length;j++) {
          count1 = count1 + 1;
          if($rootScope.subTopicList[$scope.studySubjects[s].topics[i].subTopics[j].id].status == 0) {
            recommendedArray.push($rootScope.subTopicList[$scope.studySubjects[s].topics[i].subTopics[j].id]);
            for(var k = 0;k < recommendedArray.length;k++) {
              recommendScore[recommendedArray[k].id] = recommendScore[recommendedArray[k].id] + 1;
            }
          } else {
            for(var k = 0;k < recommendedArray.length;k++) {
              if(hasCompleted) {
                if(recommendScore[recommendedArray[k].id] > count1 - recommendScore[recommendedArray[k].id]) {
                  recommendScore[recommendedArray[k].id] = count1 - recommendScore[recommendedArray[k].id];
                }
              }
            }
            hasCompleted = true;
            recommendedArray = [];
            count1 = 0;
          }
        }
      }
    }

    var recommendedToReturn = [];

    for(var s = 0;s < $scope.studySubjects.length;s++) {
      for(var i = 0;i < $scope.studySubjects[s].topics.length;i++) {
        for(var j = 0;j < $scope.studySubjects[s].topics[i].subTopics.length;j++) {
          if(hasCompleted) {
            if(recommendScore[$scope.studySubjects[s].topics[i].subTopics[j].id] > 0 && 
              $rootScope.subTopicList[$scope.studySubjects[s].topics[i].subTopics[j].id].status != 1) {
              $rootScope.subTopicList[$scope.studySubjects[s].topics[i].subTopics[j].id].recommended = recommendScore[$scope.studySubjects[s].topics[i].subTopics[j].id];
            recommendedToReturn.push($rootScope.subTopicList[$scope.studySubjects[s].topics[i].subTopics[j].id]);
          }
        } else {
          $rootScope.subTopicList[$scope.studySubjects[s].topics[i].subTopics[j].id].recommended = 1;
          recommendedToReturn.push($rootScope.subTopicList[$scope.studySubjects[s].topics[i].subTopics[j].id]);
        }

        if($rootScope.quizzes[$scope.studySubjects[s].topics[i].subTopics[j].quiz.id].submitted != 'Submitted') {
          if(hasCompleted) {
            $rootScope.quizzes[$scope.studySubjects[s].topics[i].subTopics[j].quiz.id].recommended = recommendScore[$scope.studySubjects[s].topics[i].subTopics[j].id];
            recommendedToReturn.push($rootScope.quizzes[$scope.studySubjects[s].topics[i].subTopics[j].quiz.id]);
          } else {
            $rootScope.quizzes[$scope.studySubjects[s].topics[i].subTopics[j].quiz.id].recommended = 1;
            recommendedToReturn.push($rootScope.quizzes[$scope.studySubjects[s].topics[i].subTopics[j].quiz.id]);
          }
        }
      }
    }
  }
  return recommendedToReturn.slice(0,4);
}

/* Compute color of the bar */
$scope.barColor = function (score) {
  if(score < 50) {
    return 'progress-bar-danger';
  } else if (score >= 50 && score < 75) {
    return 'progress-bar-warning';
  } else {
    return 'progress-bar-success';
  }
}


$(document).ready(function() {

  var treeData = [{
    "name": "Knowledge Tree",
    "children": []
  }];

  for(var i = 0;i < $rootScope.knowledgeTree.length;i++) {
    var temp1 = {
      "name": $rootScope.knowledgeTree[i].name,
      "parent": "knowledge Tree",
      "_children": [],
    };
    for(var j = 0;j < $rootScope.knowledgeTree[i].topics.length;j++) {
      var temp2 = {
        "name": $rootScope.knowledgeTree[i].topics[j].name,
        "parent": $rootScope.knowledgeTree[i].name,
        "_children": []
      };
      for(var k = 0;k < $rootScope.knowledgeTree[i].topics[j].subTopics.length;k++) {
        var temp3 = {
          "name": $rootScope.subTopicList[$rootScope.knowledgeTree[i].topics[j].subTopics[k].id].name,
          "parent" : $rootScope.knowledgeTree[i].topics[j].name,
          "idtemp" : $rootScope.knowledgeTree[i].topics[j].subTopics[k].id,
          "type": "subtopic",
          "status": $rootScope.subTopicList[$rootScope.knowledgeTree[i].topics[j].subTopics[k].id].status,
        }
        if($rootScope.knowledgeTree[i].topics[j].subTopics[k].id > 0 && $rootScope.subTopicList[$rootScope.knowledgeTree[i].topics[j].subTopics[k].id-1].status == 1) {
          temp3.future = true;
        } else {
          temp3.future = false;
        }
        temp2._children.push(temp3);

        var temp4 = {
          "name": $rootScope.quizzes[$rootScope.knowledgeTree[i].topics[j].subTopics[k].quiz.id].title,
          "parent" : $rootScope.knowledgeTree[i].topics[j].name,
          "idtemp" : $rootScope.knowledgeTree[i].topics[j].subTopics[k].quiz.id,
          "type" : "quiz",
          "submitted" : $rootScope.quizzes[$rootScope.knowledgeTree[i].topics[j].subTopics[k].quiz.id].submitted,
        }
        if($rootScope.subTopicList[$rootScope.knowledgeTree[i].topics[j].subTopics[k].id].status == 1) {
          temp4.future = true;
        } else {
          temp4.future = false;
        }
        temp2._children.push(temp4);

      }
      temp1._children.push(temp2);
    }
    temp1._children.push({
      "name": $rootScope.knowledgeTree[i].name + ' Subject Page',
      "parent": $rootScope.knowledgeTree[i].name,
      "_children": [],
      "idtemp" : $rootScope.knowledgeTree[i].id,
      "type": "subject"
    });
    treeData[0].children.push(temp1);
  }


// ************** Generate the tree diagram  *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
width = 960 - margin.right - margin.left,
height = 300 - margin.top - margin.bottom;

var i = 0,
duration = 750,
root;

var tree = d3.layout.tree()
.size([height, width]);

var diagonal = d3.svg.diagonal()
.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("#chart").append("svg")
.attr("width", width + margin.right + margin.left)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
root.x0 = height / 2;
root.y0 = 0;

update(root);

d3.select(self.frameElement).style("height", "300px");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
  .attr("class", "node")
  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
  .on("click", click);

  nodeEnter.append("circle")
  .attr("r", 1e-6)
  .style("fill", function(d) { 
    console.log(d.type);
    if(d._children) {
      return "lightsteelblue";
    } else if(d.type === "subject") {
      if(d.status == 0) {
        return "green";
      } else {
        return "red";
      }
    } else {
      return "#fff"; 
    }
  });

  nodeEnter.append("text")
  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
  .attr("dy", ".35em")
  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
  .text(function(d) { return d.name; })
  .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
  .duration(duration)
  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
  .attr("r", 10)
  .style("fill", function(d) { 
    console.log(d.type);
    if(d.type == "subtopic") {
      if(d.status == 1) {
        return "#2ecc71";
      } else { 
        console.log(d.future);
        if(d.future == true) {
          return "#e74c3c";
        } else {
          return "#fff"
        }
      }
    } else if(d.type == "quiz") {
      if(d.submitted == 'Submitted') {
        return "#2ecc71";
      } else { 
        console.log(d.future);
        if(d.future == true) {
          return "#e74c3c";
        } else {
          return "#fff"
        }
      }
    }
    if(d._children) {
      return "lightsteelblue";
    } else {
      return "#fff";
    }
  });

  nodeUpdate.select("text")
  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
  .duration(duration)
  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
  .remove();

  nodeExit.select("circle")
  .attr("r", 1e-6);

  nodeExit.select("text")
  .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
  .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
  .attr("class", "link")
  .attr("d", function(d) {
    var o = {x: source.x0, y: source.y0};
    return diagonal({source: o, target: o});
  });

  // Transition links to their new position.
  link.transition()
  .duration(duration)
  .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
  .duration(duration)
  .attr("d", function(d) {
    var o = {x: source.x, y: source.y};
    return diagonal({source: o, target: o});
  })
  .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else if(d._children) {
    d.children = d._children;
    d._children = null;
  } else {
    console.log(d.type);
    if(d.type == 'subject') {
      $scope.$apply( function() {
        $location.path('/subject/' + d.idtemp); 
      });
    } else if(d.type == 'quiz') {
      $scope.$apply( function() {
        $location.path('/quiz/' + d.idtemp); 
      });
    } else {
      $scope.$apply( function() {
        $location.path('/subtopic/' + d.idtemp);
      });
    }
  }
  update(d);
}

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
        element: "#top-header",
        title: "Welcome to Flow!",
        content: "Flow is an adaptive learning platform that personalize your studying routine based on the recommendation " +
        "engine.This tour will walk you through about how to use some basic features of the platform."
      },
      {
        element: "#choose-edu-level",
        title: "Choose Education Level",
        content: "You can filter out only those subjects that belong to your current education level or the education level " +
        "that you're interested in.If you don't have any preference, just choose \"All\"."
      },
      {
        element: "#choose-study-mode",
        title: "Choose Study Mode",
        content: "If you don't want to be distracted by the recommeneded items in the sidebar when studying or taking the quiz, " +
        "turn on the study mode and the world will be all cool again."
      },
      {
        element: "#add-new-subject",
        title: "Add New Subject",
        content: "Start studying by selecting the subjects.You can come back and add new subjects every time you want."
      },
      {
        element: "#knowledge-tree",
        title: "Knowledge Tree",
        content: "What is this weird thing here?The knowledge tree will help you keep track of your current progress " +
        " and suggest the next items that you need to take.Click on the nodes to expand or narrow the tree."
      },
      {
        element: "#regular-item-list",
        title: "Regular Study Items",
        content: "After you have selected the subjects, the system will start recommending the items that you " +
        "need to take for these subjects.The recommended list will keep changing the more items you take."
      },
      {
        element: "#current-studying",
        title: "Current Studying Subjects",
        content: "Summary of all your studying subjects goes here with your current progress for each subject " +
        "(you need to add at least one subject to see any content here)."
      },
      {
        element: "#recommended-items-header",
        title: "Add New Deadline",
        content: "This is a special functionality to help you study for your exam.Add the time and topic covered " +
        "in your exam and the system will lead you to a diagnostic quiz to help you determine what is the items " +
        "that you need to revise to do well in the exam."
      },
      {
        element: "#important-item-list",
        title: "Deadline Items",
        content: "These are all of the recommended items we revise you to take to prepare for your exams.Go through every of them " +
        "and crush your next exam like a boss!"
      }
      ],
      storage: false,
      backdrop: true
    });

// Initialize the tour
tour.init();

// Start the tour
tour.start(); 

});

});
