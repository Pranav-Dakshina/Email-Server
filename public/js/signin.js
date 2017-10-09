var app = angular.module('myApp', []);


app.controller('signInController', function($scope, $http) {

  // $scope.submit = function() {
  //   var data = {
  //     user: $scope.user,
  //     pass: $scope.pass
  //   };
  //
  //   $http.post('/auth/signIn',JSON.stringify(data)).then(function(response) {
  //     if (response.data) {
  //       console.log("Post Data Submitted Successfully!");
  //     }
  //   }, function (response) {
  //       console.log("Service not Exists");
  //       console.log(response.status);
  //       console.log(response.statusText);
  //       console.log(response.headers());
  //   });
  //
  // };

});

app.controller('signUpController', function($scope, $http, $location) {

  // $scope.submit2 = function() {
  //   var data = {
  //     user: $scope.email,
  //     pass: $scope.passSU1
  //   };
  //
  //   $http.post('/auth/signUp',JSON.stringify(data)).then(function(response) {
  //     if (response.data) {
  //       console.log("Post Data Submitted Successfully!");
  //       $location.path = '/auth/signUp';
  //     }
  //   }, function (response) {
  //       console.log("Service not Exists");
  //       console.log(response.status);
  //       console.log(response.statusText);
  //       console.log(response.headers());
  //   });
  //
  // };

});

app.controller('logInController', function($scope, $http) {

  // $scope.submit3 = function() {
  //   var data = {
  //     pin: $scope.pin
  //   };
    // };



});
