angular.module('ribs.controller.main', ['google-maps']).controller('MainController', ['$scope', '$routeParams', 'Customers', function($scope, $routeParams, Customers) {
    $scope.tagline = 'For all your service and replacement requirements!';
    
    var getInfo = function () {
    Customers.get()
      .success(function(data) {
        $scope.customers = data;
          
        for (var i = 0; i < data.length; i++){
        
            if (data[i].Location[0] !== 0 && data[i].Location[1] !== 0 )
            {
                createMarker(data[i]);
            }
        }        
    });
    };
    
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 2
    };
    
    // maps stuff from 

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow({
        maxWidth: 400
    });
    
    var createMarker = function (info){
        console.log(info);
        var hospitalName = info.HospitalName;
        var city = info.City;
        var country = info.CountryName;
    
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.Location[0], info.Location[1]),
            title: info.HospitalName
        });
        
        marker.content = '<div class="infoWindowContent">' + info.City + ', ' + info.CountryName +  '</br>Location: ' + info.Location + ' </div>';
        
        google.maps.event.addListener(marker, 'click', function(){
        
            infoWindow.setContent('<b>' + marker.title + '</b>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
    }; 
    
    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }; 
    
    getInfo();
}]);
