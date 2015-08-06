angular.module('mainCtrl', [])
  .controller('mainController', function($rootScope, $location, Auth){
    var vm = this;

    // get info if a person is logged info
    vm.loggedIn = Auth.isLoggedIn();

    // check to see if a user is logged in on each request
    $rootscope.$on('$routeChangeStart', function(){
      vm.loggedIn = Auth.isLoggedIn();

      Auth.getUser()
        .success(function(data){
          vm.user = data;
        });
    });

    // function to handle login form
    vm.doLogin = function(){
      Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data){
          $location.path('/users');
        });
    };

    vm.doLogOut = function(){
      Auth.logout();
      // reset user info
      vm.user = {};
      $location.path('/login');
    };

  });
