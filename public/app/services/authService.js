angular.module('authService', [])

  // ===================================================
  // auth factory to login and get information
  // inject $http for communicating with the API
  // inject $q to return promise objects
  // inject AuthToken to manage tokens
  // ===================================================

  .factory('Auth', function($http, $q, AuthToken){
    var authFactory = {};

    // login
    authFactory.login = function(username, password){
      return $http.post('/api/authenticate', {
        username: username,
        password: password
      })
        .success(function(data){
          AuthToken.setToken(data.token);
          return data;
        });
    };

    // logout
    authFactory.logout = function(){
      AuthToken.setToken();
    }

    // check if logged in
    authFactory.isLoggedIn = function(){
      if (AuthToken.getToken())
        return true;
      else
        return false;
    };

    //  get user info
    authFactory.getUser = function(){
      if (AuthToken.getToken())
        return $http.get('/api/me', { cache: true });
      else
        return $q.reject({ message: 'User has no token.' });
    };

    return authFactory;
  })

  // ===================================================
  // factory for handling tokens
  // inject $window to store token client-side
  // ===================================================

  .factory('AuthToken', function($window){
    var authTokenFactory = {};

    // get the token
    authTokenFactory.getToken = function(){
      return $window.localStorage,getItem('token');
    };

    // set or clear the token
    authTokenFactory.setToken = function(token){
      if (token){
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    };

    return authTokenFactory;
  })

  // ===================================================
  // application configuration to integrate token into requests 
  // ===================================================

  .factory('AuthInterceptor', function($q, AuthToken){
    var interceptorFactory = {};

    // attach token to every request
    interceptorFactory.request = function(config) {
      var token = AuthToken.getToken();

      if (token)
        config.headers['x-access-token'] = token;
        return config;
    };

    // redirect if token is invalid

    interceptorFactory.responseError = function(response){
      if (response.status == 403) {
        AuthToken.setToken();
        $location.path('/login');
      }
      return $q.reject(response);
    }

    return interceptorFactory;
  });
