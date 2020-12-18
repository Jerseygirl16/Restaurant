var app = angular.module("browseApp", []);  



function createRestaurantTable(restaurantData){
    var tableHTML = "";
    
    for(var i=0; i<restaurantData.length; i++){
        tableHTML += "<tr>";
            tableHTML+= "<td>" + restaurantData[i]._id + "</td>";
            tableHTML+= "<td>" + restaurantData[i].restaurantName + "</td>";
            tableHTML+= "<td>" + restaurantData[i].foodType + "</td>";
            tableHTML+= "<td>" + restaurantData[i].location + "</td>";
            tableHTML+= "<td>" + restaurantData[i].criticRating + "</td>";
            tableHTML+= "<td>" + restaurantData[i].patronRating + "</td>";
            tableHTML+= "<td>" + "<button class='deleteButton' " + "data-id='" + restaurantData[i]._id + "'>DELETE!</button>" + "</td>";
        tableHTML+= "</tr>";
    }
    
    $('#restaurantTable').html(tableHTML);
    //activateDeleteButton();
}

app.controller('browseCtrl', function($scope, $http){
    $scope.rest = [];
    $scope.types = [];
    
    $scope.getRestaurantData = function(){        
        $http({
            method: "get", 
            url: restaurantURL + "/read-record"
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                $scope.rest = response.data.resName;
                $scope.types = getTypes(response.data.resName);
                $scope.selectedType = $scope.types[0];
            }
            else{
                console.log(response.data.msg);
            }
        }, function(response){
            console.log(response);
        });
    };
        $scope.getRestaurantData();
    
    $scope.redrawTable = function(){
    var foodType = $scope.selectedType.value;
    
        $http({
            method: "get", 
            url: restaurantURL + '/get-resByType',
            params: {foodType: foodType}
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                $scope.rest = response.data.rest;
            }
            else{
                console.log(response.data.msg);
            }
        }, function(response){
            console.log(response);
        });
    }
    
     $scope.deleteRes = function(resID){
            $http({
                method: "delete",
                url: restaurantURL + "/delete-record",
                params: {resId: resID}
            }).then(function(response){
                if(response.data.msg === "SUCCESS"){
                   $scope.redrawTable();
                }
                else{
                    console.log(response.data.msg);
                }
            }, function(response){
                console.log(response);
            });
     }
     
    $scope.editRes = function(resNumber){
        $scope.restaurantName = $scope.rest[resNumber].restaurantName;
        $scope.foodType = $scope.rest[resNumber].foodType;
        $scope.location = $scope.rest[resNumber].location;
        $scope.critic = $scope.rest[resNumber].criticRating;
        $scope.patron = $scope.rest[resNumber].patronRating;
        $scope.resID = $scope.rest[resNumber]['_id'];
        
        $scope.hideTable = true;
        $scope.hideForm = false;
    }
 
    $scope.updateRes = function(){
        $http({
            method: "put",
            url: restaurantURL + "/update-record",
            data: {
                resId: $scope.resID,
                restaurantName: $scope.restaurantName,
                foodType: $scope.foodType,
                location: $scope.location,
                criticRating: $scope.critic,
                patronRating: $scope.patron
            }
        }).then(function(response){
            if(response.data.msg === "SUCCESS"){
                $scope.redrawTable();
                $scope.closeForm();
            }
            else{
                console.log(response.data.msg);            
            }
        }, function(response){
            console.log(response);
        });
    }

    $scope.closeForm = function(){
        $scope.hideForm = true;
        $scope.hideTable = false;
        
        $scope.restaurantName = "";
        $scope.foodType = "";
        $scope.location = "";
        $scope.critic = "";
        $scope.patron = "";
        $scope.resId = "";
    }

});
function getTypes(restDataArray){
    var typeExists;
    
    var typesArray = [{value: "", display: "ALL"}];
    for(var i=0; i<restDataArray.length; i++){
        typeExists = typesArray.find(function(element){
            return element.value === restDataArray[i].foodType;
        });
        
        if(typeExists){
            continue;
        } 
        else{
            typesArray.push({value: restDataArray[i].foodType, display: restDataArray[i].foodType.toUpperCase()});
        }
    }
    
    return typesArray;
}