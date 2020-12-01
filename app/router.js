const path = require("path");



//Router Listeners
var router = function(app){
app.get('/write-restaurant', function(req, res){
  res.status(200).sendFile(path.join(__dirname + '/../client/write-restaurant.html'));  
});

app.get('/browse-restaurant', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/browse-restaurant.html'));
});


app.get('/home', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/home.html'));
});
}

module.exports = router;