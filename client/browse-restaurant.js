function createRestaurantTable(restaurantData){
    var tableHTML;
    
    for(var i=0; i<restaurantData.length; i++){
        tableHTML += "<tr>";
            tableHTML+= "<td>" + restaurantData[i].ID + "</td>";
            tableHTML+= "<td>" + restaurantData[i].restaurantName + "</td>";
            tableHTML+= "<td>" + restaurantData[i].foodType + "</td>";
            tableHTML+= "<td>" + restaurantData[i].location + "</td>";
            tableHTML+= "<td>" + restaurantData[i].criticRating + "</td>";
            tableHTML+= "<td>" + restaurantData[i].patronRating + "</td>";
            tableHTML+= "<td class='deleteButton'>" +"<button data-id='" + restaurantData[i].ID + "'>DELETE!</button>" + "</td>";
        tableHTML+= "</tr>";
    }
    
    $('#restaurantTable1').html(tableHTML);
}

getRestaurantData();

function getRestaurantData(){
//Retrieve the restaurant data and populate on page load
    $.ajax({
      url: restaurantURL + "/read-record", 
        type: "get",
        success: function(response){
            var data = JSON.parse(response);
            createRestaurantTable(data);
        }

    });
}
$('.deleteButton').click(function(){
    var ID = this.getAttribute("data-id");

$.ajax({
    url: restaurantURL + "/delete-record",
    type: "delete",
    data: {ID: ID },
    success: function(response){
       if(response = "SUCCESS")
        var remove = JSON.parse(response);
        getRestaurantData();
    }
});
});