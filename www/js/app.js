angular.module('dunow', ['ionic', 'dunow.controllers', 'dunow.services'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function()
    {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard)
      {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar)
      {
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
      .state('tab.locations', {
        url: '/locations',
        views: {
          'tab-locations': {
            templateUrl: 'templates/tab-locations.html',
            controller: 'LocationsCtrl'
          }
        }
      })
      .state('tab.location-detail', {
        url: '/locations/:locationId',
        views: {
          'tab-locations': {
            templateUrl: 'templates/location-detail.html',
            controller: 'LocationDetailCtrl'
          }
        }
      })
    $urlRouterProvider.otherwise('/tab/map');
  });
