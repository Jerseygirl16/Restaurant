const fs = require('fs');



var outputFile = './files/restaurant.txt';


//Service Listeners  
var service = function(app){
app.post('/write-record', function(req, res){
     var data =  req.body.data;
     
        console.log(data);
         
     if(fs.existsSync(outputFile)){
        data = "," + data;
};
    fs.appendFile(outputFile, data, function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send("SUCCESS");
        }
    });
});


app.get('/read-record', function(req, res){
    fs.readFile(outputFile, "utf8", function(err, data){
       if(err){
           res.send(err);
       } 
        else{
            data = "[" + data + "]";
            console.log(data);
            res.send(data);
        }
    });
});


app.delete('/delete-record', function(req, res){
    var ID = req.body.ID;
    
   fs.readFile(outputFile, "utf8", function(err, data){ 
    if(err){
           res.send(err);
       } 
        else{
            data = "[" + data + "]";
            
            var parsedData = JSON.parse(data);
            for(var i=0; i < parsedData.length; i++){
                if(ID === parsedData[i].ID){
                    parsedData.splice(i,1);
                    break;
                }
            }
            var dataString = JSON.stringify(parsedData); 
            var remove = dataString.substring(1, dataString.length - 1);
            fs.writeFile(outputFile, remove, function(err){
                if(err){
                    res.send(err);
                }
                else{
                    res.send("SUCCESS");
                }
            });
        }
    });
});

}

module.exports = service;