//testing factories
describe("jsonData", function() {
   beforeEach(module('myApp'));

   it("should query the backend when called",
   inject(function(jsonData, $rootScope, $httpBackend) {
   		$httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=huizingh').respond(200);
   		var status=false;
   		jsonData("testing").then(function() {
   			status=true;
   		});
   		$rootScope.$digest();
   		$httpBackend.flush();
   		expect(status).toBe(true);
   		$httpBackend.verifyNoOutstandingRequest();
    }));
});

describe("getCountry", function() {
   beforeEach(module('myApp')),
   
      
   it("should query the backend when called",
   inject(function(getCountry, $rootScope, $httpBackend, $route) {
   		$httpBackend.whenGET('./home/home.html').respond([])
         $route.current = {
            params: { countryCode: 'US' } 
            };

        $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=huizingh&country='+ $route.current.params.countryCode).respond(200);
   		var status=false;
   		getCountry("testing").then(function() {
   			status=true;
   		});
   		$rootScope.$digest();
   		$httpBackend.flush();
   		expect(status).toBe(true);
   		$httpBackend.verifyNoOutstandingRequest();
    }));

});

describe("getCapital", function() {
   beforeEach(module('myApp')),
   
      
   it("should query the backend when called",
   inject(function(getCapital, $rootScope, $httpBackend, $route) {
         $httpBackend.whenGET('./home/home.html').respond([])
         $route.current = {
            params: { countryCode: 'US' } 
            };

         $httpBackend.expect('GET', 'http://api.geonames.org/searchJSON?username=huizingh&maxRows=1&q=capital&&country='+ $route.current.params.countryCode).respond(200);
         var status=false;
         getCapital().then(function() {
            status=true;
         });
         $rootScope.$digest();
         $httpBackend.flush();
         expect(status).toBe(true);
         $httpBackend.verifyNoOutstandingRequest();
    }));

});

describe("getNeighbors", function() {
   beforeEach(module('myApp')),
   
      
   it("should query the backend when called",
   inject(function(getNeighbors, $rootScope, $httpBackend, $route) {
         $httpBackend.whenGET('./home/home.html').respond([])
         $route.current = {
            params: { countryCode: 'US' } 
            };

         $httpBackend.expect('GET', 'http://api.geonames.org/neighboursJSON?country='+$route.current.params.countryCode+'&username=huizingh').respond(200);
         var status=false;
         getNeighbors("testing").then(function() {
            status=true;
         });
         $rootScope.$digest();
         $httpBackend.flush();
         expect(status).toBe(true);
         $httpBackend.verifyNoOutstandingRequest();
    }));

});

describe("myApp", function() {
    beforeEach(module('myApp'));
    describe('countryCntrl', function() {
        var ctrl, scope, httpBackend, q, rootScope, gC, route;
        beforeEach(inject(function($controller, $rootScope, $httpBackend, $q, getCountry, $route) {
            $httpBackend.whenGET('./home/home.html').respond([]);

            $route.current = {
            params: { countryCode: 'US' } 
            };

            scope = $rootScope.$new();
            ctrl = $controller('countryCntrl', {
                $scope : scope
            });

            httpBackend = $httpBackend;
            q = $q;
            rootScope = $rootScope;
            gC = getCountry;
            route=$route;
            

            

            // react on that request Country
            httpBackend.whenGET('http://api.geonames.org/countryInfoJSON?username=huizingh&country='+$route.current.params.countryCode).respond({
                data: {
                    geonames: ["Washington"]
                }
            });

            // expect the actual request Capital
            httpBackend.expect('GET', 'http://api.geonames.org/searchJSON?username=huizingh&maxRows=1&q=capital&&country='+ $route.current.params.countryCode);

            // react on that request Captial
            httpBackend.whenGET('http://api.geonames.org/searchJSON?username=huizingh&maxRows=1&q=capital&&country='+ $route.current.params.countryCode).respond({
                data: {
                    geonames: ["Washington"]
                }
            });

            //expect the actual request Neighbors
            //httpBackend.expect('GET', 'http://api.geonames.org/searchJSON?username=huizingh&maxRows=1&q=capital&&country='+ $route.current.params.countryCode);

            // react on that request Neighbors
            httpBackend.whenGET('http://api.geonames.org/neighboursJSON?country='+$route.current.params.countryCode+'&username=huizingh').respond({
                data: {
                    geonames: ["Washington"]
                }
            });

        }));



        //it('should have current defined', function() {
        //    expect(scope.current).toBe("US");

            
        //});

        it('should call getCountry()', function() {
        // expect the actual request Country
            httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=huizingh&country='+route.current.params.countryCode);
        })

        it('should have country data', function() {
            //expect(scope.response2).toBeDefined()
            var data1;

              // set up a deferred
              var deferred = q.defer();
              // get promise reference
              var promise = deferred.promise;

              // set up promise resolve callback
              promise.then(function (response2) {
                data1 = response2.data;
              });

              gC().then(function(response2) {
                deferred.resolve(response2)
              });
              // force `$digest` to resolve/reject deferreds
             rootScope.$digest();
             httpBackend.flush();
              // make your actual test
              //expect(gC(data).then).toBeDefined();
              expect(scope.response2[0]).toBe('Washington');
              httpBackend.verifyNoOutstandingRequest();

        })
    });
});


  