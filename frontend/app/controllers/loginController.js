app.controller("LoginController", function($scope, $location, AuthService, $window) {
  $scope.credentials = {};
  $scope.message = "";

  $scope.login = function() {
    AuthService.login($scope.credentials)
      .then(function(response) {
        $window.localStorage.setItem("token", response.data.token);
        $window.localStorage.setItem("user", JSON.stringify(response.data.user));
        $location.path("/dashboard");
      })
      .catch(function() {
        $scope.message = "Invalid email or password.";
      });
  };
});