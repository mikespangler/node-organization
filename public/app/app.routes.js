angular.module('app.routes', ['ngRoute'])

  .config(function($routeProvider, $locationProvider){

    $routeProvider

      // home page
      .when('/', {
        templateUrl : 'app/views/pages/home.html'
      });

      // get rid of hash in URL
      $locationProvider.html5Mode(true);
  });
