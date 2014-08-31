angular.module('ribs.controller.main', ['google-maps']).controller('MainController', ['$scope', '$routeParams', 'Customers', function($scope, $routeParams, Customers) {
    $scope.tagline = 'For all your service and replacement requirements!';
    
    var getInfo = function () {
    Customers.get()
      .success(function(data) {
        $scope.customers = data;
        
        var nrOfSystemMarkersOnMap = 0;
        var nrOfSystemsWithFRUReplacements = 0;
        for (var i = 0; i < data.length; i++){
            var customer = data[i];
            // hack to fill database..
            if ((customer.Location[0] === 0 && customer.Location[1] === 0) ||
               (customer.Location[0] === 40 && customer.Location[1] === 50))
            {            
                // now do a query
                var hospitalName = customer.HospitalName;
                var city = customer.City;
                var country = customer.CountryName;
                
                if (country !== "" && city !== "")
                {
                    var placeForRequest = city + ", " + country;
          
                    doUpdateCoordinates(customer, placeForRequest);        
                }
             }      
            else
            { 
                // Hack: should come from database of course
                var nrOfReplacementsDone = 0;
                
                if (nrOfSystemMarkersOnMap % 5 === 0)
                {
                    nrOfSystemsWithFRUReplacements++;
                    nrOfReplacementsDone = 1;
                }
                else if (nrOfSystemMarkersOnMap % 17 === 0)
                {
                    nrOfSystemsWithFRUReplacements++;
                    nrOfReplacementsDone = 5;
                }
            
                createMarker(data[i], nrOfReplacementsDone);
                nrOfSystemMarkersOnMap++;
            }

        }  
        
        $scope.tagline = 'Nr of systems on map: ' + nrOfSystemMarkersOnMap + '. Nr of systems with FRU replacements:' + nrOfSystemsWithFRUReplacements;
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
    
    var doUpdateCoordinates = function (customer, placeForRequest){
                console.log("Location empty, performing request to get location: " + placeForRequest);      
                var geocoder = new google.maps.Geocoder();
                    geocoder.geocode( { 'address': placeForRequest } , function(results, status) {
                      if (status == google.maps.GeocoderStatus.OK) {
                        var location = results[0].geometry.location;
                        console.log("the location is: " + location);
                        var lat = location.lat();
                        var longnr = location.lng();
                        var latlangnr = new Array(lat, longnr);
                        customer.Location = latlangnr;
                        Customers.update(customer);
                      } 
                      else {
                        console.log("Geocode was not successful for the following reason: " + status);
                      }
                    });        
    
    };
    
    var createMarker = function (info, nrOfReplacementsDone){
        console.log(info);
        var hospitalName = info.HospitalName;
        var city = info.City;
        var country = info.CountryName;
      
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.Location[0], info.Location[1]),
            title: info.HospitalName
        });
        
        if (nrOfReplacementsDone >= 5) {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            
        } 
        else { 
            if  (nrOfReplacementsDone >= 1)  {
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
            }
            else
            {
               marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            }
        }
        
        marker.content = '<div class="infoWindowContent">' + info.City + ', ' + info.CountryName + '</BR>Nr of FRU replacements:' + nrOfReplacementsDone + '</div>';      
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<b>' + marker.title + '</b></BR>' + marker.content);
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
