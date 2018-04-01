var express = require('express');
var app = express();
var fs = require("fs");




// /owners   show all the owners
app.get('/owners', function (req, res) {
   fs.readFile( __dirname + "/" + "owners.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})





//  /owners/:ownerId/cars/:carId/plate modify the plate of a specific car of a specific owner
//This is an example of what you need to write in the body of the request: "4563AKL". Remember to set Content-Type: JSON
app.put('/owners/:ownerId/cars/:carId/plate', function(req,res){
    // First read existing users.
   fs.readFile( __dirname + "/" + "owners.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
    
    // initialize the body to get the data asynchronously
    req.body = "";
    // get the data of the body
    req.on('data', function (chunk) {
            req.body += chunk;
            //all data
            req.on('end', function () {
                // log request object
                console.log(req);
                
                
                for (i = 0; i <  data[req.params.ownerId].cars.length; i++) { 
                    if(data[req.params.ownerId].cars[i].carId == req.params.carId){
                       var index = i;
                    }
                    
                }
                data[req.params.ownerId].cars[index].plate = JSON.parse(req.body);
                
                
                console.log( data );
                fs.writeFile(__dirname + "/" + "owners.json", JSON.stringify(data), function (err) {
                    if (err) throw err;
                });
                res.end( JSON.stringify(data));
        
            });
       
   }); });
})

// /owners/:ownerId/places - add set of places to a specific owner
//This is an example of what you need to write in the body of the request: [{"placeName":"Ignition Auto Inc."},{"placeName":"Hank's Garage"}]. Remember to set Content-Type: JSON
app.post('/owners/:ownerId/places', function(req,res){
    // First read existing users.
   fs.readFile( __dirname + "/" + "owners.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
    
    // initialize the body to get the data asynchronously
    req.body = "";
    // get the data of the body
    req.on('data', function (chunk) {
            req.body += chunk;
            //all data
            req.on('end', function () {
                // log request object
                console.log(req);
                
                for(i = 0; i <  JSON.parse(req.body).length; i++){
                     data[req.params.ownerId].places.push(JSON.parse(req.body)[i]);
                }
               
                
                
                
                
                console.log( data );
                fs.writeFile(__dirname + "/" + "owners.json", JSON.stringify(data), function (err) {
                    if (err) throw err;
                });
                res.end( JSON.stringify(data));
        
            });
       
   }); });
})


// /owners/:ownerId/cars delete all the cars of a specific owner

app.delete('/owners/:ownerId/cars', function (req, res) {

   
   fs.readFile( __dirname + "/" + "owners.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data[req.params.ownerId].cars;
       
       console.log( data );
       fs.writeFile(__dirname + "/" + "owners.json", JSON.stringify(data), function (err) {
                    if (err) throw err;
                });
       res.end( JSON.stringify(data));
   });
})






var server = app.listen(8083,function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)

})