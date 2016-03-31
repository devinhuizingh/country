angular.module('myApp')
    .controller('countriesCntrl', [
        '$scope', 'jsonData', 
        function($scope, jsonData) {
        	jsonData().then(
                function(response){
                    $scope.countries=response.data.geonames;
                    $scope.response=response.data.geonames;
                }
            )
        }
    ]);
    