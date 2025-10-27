const app = angular.module("loginApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "app/views/login.html",
      controller: "LoginController"
    })
    .when("/dashboard", {
      templateUrl: "app/views/dashboard.html",
      controller: "DashboardController"
    })
    .when("/profile", {
      templateUrl: "app/views/profile.html",
      controller: "ProfileController"
    })
    .otherwise({ redirectTo: "/login" });
});