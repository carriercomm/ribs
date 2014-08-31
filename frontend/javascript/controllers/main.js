angular.module('ribs.controller.main', ['google-maps']).controller('MainController', ['$scope', '$routeParams', 'Customers', 'Materials', function($scope, $routeParams, Customers, Materials) {
    $scope.tagline = 'For all your service and replacement requirements!';
    
    var getInfo = function () {
    Customers.get()
      .success(function(data) {
        $scope.customers = data;
        
        var nrOfSystemMarkersOnMap = 0;
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
                // Uglyuglyugly many http calls to fill the map with markers
                getNrOfMaterialPlacementsCreateMarker(data[i], i);
                nrOfSystemMarkersOnMap++;
            }

        }  
        
        $scope.tagline = 'Nr of systems on map: ' + nrOfSystemMarkersOnMap;
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
    
    var createMarker = function (info, nrOfReplacementsDone, systemSerialId){
        console.log(info);
        var hospitalName = info.HospitalName;
        var city = info.City;
        var country = info.CountryName;
      
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.Location[0], info.Location[1]),
            title: info.HospitalName, 
            sysId: systemSerialId
        });
        
        if (nrOfReplacementsDone >= 90) {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            
        } 
        else { 
            if  (nrOfReplacementsDone >= 65)  {
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
            }
            else
            {
               marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            }
        }
        
        marker.content = '<div class="infoWindowContent">' + info.City + ', ' + info.CountryName + '</BR>Nr of Material replacements:' + nrOfReplacementsDone + '</div>';      
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<b>' + marker.title + '</b></BR>' + marker.content);
            infoWindow.open($scope.map, marker);
            
            showMaterialPlacements(marker.sysId, info.HospitalName);
        });
        
        
        $scope.markers.push(marker);
    }; 
    
    var getNrOfMaterialPlacementsCreateMarker = function (custData, systemSerialId) {
        Materials.get(systemSerialId)
            .success(function(data) {
            
            console.log('received materialplacements for systemSerialId: ' + systemSerialId + ' nr of items: ' + data.length);
            createMarker(custData, data.length, systemSerialId);
        });
        

    };    
    
    var showMaterialPlacements = function (systemId, hospitalName) {
        Materials.get(systemId)
            .success(function(data) {
            
            console.log('received materialplacements for systemId: '  + systemId + ' nr of items: ' + data.length + 'creating table');
            var textTable = '<table class="table"><tr><th>MaterialNumber</th><th>Placed Date</th><th>Removed Date</th></tr>';
            
            var nrOfSystemMarkersOnMap = 0;
            var nrOfSystemsWithFRUReplacements = 0;
            for (var i = 0; i < data.length; i++){
                var materialPlacement = data[i];
                
                var placedDateStr = '-';
                if (materialPlacement.PlacedDate !== null)
                {
                    var d = new Date(materialPlacement.PlacedDate);
                    placedDateStr = d.toDateString() + ' ' + d.toTimeString();
                }
 
                var removedDateStr = '-';
                if (materialPlacement.RemovedDate !== null)
                {
                    removedDateStr = materialPlacement.RemovedDate.toDateString() + ' ' + materialPlacement.RemovedDate.toTimeString();
                } 
                
                textTable += '<tr><td>' + materialPlacement.MaterialNumber + '</td><td>' + placedDateStr + '</td><td>' + removedDateStr + '</td></tr>';
            }
           
            textTable += '</table>';
            divWidget = document.getElementById('customermaterialdata').innerHTML = '</BR></BR><p>Nr of materialplacements for hospital ' + hospitalName + ': ' + data.length + '</BR>' + textTable;
           
        });
        

    };
    
    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }; 
    
    getInfo();
}]);
