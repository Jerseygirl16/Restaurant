




/*function sortTable(){
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
    table = document.getElementById("restaurantTable");
    switching = true;
    
    while(switching){
        switching = false;
        rows = table.rows;
        
        for(i = 1; i < (rows.length -1); i++){
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            if(dir == "asc"){
              if(x.innerHTML.toLowerCase() > y.innerHtml.toLowerCase()){
                shouldSwitch = true;
                break;
            }
        }
            else if(dir == "desc"){
            if(x.innerHTML.toLowerCase() < y.innerHtml.toLowerCase()){
                switching=true; 
                break;
            }
         
            } 
        }
        if(shouldSwitch){
            rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            switching = true;
            switchCount++;
        }
        else{
            if(switchcount == 0 && dir == "asc"){
                dir = "desc";
                switching = true;
            }
        }
    }
}*/




//Retrieve the restaurant data and populate on page load

   /* $(document).ready(function(getRestaurantData){
                $("restaurantTable").tablesorter();
            });
    $(document).ready(function(getRestaurantData){
            $('#restaurantTable').tablesorter( {sortList: [[0,0], [1,0], [2,0]]});
        });*/

   /* $(document).ready(function(){
        $('th').each(function(col){
            $(this).hover(
            function(){
                $(this).addClass('focus');
            },
                function(){
                    $(this).removeClass('focus');
                });
                $(this).click(function(){
                    if ($(this).is('asc')){
                        $(this).removeClass('asc');
                        $(this).addClass('desc selected');
                        sortOrder = -1;
                    }
                    else{
                        $(this).addClass('asc selected');
                        $(this).removeClass('desc');
                        sortOrder = 1;
                    }
                    $(this).siblings().removeClass('asc selectd');
                    $(this).siblings().removeClass('desc selected');
                    var arrData = $('table').find('tbody > tr:has(td)').get(); 
                    arrData.sort(function(a,b){
                        var val1 = $(a).children('td').eq(col).text().toUpperCase();
                        var val2 = $(b).children('td').eq(col).text().toUpperCase();
                        if($.isNumberic(val1) && $.isNumeric(val2))
                            return sortOrder == 1 ? val1 - val2 : val2 - val1;
                        else
                            return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
                    });
                    $.each(arrData, function(index,row){
                        $('tbody').append(row);
                    });
                });
        });
    });*/
    
    
  /*  var tab = {"restaurantData[i].ID": "ID", "restaurantData[i].restaurantName": "restaurantName", "restaurantData[i].foodType": "foodType", "restaurantData[i].ocation": "locatoin", "restaurantData[i].criticRating": "criticRating", "restaurantData[i].patronRating": "patronRating"};
    
    var str = "";
    str += "ID: " + tab.restaurantData[i].ID + "/n";
    str += "restaurantName: " + tab.restaurantData[i].restaurantName + "/n";
    str += "foodType: " + tab.restaurantData[i].foodType + "/n";
    str += "location: " + tab.restaurantData[i].location + "/n";
    str += "criticRating: " + tab.restaurantData[i].criticRating + "/n";
    str += "patronRating: " + tab.restaurantData[i].patronRating + "/n";   
    
function sortResTable(restaurantData){
    return function(a,b) {
        if(a[restaurantData] > b[restaurantData]){
            return 1;
        }
        else if (a[restaurantData] < b[restaurantData]){
            return -1;
        }
        return 0;
    }
}
tab.sort(getSortOrder("restaurantName"));
    document.write("sorted Restaurant Names : ");
    for(var item in tab) {
        document.write("<br>" + tab[item].restaurantName);
    }
    
    tab.sort(getSortOrder("foodType"));
    document.write("<br><br> Sorted Food Types : ");
    for(var item in tab){
        document.write("<br>" + tab[item].foodType);
    }
    */


function getDisplayedLinks(){
    $.ajax({
        url:"http://localhost:5000/read-links",
        type: "get",
        success: function(response){
            var links = jQuery.parseJSON(response);
            getRestaurantData();
            activateSubmitButton();
        }
    });
}