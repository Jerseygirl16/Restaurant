const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const dbURL = process.env.DB_URI || "mongodb://localhost";



//Service Listeners  
var services = function(app){
app.post('/write-record', function(req, res){
  
    var data = {
        restaurantName: req.body.restaurantName,
        foodType: req.body.foodType,
        location: req.body.location,
        criticRating: req.body.criticRating,
        patronRating: req.body.patronRating
    };
    
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
        if(err){
            return res.status(200).send(JSON.stringify({msg: "Error:" + err}));
        }
        else{
            var dbo = client.db("restaurant");
            
            dbo.collection("resName").insertOne(data, function(err){
                if(err){
                    client.close();
                    return res.status(200).send(JSON.stringify({msg: "Error:" + err}));
                }
                else{
                    client.close();
                    return res.status(200).send(JSON.stringify({msg: "SUCCESS"}));
                }
            });
        }
    });
    });

app.get('/read-record', function(req, res){
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
        if(err){
            return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
        }
        else{
            var dbo = client.db("restaurant");
            
            dbo.collection("resName").find().toArray(function(err, data){
              if(err){
                  return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
              }
                else{
                  client.close();
                  return res.status(200).send(JSON.stringify({msg:"SUCCESS", resName: data}));
              }  
            });
        }
    });
});

app.get('/get-resByType', function(req, res){
    var foodType = req.query.foodType;
    var search = (foodType === "") ? {} : {foodType: foodType};
    var sortBy = {type: 1};
    
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
        if(err){
                return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
            }
            else{
                var dbo = client.db("restaurant");
                
                dbo.collection("resName").find(search).sort(sortBy).toArray(function(err, data){
                    if(err){
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                    }
                    else{
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:"SUCCESS", rest:data}));
                    }
                });
                 }
    });
});    
    
app.delete('/delete-record', function(req, res){
    var resID = req.query.resId;
    var r_id = new ObjectId(resID);
    var search = {_id: r_id};
    
    
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
        if(err){
            return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
        }
        else{
            var dbo = client.db("restaurant");
            
            dbo.collection("resName").deleteOne(search, function(err, data){
                if(err){
                    return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                }
                else{
                    client.close();
                    return res.status(200).send(JSON.stringify({msg:"SUCCESS"}));
                }
            });
        }
    });
    
  
});
    
app.put('/update-record', function(req, res){
    var resID = req.body.resId;
    var restaurantName = req.body.restaurantName;
    var foodType = req.body.foodType;
    var location = req.body.location;
    var critic = req.body.criticRating;
    var patron = req.body.patronRating;
    
     var r_id = new ObjectId(resID);
        
        var search = {_id: r_id};
        var updateData = {
            $set: {
                restaurantName: restaurantName,
                foodType: foodType, 
                location: location,
                criticRating: critic,
                patronRating: patron
            }
        }
        
        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
            if(err){
               return res.status(200).send(JSON.stringify({msg:"Error: " + err})); 
            }
            else{
               var dbo = client.db("restaurant");
                
                dbo.collection("resName").updateOne(search, updateData, function(err){
                    if(err){
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                    }
                    else{
                        client.close();
                       return res.status(200).send(JSON.stringify({msg:"SUCCESS"})); 
                    }
                });
            }
        });
});
};


module.exports = services;