var myApp = angular.module('myApp', []);
var passport = angular.module('passport', []);

myApp.controller('AuthCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

$scope.justme = function() {
	$http.post('/login',
	  passport.authenticate('local'),
	  function(req, res) {
	    // If this function gets called, authentication was successful.
	    // `req.user` contains the authenticated user.
	    res.redirect('/contact');
	  });
	};
}]);﻿
