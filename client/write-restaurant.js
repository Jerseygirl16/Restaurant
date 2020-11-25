//Create a jQuery listener that waits for the user to enter submit
    $('#data-submit').click(function(){
        var restaurantName = $('#restaurantName').val();
        var foodType = $('#foodType').val();
        var location = $('#location').val();
        var criticRating = $('#criticRating').val();
        var patronRating = $('#patronRating').val();
        
        var d = new Date();
        var ID = "res" + d.getTime();
        
        var jsonString = JSON.stringify({ID: ID, restaurantName: restaurantName, foodType: foodType, location: location, criticRating: criticRating, patronRating: patronRating});
                                        
                                        
             $.ajax({
                url: restaurantURL + "/write-record", 
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
