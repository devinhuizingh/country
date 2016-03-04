angular.module('myApp')
    

    .controller('countryCntrl', [
       '$scope', 'getCountry', '$route', '$routeParams', 'getCapital', 'jsonData', 'getNeighbors',  
        function($scope, getCountry, $route, $routeParams, getCapital, jsonData, getNeighbors) {
            getCountry().then(
                function(response2){
                    $scope.response2 =response2.data.geonames;
                    
                }
            )
            
            getCapital().then(
                function(response3){
                    $scope.response3=response3.data.geonames;
                    //console.log(response3.data.geonames[0])
                }
            )
            getNeighbors().then(
                function(response4){
                    $scope.response4=response4.data.geonames;
                    //console.log(response4.data.geonames);
                    //console.log(response4.data.geonames.length)
                }
            )
        $scope.current=$route.current.params.countryCode;
        //$scope.current="US"
          
        }
    ]);


