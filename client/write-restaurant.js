var app = angular.module("addRestaurantApp", []);

//Create a jQuery listener that waits for the user to enter submit
app.controller("addRestaurantCtrl", function($scope, $http){
    $scope.dataSubmit = function(){
        $http({
            method: "post",
            url: "http://localhost:5000/write-record",
            data: { 
                "restaurantName": $scope.restaurantName,
                "foodType": $scope.foodType,
                "location": $scope.location,
                "criticRating": $scope.criticRating,
                "patronRating": $scope.patronRating
                  }
            
        }).then(function(response){
            if(response.data === "SUCCESS"){
                $scope.restaurantName = "";
                $scope.foodType = "";
                $scope.location = "";
                $scope.criticRating = "";
                $scope.patronRating = "";
                $scope.addResults = "Restaurant is Added!";
            }
            else{
                $scope.addResults = response.data;
            }
            }, function(response){
                console.log(response);
        });
    };
});
