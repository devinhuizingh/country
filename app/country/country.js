angular.module('myApp')
    

    .controller('countryCntrl', [
       '$scope', 'getCountry', '$route', '$routeParams', 'getCapital', 'jsonData', 'getNeighbors',  
        function($scope, getCountry, $route, $routeParams, getCapital, jsonData, getNeighbors) {
            getCountry().then(
                function(response2){
                    $scope.response2 =response2.data.geonames[0];
                    
                });

            getCapital().then(
                function(response3){
                    $scope.response3=response3.data.geonames[0];
                    
                }
            )
            getNeighbors().then(
                function(response4){
                    $scope.response4=response4.data.geonames;
                    
                }
            )
           $scope.current=$route.current.params.countryCode;
                
        }

        
    ]);




//     .controller('countryCntrl', [
//        '$scope', 'getCountry', '$route', '$routeParams', 'getCapital', 'jsonData', 'getNeighbors',  
//         function($scope, getCountry, $route, $routeParams, getCapital, jsonData, getNeighbors) {
// G            getCountry()
// G2              .then(
// H                function(response2){
// H2                    $scope.response2 =response2.data.geonames[0];
                    
//                 });

//             this.something = 'controller variable';

//             // getCapital().then(
//             //     function(response3){
//             //         $scope.response3=response3.data.geonames[0];
//             //         //console.log(response3.data.geonames[0])
//             //     }
//             // )
//             // getNeighbors().then(
//             //     function(response4){
//             //         $scope.response4=response4.data.geonames;
//             //         //console.log(response4.data.geonames);
//             //         //console.log(response4.data.geonames.length)
//             //     }
//             // )
//             // $scope.current=$route.current.params.countryCode;
//             // //$scope.current="US"
          
            
// I        }

        
//     ]);
// A -> Finishes

// B -> getCountryPromise = a promise  (BP)  

// C -> Creates a controller, runs country.js code

//     G -> calls GetCountry()
//         D -> runs, returns getCountryPromise
//         G == BP
//     G2 -> .then -> Attaching H to BP

//               BP  has handlers [H]
//         javascript engine not free to do stuff yet, continue running current code

//     I -> finish function, return to calling function

// C -> finishes call, sets ctrl to result of countryCtrl init function    
// (F when it wasn't working because it ran before H)
// E -> .then on promise BP -> attaching F to BP

//               BP   has handlers [H, F]
//         javascript engine not free to do stuff yet, continue running current code

// Code finishes at end of file


// Javascript engine looks for deferreds that are resolved
// BP was resolved immediately after the $q.when call
// javascript engine sees that BP has handlers that haven't run, it runs handlers

// H -> runs
//   javascript engine removes H handler from BP
//               BP  has handlers [F]

// F -> runs
// F2 -> runs
// expect commands run              



//   javascript engine removes F handler from BP
//               BP  has handlers []
