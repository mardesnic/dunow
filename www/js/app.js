angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
    .state('tab.map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'HomeCtrl'
      }
    }
  })
    .state('tab.location-detail', {
      url: '/dash/:locationId',
      views: {
        'tab-dash': {
          templateUrl: 'templates/location-detail.html',
          controller: 'LocationDetailCtrl'
        }
      }
    })

  .state('tab.admin', {
    url: '/admin',
    views: {
      'tab-admin': {
        templateUrl: 'templates/tab-admin.html',
        controller: 'AdminCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/tab/map');

});
