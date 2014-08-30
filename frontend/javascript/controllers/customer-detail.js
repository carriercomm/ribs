angular.module('ribs.controller.customer-detail', []).controller('CustomerDetailController', ['$scope', '$routeParams', 'Customers', function($scope, $routeParams, Customers) {
    Customers.getCustomerDetail($routeParams.customerID)
      .success(function(data) {
        $scope.customer = data;
        
        console.log('Retrieved getCustomerDetail');        
        if ((data.customer.Location[0] === 0 && data.customer.Location[1] === 0) ||
           (data.customer.Location[0] === 40 && data.customer.Location[1] === 50))
        {            
            // now do a query
            var hospitalName = data.customer.HospitalName;
            var city = data.customer.City;
            var country = data.customer.CountryName;
            
            if (country !== "" && city !== "")
            {
                var placeForRequest = city + ", " + country;
                console.log("Location empty, performing request to get location: " + placeForRequest);                
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode( { 'address': placeForRequest } , function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                    var location = results[0].geometry.location;
                    console.log("the location is: " + location);
                    var lat = location.lat();
                    var longnr = location.lng();
                    var latlangnr = new Array(lat, longnr);
                    data.customer.Location = latlangnr;
                    Customers.update(data.customer);
                  } 
                  else {
                    console.log("Geocode was not successful for the following reason: " + status);
                  }
                });               
            
            

            }
         }
     });
}]);
