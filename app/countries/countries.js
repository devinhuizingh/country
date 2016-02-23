angular.module('myApp')
    .controller('countriesCntrl', [
        '$scope', 'jsonData', 
        function($scope, jsonData) {
        	//console.log("countries loaded")
            jsonData().then(
                function(response){
                    $scope.response=response.data.geonames;
                }
            )
        }
    ]);
    