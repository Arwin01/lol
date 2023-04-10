const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");


});


app.post("/", function (req, res) {
    const url = "https://us21.api.mailchimp.com/3.0/lists/d1975523db";
    let firstName = req.body.FName;
    let lastName = req.body.LName;
    let email = req.body.Email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const options = {
        method: "POST",
        auth: "arwin:afdfsfaa3465f12aaabc408ca10f4788adf8e6bf-us21"
    }



    const request = https.request(url, options, function (response) {


        
    let status=response.statusCode;
    if(status===200){
       res.sendFile(__dirname+ "/sucess.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    };



        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    })
    request.write(jsonData);
    request.end();

    
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("server has started at 3000");
});