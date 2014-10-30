'use strict';

angular.module('idpApp')
.controller('SubjectCtrl', function ($scope,$rootScope,$routeParams,$location) {
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

  $scope.getSubTopicBySubTopicId = function (id) {
    return $rootScope.subTopicList[id];
  };

  $scope.getRelatedCourseUnit = function () {
    var count1 = 0;
    var hasCompleted = false;
    var recommendedArray = [];
    var recommendScore = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for(var i = 0;i < $scope.subject.topics.length;i++) {
      for(var j = 0;j < $scope.subject.topics[i].subTopics.length;j++) {
        count1 = count1 + 1;
        if($rootScope.subTopicList[$scope.subject.topics[i].subTopics[j].id].status == 0) {
          recommendedArray.push($rootScope.subTopicList[$scope.subject.topics[i].subTopics[j].id]);
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

    var recommendedToReturn = [];
    for(var i = 0;i < $scope.subject.topics.length;i++) {
      for(var j = 0;j < $scope.subject.topics[i].subTopics.length;j++) {
          if(hasCompleted) {
            if(recommendScore[$scope.subject.topics[i].subTopics[j].id] > 0 && 
              $rootScope.subTopicList[$scope.subject.topics[i].subTopics[j].id].status != 1) {
              $rootScope.subTopicList[$scope.subject.topics[i].subTopics[j].id].recommended = recommendScore[$scope.subject.topics[i].subTopics[j].id];
              recommendedToReturn.push($rootScope.subTopicList[$scope.subject.topics[i].subTopics[j].id]);
            }
          } else {
            $rootScope.subTopicList[$scope.subject.topics[i].subTopics[j].id].recommended = 1;
            recommendedToReturn.push($rootScope.subTopicList[$scope.subject.topics[i].subTopics[j].id]);
          }
      }
    }
    return recommendedToReturn;
  }

  $scope.getRelatedQuizzes = function () {
    var count1 = 0;
    var hasCompleted = false;
    var recommendedArray = [];
    var recommendScore = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for(var i = 0;i < $scope.subject.topics.length;i++) {
      for(var j = 0;j < $scope.subject.topics[i].subTopics.length;j++) {
        count1 = count1 + 1;
        if($rootScope.subTopicList[$scope.subject.topics[i].subTopics[j].id].status == 0) {
          recommendedArray.push($rootScope.subTopicList[$scope.subject.topics[i].subTopics[j].id]);
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

    var recommendedToReturn = [];
    for(var i = 0;i < $scope.subject.topics.length;i++) {
      for(var j = 0;j < $scope.subject.topics[i].subTopics.length;j++) {
        if($rootScope.quizzes[$scope.subject.topics[i].subTopics[j].quiz.id].submitted != 'Submitted') {
          if(hasCompleted) {
              $rootScope.quizzes[$scope.subject.topics[i].subTopics[j].quiz.id].recommended = recommendScore[$scope.subject.topics[i].subTopics[j].id];
              recommendedToReturn.push($rootScope.quizzes[$scope.subject.topics[i].subTopics[j].quiz.id]);
          } else {
            $rootScope.quizzes[$scope.subject.topics[i].subTopics[j].quiz.id].recommended = 1;
            recommendedToReturn.push($rootScope.quizzes[$scope.subject.topics[i].subTopics[j].quiz.id]);
          }
        }
      }
    }

    return recommendedToReturn;
  }

  $(document).ready(function() {
    var treeData = [{
    "name": "Knowledge Tree",
    "children": []
  }];

    var temp1 = {
      "name": $scope.subject.name,
      "parent": "knowledge Tree",
      "children": [],
    };

      for(var j = 0;j < $scope.subject.topics.length;j++) {

      var temp2 = {
        "name": $scope.subject.topics[j].name,
        "parent": $scope.subject.name,
        "children": []
      };
      for(var k = 0;k < $scope.subject.topics[j].subTopics.length;k++) {
        var temp3 = {
          "name": $rootScope.subTopicList[$scope.subject.topics[j].subTopics[k].id].name,
          "parent" : $scope.subject.topics[j].name,
          "type" : "subtopic",
          "idtemp" : $scope.subject.topics[j].subTopics[k].id
        }
        var temp4 = {
          "name": $rootScope.quizzes[$scope.subject.topics[j].subTopics[k].quiz.id].title,
          "parent" : $scope.subject.topics[j].name,
          "type" : "quiz",
          "idtemp" : $scope.subject.topics[j].subTopics[k].quiz.id
        }
        temp2.children.push(temp3);
        temp2.children.push(temp4);
      }
      temp1.children.push(temp2);
    }
    treeData[0].children.push(temp1);
    console.log(treeData);


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
  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

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
  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

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
    if(d.type == 'subtopic') {
      $scope.$apply( function() {
        $location.path('/subtopic/' + d.idtemp);
      });
    } else if (d.type == 'quiz') {
      $scope.$apply( function() {
        $location.path('/quiz/' + d.idtemp);
      });
    }
  }
  update(d);
}

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
