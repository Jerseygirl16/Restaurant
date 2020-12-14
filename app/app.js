const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');

//const cors = require('cors');
//app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/client", express.static(path.resolve(__dirname + "/../client")));
   
//Make the server
var server;
var port = process.env.PORT || process.env.NODE_PORT || 5000;
  

//Router Listeners
var router = require('./router.js');
router(app);

//Service Listenrs
var services = require('./services.js');
services(app);

//App Listener
server = app.listen(port, function(err){
    if(err){
        throw err;
    }
    console.log("Listening on port " + port);
});