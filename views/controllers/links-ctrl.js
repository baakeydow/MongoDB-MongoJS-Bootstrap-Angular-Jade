//
// Tech
//

var myLinks = angular.module('myLinks', []);
myLinks.controller('TechCtrl', ['$scope', '$http', function($scope, $http) {
var refresh = function() {
  $http.get('/techLinks/').success(function(response) {
    console.log("I got the data I requested");
    $scope.techLinks = response;
    $scope.tech = "";
  });
};

refresh();

$scope.addLinks = function() {
  console.log($scope.tech);
  $http.post('/techLinks/', $scope.tech).success(function(response) {
    console.log(response);
    refresh();
  });
};
$scope.remove = function(id) {
  console.log(id);
  $http.delete('/techLinks/' + id).success(function(response) {
    refresh();
  });
};
$scope.edit = function(id) {
  console.log(id);
  $http.get('/techLinks/' + id).success(function(response) {
    $scope.tech = response;
  });
};
$scope.update = function() {
  console.log($scope.tech._id);
  $http.put('/techLinks/' + $scope.tech._id, $scope.tech).success(function(response) {
    refresh();
  })
};
$scope.deselect = function() {
  $scope.tech = "";
}
}]);﻿

//
// Programming
//

myLinks.controller('PrgCtrl', ['$scope', '$http', function($scope, $http) {

var refresh = function() {
  $http.get('/prgLinks/').success(function(response) {
    console.log("I got the data I requested");
    $scope.prgLinks = response;
    $scope.programming = "";
  });
};

refresh();

$scope.addLinks = function() {
  console.log($scope.programming);
  $http.post('/prgLinks/', $scope.programming).success(function(response) {
    console.log(response);
    refresh();
  });
};
$scope.remove = function(id) {
  console.log(id);
  $http.delete('/prgLinks/' + id).success(function(response) {
    refresh();
  });
};
$scope.edit = function(id) {
  console.log(id);
  $http.get('/prgLinks/' + id).success(function(response) {
    $scope.programming = response;
  });
};
$scope.update = function() {
  console.log($scope.programming._id);
  $http.put('/prgLinks/' + $scope.programming._id, $scope.programming).success(function(response) {
    refresh();
  })
};
$scope.deselect = function() {
  $scope.programming = "";
}
}]);
