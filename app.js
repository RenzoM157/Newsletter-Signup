//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  var firstN = req.body.fName;
  var lastN = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: firstN,
         LNAME: lastN
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data); // converts a real life javascript object to flatpack json object

  var options = {
    url: "https://us3.api.mailchimp.com/3.0/lists/b48ceb19f2",
    method: "POST",
    headers: {
      "Authorization": "renzo1 02754c93a931237fb307cc6c8bc4d7c0-us3"
    },
    body: jsonData
  };

  request(options, function(error, response, body){

    if (error){
      res.sendFile(__dirname + "/failure.html");
    }
    else{
      if (response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });


});



app.post("/failure", function(req, res){
  res.redirect("/");
});



app.listen(process.env.PORT || port, function(){
  console.log("Server is running on port 3000");
});


// api key: 02754c93a931237fb307cc6c8bc4d7c0-us3

// list id: b48ceb19f2
