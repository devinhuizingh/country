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
        var ctrl, scope, getCountryPromise, getCaptialPromise, getNeighborsPromise, deferred, route;
        beforeEach(inject(function($controller, $rootScope, $q, getCountry, getCapital, getNeighbors, $route) {
            
            scope = $rootScope.$new();
            deferred = $q.defer();
            route = $route;
            getCountryPromise = $q.when({
                      data: {
                      geonames: ['Washington']
                      }
                });
            getCapitalPromise = $q.when({
                      data: {
                      geonames: ['Ontario']
                      }
                });
            getNeighborsPromise = $q.when({
                      data: {
                      geonames: ['Mexico']
                      }
                });
            
            route.current = {
            params: { countryCode: 'US' } 
            };

            ctrl = $controller('countryCntrl', {
                $scope : scope,
                getCountry: function()  { return getCountryPromise },
                getCapital: function()  { return getCapitalPromise },
                getNeighbors: function()  { return getNeighborsPromise },
                $route:  route


            });
            
            
        }));                
        

        it('should have country data', function() {
              var handler = jasmine.createSpy('success');
              deferred.promise.then(handler);
              deferred.resolve();
              scope.$digest();
              expect(scope.response2).toBe('Washington');
              
             
        });
        it('should have country data', function() {
              var handler = jasmine.createSpy('success');
              deferred.promise.then(handler);
              deferred.resolve();
              scope.$digest();
              expect(scope.response3).toBe('Ontario');
             
        });
        it('should have country data', function() {
              var handler = jasmine.createSpy('success');
              deferred.promise.then(handler);
              deferred.resolve();
              scope.$digest();
              expect(scope.response4[0]).toBe('Mexico');
             
        });
        it('should set Route.current to US', function() {
              expect(scope.current).toBe('US');
        });


    });
    
});

describe("myApp", function() {
    beforeEach(module('myApp'));
    describe('countriesCntrl', function() {
        var ctrl, scope, jsonDataPromise, deferred;
        beforeEach(inject(function($controller, $rootScope, $q, jsonData) {
            
            scope = $rootScope.$new();
            deferred = $q.defer();
            jsonDataPromise = $q.when({
                      data: {
                      geonames: ['Panama']
                      }
                });
            

            ctrl = $controller('countriesCntrl', {
                $scope : scope,
                jsonData: function()  { return jsonDataPromise }
               
            });
            
            
        }));                
        

        it('should have country data', function() {
              var handler = jasmine.createSpy('success');
              deferred.promise.then(handler);
              deferred.resolve();
              scope.$digest();
              expect(scope.countries[0]).toBe('Panama');
              
             
        });
    });
});




// describe("myApp", function() {
//     beforeEach(module('myApp'));
//     describe('countryCntrl', function() {
//         var ctrl, scope, getCountryPromise;
//         beforeEach(inject(function($controller, $rootScope, $q, getCountry) {
            
// A            scope = $rootScope.$new();
//             scope.response2 = 'before';

// B            getCountryPromise = $q.when({
//                       data: {
//                       geonames: ['Washington']
//                       }
//                 });

// C            ctrl = $controller('countryCntrl', {
//                 $scope : scope,
// D                getCountry: function()  { return getCountryPromise; }

//             });
            
            
//         }));                
        

//         it('should have country data', function() {
            
// E            getCountryPromise.then(
// F              function(){
// F2              expect(scope.response2).toBe('Washington');
//               expect(ctrl.something).toBe('controller variable');
//             }
//               );

//         })
//     });
// });



