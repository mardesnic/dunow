angular.module('starter.controllers', [])

  .controller('MapCtrl', function($scope, $state, Locations,$timeout,$ionicSideMenuDelegate)
  {
    var gradient2 = [
      'rgba(0, 200, 255, 0)',
      'rgba(0, 200, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];
    //za temperaturu zraka
    var  gradient3 = [
      'rgba(255, 255, 0, 0)',
      'rgba(255, 255, 0, 1)',
      'rgba(255, 225, 0, 1)',
      'rgba(255, 200, 0, 1)',
      'rgba(255, 175, 0, 1)',
      'rgba(255, 160, 0, 1)',
      'rgba(255, 145, 0, 1)',
      'rgba(255, 125, 0, 1)',
      'rgba(255, 110, 0, 1)',
      'rgba(255, 100, 0, 1)',
      'rgba(255, 75, 0, 1)',
      'rgba(255, 50, 0, 1)',
      'rgba(255, 25, 0, 1)',
      'rgba(255, 0, 0, 1)'
    ];
    //za zagadjenost zraka
    var  gradient33 = [
      'rgba(0, 255, 0, 0)',
      'rgba(0, 255, 0, 1)',
      'rgba(0, 225, 0, 1)',
      'rgba(0, 200, 0, 1)',
      'rgba(0, 175, 0, 1)',
      'rgba(0, 160, 0, 1)',
      'rgba(0, 145, 0, 1)',
      'rgba(0, 125, 0, 1)',
      'rgba(0, 110, 0, 1)',
      'rgba(0, 100, 0, 1)',
      'rgba(0, 75, 0, 1)',
      'rgba(0, 50, 0, 1)',
      'rgba(0, 25, 0, 1)',
      'rgba(0, 0, 0, 1)'
    ];

    $scope.type=1;
    $scope.gradient=gradient3;

    $scope.trigger = function (type)
    {
      $scope.type="";
      $scope.gradient="";
      if(type==1)
      {
        $scope.type=type;
        $scope.gradient=gradient3;
        initHeatMapMarkers(type,gradient3);
      }
      else if(type==2)
      {
        $scope.type=2;
        $scope.gradient=gradient2;
        initHeatMapMarkers(type,gradient2);
      }
      else if(type==3)
      {
        $scope.type=3;
        $scope.gradient=gradient3;
        initHeatMapMarkers(type,gradient3);
      }
      else if(type==4)
      {
        $scope.type=4;
        $scope.gradient=gradient2;
        initHeatMapMarkers(type,gradient2);
      }
      else if(type==5)
      {
        $scope.type=5;
        $scope.gradient=gradient33;
        initHeatMapMarkers(type,gradient33);
      }
      else if(type==6)
      {
        $scope.type=6;
        $scope.gradient=gradient3;
        initHeatMapMarkers(type,gradient3);
      }
    };

    $scope.toggleMenu = function ()
    {
      $ionicSideMenuDelegate.toggleLeft();
    };

    initMap();
    function getHeatmapRadius(zoom)
    {
      return (zoom - 12) * 10;
    }


    function initMap()
    {
      Locations.all().$loaded()
        .then(
          function(locations){
            var heatMapData = [];
            for(var i=0;i<locations.length;i++)
            {
              if( (typeof $scope.type !== 'undefined') && $scope.type==1)
              {
                heatMapData.push({location: new google.maps.LatLng(locations[i].lat,locations[i].lng), weight: locations[i].temperature});
              }
              else if($scope.type==2)
              {
                heatMapData.push({location: new google.maps.LatLng(locations[i].lat,locations[i].lng), weight: locations[i].uv});
              }
              else if($scope.type==3)
              {
                heatMapData.push({location: new google.maps.LatLng(locations[i].lat,locations[i].lng), weight: locations[i].sea_temperature});
              }
              else if($scope.type==4)
              {
                heatMapData.push({location: new google.maps.LatLng(locations[i].lat,locations[i].lng), weight: locations[i].humidity});
              }
              else if($scope.type==5)
              {
                heatMapData.push({location: new google.maps.LatLng(locations[i].lat,locations[i].lng), weight: locations[i].mq});
              }
              else if($scope.type==6)
              {
                heatMapData.push({location: new google.maps.LatLng(locations[i].lat,locations[i].lng), weight: locations[i].ppl});
              }
            }
            return heatMapData;
          }
        )
        .then(
          function(heatMapData)
          {
            var dubrovnik = new google.maps.LatLng(42.644739, 18.105468);

            $scope.map = new google.maps.Map(document.getElementById('map'), {
              center: dubrovnik,
              zoom: 14,
              scrollwheel: false,
              mapTypeId: google.maps.MapTypeId.SATELLITE
            });

            $scope.heatmap = new google.maps.visualization.HeatmapLayer({
              data: heatMapData,
              disipating : true,
              gradient : $scope.gradient,
              radius : getHeatmapRadius($scope.map.zoom)
            });
            $scope.heatmap.setMap($scope.map);
          }
        );
    }

    function initHeatMapMarkers(type,gradient)
    {
      $scope.heatmap.setMap(null);
      Locations.all().$loaded()
        .then(
          function(locations){
            var heatMapData = [];
            for(var i=0;i<locations.length;i++)
            {
              if( (typeof $scope.type !== 'undefined') && $scope.type==1)
              {
                heatMapData.push({location: new google.maps.LatLng(locations[i].lat,locations[i].lng), weight: locations[i].temperature});
              }
              else if($scope.type==2)
              {
                heatMapData.push({location: new google.maps.LatLng(locations[i].lat,locations[i].lng), weight: locations[i].uv});

              }
              else if($scope.type==3)
              {
                heatMapData.push({location: new google.maps.LatLng(locations[i].lat,locations[i].lng), weight: locations[i].sea_temperature});
              }
              else if($scope.type==4)
              {
                heatMapData.push({location: new google.maps.LatLng(locations[i].lat,locations[i].lng), weight: locations[i].humidity});
              }
              else if($scope.type==5)
              {
                heatMapData.push({location: new google.maps.LatLng(locations[i].lat,locations[i].lng), weight: locations[i].mq});
              }
              else if($scope.type==6)
              {
                heatMapData.push({location: new google.maps.LatLng(locations[i].lat,locations[i].lng), weight: locations[i].ppl});
              }
            }
            return heatMapData;
          }
        )
        .then(
          function(heatMapData)
          {
            $scope.heatmap = new google.maps.visualization.HeatmapLayer({
              data: heatMapData,
              disipating : true,
              radius : getHeatmapRadius($scope.map.zoom),
              gradient : $scope.gradient
            });
            $scope.heatmap.setMap($scope.map);
          }
        );
    }


    function wrapper()
    {
      initHeatMapMarkers($scope.type,$scope.gradient);
      $timeout(wrapper, 10000);
    }

    $timeout(wrapper, 10000);
  })


  .controller("HomeCtrl", function($scope, $sce,$window, Locations)
  {
    $scope.init = function(stream)
    {
      $scope.url = stream.stream;
      $scope.url = $sce.trustAsResourceUrl($scope.url);
    }
    $scope.locations = Locations.all();

    $scope.toggleGroup = function(group)
    {
      if ($scope.isGroupShown(group))
      {
        $scope.shownGroup = null;
      }
      else
      {
        $scope.shownGroup = group;
        $scope.init(group);
      }
    };

    $scope.isGroupShown = function(group)
    {
      return $scope.shownGroup === group;
    };

    $scope.getTotal = function(location)
    {
      var total = 0;
      var br=0;
      var locationRatings = location.ratings;
      for (var rating in locationRatings)
      {
        total += locationRatings[rating];
        br++;
      }
      return total/br;
    }
    $scope.rate = function(rate){
      $window.alert(rate+1);
    };
  })

  .controller('LocationDetailCtrl', function($scope, $stateParams,$firebaseObject,$sce,Chat)
  {
    $scope.chat = Chat.all($stateParams.locationId);
    $scope.master = {};
    $scope.init = function(stream)
    {
      $scope.url = stream;
      $scope.url = $sce.trustAsResourceUrl($scope.url);
    };

    var ref = new Firebase("https://dunow.firebaseio.com/locations/"+$stateParams.locationId);
    var obj = $firebaseObject(ref);
    $scope.location = obj;

    $scope.update = function(msg)
    {
      if(msg.username!="")
      {
        $scope.chat.$add(msg);
      }
    };
  })

  .controller('AdminCtrl', function($scope, Locations,$window, $ionicModal)
  {
    $scope.locations = Locations.all();
    $scope.location={};
    $scope.master = {};

    $scope.update = function(location)
    {
      if($scope.location.name)
      {
        $scope.locations.$add(location);
        $scope.reset();
      }
      else
      {
        $window.alert("fail");
      }
    };

    $scope.reset = function()
    {
      $scope.location = angular.copy($scope.master);
    };
    $ionicModal.fromTemplateUrl('new-location.html',
      {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal)
    {
      $scope.modal = modal;
    });
    $scope.openModal = function()
    {
      $scope.modal.show();
    };
    $scope.closeModal = function()
    {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function()
    {
      $scope.modal.remove();
    });
    $scope.$on('modal.hidden', function(){});
    $scope.$on('modal.removed', function(){});

  });
