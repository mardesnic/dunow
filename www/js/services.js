angular.module('dunow.services', ['ionic', 'firebase','dunow.controllers', 'dunow.services'])

  .factory("Locations", function($firebaseArray) {
    var itemsRef = new Firebase("https://dunow.firebaseio.com/locations");

    return {
      all: function() {
        return $firebaseArray(itemsRef);
      }
    };

  });
