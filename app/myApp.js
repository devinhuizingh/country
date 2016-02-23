angular.module('myApp', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider){
        
        $routeProvider
                .when("/", {
                    templateUrl: "./home/home.html",
                    
                })
                .when("/countries", {
                    templateUrl: "./countries/countries.html",
                    controller: "countriesCntrl"
                })
                .when("/countries/:countryCode", {
                    templateUrl: "./country/country.html",
                    controller: 'countryCntrl',
                })
                .otherwise({
                    redirectTo: '/'
                });
        
    }])
    .factory("jsonData", function($http) {
        return function() {
            return $http({method: 'GET', url: 'http://api.geonames.org/countryInfoJSON?username=huizingh'});
        };
    })
    .factory("getCountry", function($http, $route) {
        return function() {
            return $http.get('http://api.geonames.org/countryInfoJSON?username=huizingh&country='+ $route.current.params.countryCode);

        };
    })
    .factory("getCapital", function($http, $route) {
        return function() {
            return $http.get('http://api.geonames.org/searchJSON?username=huizingh&maxRows=1&q=capital&&country='+ $route.current.params.countryCode);

        };
    })
     .factory("getNeighbors", function($http, $route) {
        return function() {
            return $http.get('http://api.geonames.org/neighboursJSON?country='+$route.current.params.countryCode+'&username=huizingh');

        };
    })
    
    


    
