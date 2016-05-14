angular.module('starter.services', ['ionic', 'firebase','starter.controllers', 'starter.services'])

  .factory("Locations", function($firebaseArray) {
    var itemsRef = new Firebase("https://dunow.firebaseio.com/locations");

    return {
      all: function() {
        return $firebaseArray(itemsRef);
      }
    };

  })

  .factory("Chat", function($firebaseArray)
  {
    return {
      all: function(id) {
        var itemsRef = new Firebase("https://dunow.firebaseio.com/locations/"+id+"/chat");
        return $firebaseArray(itemsRef.endAt().limitToLast(30));
      }
    };

  })

  .factory("Map", function($firebaseArray)
  {
    var fb = new Firebase("https://dunow.firebaseio.com/");
    var itemsRef = new Firebase("https://dunow.firebaseio.com/location");
    return $firebaseArray(itemsRef);
  })

  .filter('range', function() {
    return function(val, range) {
      range = parseInt(range);
      for (var i=0; i<range; i++)
        val.push(i);
      return val;
    };
  });
