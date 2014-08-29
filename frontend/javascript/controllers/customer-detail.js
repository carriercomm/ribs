angular.module('ribs.controller.customer-detail', []).controller('CustomerDetailController', ['$scope', '$routeParams', 'Customers', function($scope, $routeParams, Customers) {
    Customers.getCustomerDetail($routeParams.customerID)
      .success(function(data) {
        $scope.customer = data;
        
        console.log('Retrieved getCustomerDetail');        
        if (data.customer.Location[0] === 0 && data.customer.Location[1] === 0)
        {     
            console.log("Location empty");
            console.log('Location empty');                
            // now do a query
            var hospitalName = data.customer.HospitalName;
            var city = data.customer.City;
            var country = data.customer.CountryName;
            
            if (country !== "" && city !== "")
            {
                console.log('Performing request to get location');
                var placeForRequest = String(city) + ", " + String(country);
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode( { 'address': placeForRequest}, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                    var location = results[0].geometry.location;
                  
                    var latlangnr = [location.latitude, location.longitude];
                    data.customer.position = latlangnr;
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
