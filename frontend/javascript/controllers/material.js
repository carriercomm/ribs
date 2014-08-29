angular.module('ribs.controller.material', []).controller('MaterialController', ['$scope', '$routeParams', 'Materials', function($scope, $routeParams, Materials) {
    Materials.get($routeParams.materialID)
      .success(function(data) {
        $scope.materials = data;
      });
}]);
