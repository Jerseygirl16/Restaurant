var restaurants = [];
var activeRestaurants = 0;

var app = angular.module("viewRestaurantsApp", []);

app.controller("viewRestaurantsCtrl", function($scope, $http){
    $scope.obj = [];
    
    $scope.get_restaurants = function(){
        $http({
           method: "get",
            url: restaurantURL + '/read-record'
        }).then(function(response){
                restaurants = response.data.resName;
                $scope.obj = restaurants[activeRestaurants];
                $scope.showHide();
        }, function(response){
            console.log(response);
        });
    };
    $scope.get_restaurants();
    
    $scope.changeRecord = function(direction){
        activeRestaurants += direction;
        $scope.obj = restaurants[activeRestaurants];
        $scope.showHide();
    }
    
    $scope.showHide = function(){
        $scope.hidePrev = (activeRestaurants === 0) ? true : false;
        $scope.hideNext =(activeRestaurants === restaurants.length-1) ? true : false;
    }
});