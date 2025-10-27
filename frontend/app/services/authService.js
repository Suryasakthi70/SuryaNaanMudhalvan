app.service("AuthService", function($http, $window) {
  const baseURL = "http://localhost:3500";

  this.login = function(credentials) {
    return $http.post(baseURL + "/login", credentials);
  };

  this.getProfile = function() {
    const token = $window.localStorage.getItem("token");
    return $http.get(baseURL + "/profile", {
      headers: { Authorization: "Bearer " + token }
    });
  };

  this.updateProfile = function(data) {
    const token = $window.localStorage.getItem("token");
    return $http.put(baseURL + "/profile", data, {
      headers: { Authorization: "Bearer " + token }
    });
  };

  this.logout = function() {
    $window.localStorage.clear();
  };
});