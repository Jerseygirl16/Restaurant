var app = angular.module("addRestaurantApp", []);

//Create a jQuery listener that waits for the user to enter submit
app.controller("addRestaurantCtrl", function($scope, $http){
    $scope.dataSubmit = function(){
        $http({
            method: "post",
            url: restaurantURL + '/write-record',
            data: { 
                "restaurantName": $scope.restaurantName,
                "foodType": $scope.foodType,
                "location": $scope.location,
                "criticRating": $scope.criticRating,
                "patronRating": $scope.patronRating
                  }
            
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                $scope.restaurantName = "";
                $scope.foodType = "";
                $scope.location = "";
                $scope.critic = "";
                $scope.patron = "";
                $scope.addResults = "Restaurant is Added!";
            }
            else{
                $scope.addResults = response.data.msg;
            }
            }, function(response){
                console.log(response);
        });
    };
});
