app.controller("DashboardController", function($scope, $window, $location) {
  const user = JSON.parse($window.localStorage.getItem("user"));
  if (!user) {
    $location.path("/login");
    return;
  }

  $scope.user = user;

  $scope.logout = function() {
    $window.localStorage.clear();
    $location.path("/login");
  };
});