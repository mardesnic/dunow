angular.module('dunow.controllers', [])

  .controller('MapCtrl', function($scope, $state, Locations,$timeout,$ionicSideMenuDelegate)
  {
    $scope.locations = Locations.all();
    var  gradientOrange = [
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
    var gradientWhiteRed = [
      'rgba(255, 255, 255, 0)',
      'rgba(255, 255, 255, 1)',
      'rgba(255, 225, 225, 1)',
      'rgba(255, 200, 200, 1)',
      'rgba(255, 175, 175, 1)',
      'rgba(255, 160, 160, 1)',
      'rgba(255, 145, 145, 1)',
      'rgba(255, 125, 125, 1)',
      'rgba(255, 110, 110, 1)',
      'rgba(255, 100, 100, 1)',
      'rgba(255, 75, 75, 1)',
      'rgba(255, 50, 50, 1)',
      'rgba(255, 25, 25, 1)',
      'rgba(255, 0, 0, 1)'
    ];
    var  gradientGreenRed = [
      'rgba(0, 255, 0, 0)',
      'rgba(25, 235, 0, 1)',
      'rgba(50, 225, 0, 1)',
      'rgba(75, 200, 0, 1)',
      'rgba(100, 175, 0, 1)',
      'rgba(110, 160, 0, 1)',
      'rgba(125, 145, 0, 1)',
      'rgba(145, 125, 0, 1)',
      'rgba(160, 110, 0, 1)',
      'rgba(175, 100, 0, 1)',
      'rgba(200, 75, 0, 1)',
      'rgba(225, 50, 0, 1)',
      'rgba(235, 25, 0, 1)',
      'rgba(255, 0, 0, 1)'
    ];

    var  gradientWhiteBlack = [
      'rgba(255, 255, 255, 0)',
      'rgba(255, 255, 255, 1)',
      'rgba(225, 225, 225, 1)',
      'rgba(200, 200, 200, 1)',
      'rgba(175, 175, 175, 1)',
      'rgba(160, 160, 160, 1)',
      'rgba(145, 145, 145, 1)',
      'rgba(125, 125, 125, 1)',
      'rgba(110, 110, 110, 1)',
      'rgba(100, 100, 100, 1)',
      'rgba(75, 75, 75, 1)',
      'rgba(50, 50, 50, 1)',
      'rgba(25, 25, 25, 1)',
      'rgba(0, 0, 0, 1)'
    ];
    var gradientWhiteGreen = [
      'rgba(255, 255, 255, 0)',
      'rgba(235, 255, 235, 1)',
      'rgba(225, 255, 225, 1)',
      'rgba(200, 255, 200, 1)',
      'rgba(175, 255, 175, 1)',
      'rgba(160, 255, 160, 1)',
      'rgba(145, 255, 145, 1)',
      'rgba(125, 255, 125, 1)',
      'rgba(110, 255, 110, 1)',
      'rgba(100, 255, 100, 1)',
      'rgba(75, 255, 75, 1)',
      'rgba(50, 255, 50, 1)',
      'rgba(25, 255, 25, 1)',
      'rgba(0, 255, 0, 1)'
    ];

    $scope.type=1;
    $scope.gradient=gradientOrange;

    $scope.changeTypeGradient = function (type)
    {
      if(type==1)
      {
        $scope.type=type;
        $scope.gradient=gradientOrange;
        initHeatMapMarkers();
      }
      else if(type==2)
      {
        $scope.type=2;
        $scope.gradient=gradientWhiteRed;
        initHeatMapMarkers();
      }
      else if(type==4)
      {
        $scope.type=4;
        $scope.gradient=gradientWhiteBlack;
        initHeatMapMarkers();
      }
      else if(type==5)
      {
        $scope.type=5;
        $scope.gradient=gradientGreenRed;
        initHeatMapMarkers();
      }
      else if(type==6)
      {
        $scope.type=6;
        $scope.gradient=gradientWhiteGreen;
        initHeatMapMarkers();
      }
    };

    $scope.toggleMenu = function ()
    {
      $ionicSideMenuDelegate.toggleLeft();
    };

    initMap();
    $timeout(wrapper, 3000);

    function wrapper()
    {
      initHeatMapMarkers();
      $timeout(wrapper, 10000);
    }

    function initMap()
    {
      var dubrovnik = new google.maps.LatLng(42.644739, 18.105468);
      $scope.map = new google.maps.Map(document.getElementById('map'), {
        center: dubrovnik,
        zoom: 14,
        scrollwheel: false,
        disableDefaultUI: true,
        minZoom: 14,
        maxZoom:14,
        styles:[{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"administrative","elementType":"labels","stylers":[{"saturation":"-100"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"gamma":"0.75"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":"-37"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f9f9f9"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"saturation":"-100"},{"lightness":"40"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"labels.text.fill","stylers":[{"saturation":"-100"},{"lightness":"-37"}]},{"featureType":"landscape.natural","elementType":"labels.text.stroke","stylers":[{"saturation":"-100"},{"lightness":"100"},{"weight":"2"}]},{"featureType":"landscape.natural","elementType":"labels.icon","stylers":[{"saturation":"-100"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":"-100"},{"lightness":"80"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"},{"saturation":"-100"},{"lightness":"0"}]},{"featureType":"poi.attraction","elementType":"geometry","stylers":[{"lightness":"-4"},{"saturation":"-100"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"},{"visibility":"on"},{"saturation":"-95"},{"lightness":"62"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road","elementType":"labels","stylers":[{"saturation":"-100"},{"gamma":"1.00"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"gamma":"0.50"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"saturation":"-100"},{"gamma":"0.50"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"},{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"lightness":"-13"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"lightness":"0"},{"gamma":"1.09"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"},{"saturation":"-100"},{"lightness":"47"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"lightness":"-12"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"saturation":"-100"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"},{"lightness":"77"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"lightness":"-5"},{"saturation":"-100"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"saturation":"-100"},{"lightness":"-15"}]},{"featureType":"transit.station.airport","elementType":"geometry","stylers":[{"lightness":"47"},{"saturation":"-100"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"water","elementType":"geometry","stylers":[{"saturation":"53"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"-42"},{"saturation":"17"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"lightness":"61"}]}]
      });

      $scope.heatmap = new google.maps.visualization.HeatmapLayer({});
      $scope.markers = [];

    }

    function initHeatMapMarkers()
    {
      deleteMarkers();
      $scope.heatmap.setMap(null);
      var heatMapData = [];
      for(var i=0;i<$scope.locations.length;i++)
      {
        if($scope.type==1)
        {
          addMarker(new google.maps.LatLng($scope.locations[i].lat,$scope.locations[i].lng), $scope.locations[i].temperature);
          heatMapData.push({location: new google.maps.LatLng($scope.locations[i].lat,$scope.locations[i].lng), weight: $scope.locations[i].temperature});
        }
        else if($scope.type==2)
        {
          addMarker(new google.maps.LatLng($scope.locations[i].lat,$scope.locations[i].lng), $scope.locations[i].uv);
          heatMapData.push({location: new google.maps.LatLng($scope.locations[i].lat,$scope.locations[i].lng), weight: $scope.locations[i].uv});
        }
        else if($scope.type==4)
        {
          addMarker(new google.maps.LatLng($scope.locations[i].lat,$scope.locations[i].lng), $scope.locations[i].humidity);
          heatMapData.push({location: new google.maps.LatLng($scope.locations[i].lat,$scope.locations[i].lng), weight: $scope.locations[i].humidity});
        }
        else if($scope.type==5)
        {
          addMarker(new google.maps.LatLng($scope.locations[i].lat,$scope.locations[i].lng), $scope.locations[i].mq);
          heatMapData.push({location: new google.maps.LatLng($scope.locations[i].lat,$scope.locations[i].lng), weight: $scope.locations[i].mq});
        }
        else if($scope.type==6)
        {
          addMarker(new google.maps.LatLng($scope.locations[i].lat,$scope.locations[i].lng), $scope.locations[i].ppl);
          heatMapData.push({location: new google.maps.LatLng($scope.locations[i].lat,$scope.locations[i].lng), weight: $scope.locations[i].ppl});
        }
      }

      $scope.heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData,
        dissipating : true,
        radius : 50,
        gradient : $scope.gradient
      });
      $scope.heatmap.setMap($scope.map);
      setMapOnAll($scope.map);

    }
    function addMarker(location, value)
    {
      var marker = new google.maps.Marker({
        position: location,
        title: value,
        icon: '../img/trans.png',
        map: $scope.map
      });
      $scope.markers.push(marker);
    }
    function deleteMarkers()
    {
      clearMarkers();
      $scope.markers = [];
    }
    function clearMarkers()
    {
      setMapOnAll(null);
    }
    function setMapOnAll(map)
    {
      for (var i = 0; i < $scope.markers .length; i++)
      {
        $scope.markers [i].setMap(map);
      }
    }

  })


  .controller("LocationsCtrl", function($scope, $sce,$window, Locations)
  {
    $scope.locations = Locations.all();
  })

  .controller('LocationDetailCtrl', function($scope, $stateParams,$firebaseObject)
  {
    var ref = new Firebase("https://dunow.firebaseio.com/locations/"+$stateParams.locationId);
    var obj = $firebaseObject(ref);
    $scope.location = obj;
  });
