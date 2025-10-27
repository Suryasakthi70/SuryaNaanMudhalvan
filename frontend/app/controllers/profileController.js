app.controller("ProfileController", function($scope, AuthService) {
  $scope.user = {};
  $scope.message = "";

  AuthService.getProfile()
    .then(function(res) {
      $scope.user = res.data.user;
    });

  $scope.updateProfile = function() {
    AuthService.updateProfile($scope.user)
      .then(() => {
        $scope.message = "Profile updated successfully!";
      })
      .catch(() => {
        $scope.message = "Failed to update profile.";
      });
  };
});