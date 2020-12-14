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
    activateDeleteButton();
}

getRestaurantData();

function getRestaurantData(){
//Retrieve the restaurant data and populate on page load
    $.ajax({
      url: restaurantURL + "/read-record", 
        type: "get",
        success: function(response){
            var data = JSON.parse(response);
            createRestaurantTable(data.resName);
        },
        error: function(err){
            alert(err);
        }

    });
}


function activateDeleteButton(){
    
$('.deleteButton').click(function(){
    var ID = this.getAttribute("data-id");

    $.ajax({
        url: restaurantURL + "/delete-record",
        type: "delete",
        data: {ID: ID },
        success: function(response){
            if(response = "SUCCESS"){
                getRestaurantData();
            }
            else{
                alert(response);
            }
        },
        error: function(err){
            alert(err);
        }
    });
});
}