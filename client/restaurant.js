//Create a jQuery listener that waits for the user to enter submit
function activateSubmitButton(){
    $('#data-submit').click(function(){
        var restaurantName = $('#restaurantName').val();
        var foodType = $('#foodType').val();
        var location = $('#location').val();
        var criticRating = $('#criticRating').val();
        var patronRating = $('#patronRating').val();
        
        var d = new Date();
        var ID = "lib" + d.getTime();
        
        var jsonString = JSON.stringify({ID: ID, restaurantName: restaurantName,foodType: foodType,location: location,criticRating: criticRating,patronRating: patronRating});
                                        
                                        
             $.ajax({
                url:"http://localhost:5000/write-record", 
                type: "post",
                data: {data: jsonString},
                success: function(response){
                        alert(response);
                    }, 
                        error: function(err){
                            alert(err);
                    }
            });                         
    });
}

//Retrieve the restaurant data and populate on page load
function getRestaurantData(){
    $.ajax({
      url:"http://localhost:5000/read-record", 
        type: "get",
        success: function(response){
            var data = jQuery.parseJSON(response);
            createRestaurantTable(data);
        }
    });
}

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
        tableHTML += "</tr>";
    }
    
    $('#restaurantTable').html(tableHTML);
}