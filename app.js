const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

// post and get data
app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    //console.log(firstName + "   "+lastName+"   "+email);

    //  As we are going to send this data to mailchimp
    // we can send data to there servers in form of JSON
    // so we need to create JSON object
    // we create JSON object according to there valid properties

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
    // now data is js object not JSON, so we need to convert it into JSON
    const jsonData = JSON.stringify(data);

    // now our json data is ready we need to make request
    // - - Api Key
    // - - list number
    const url = "https://- - .api.mailchimp.com/3.0/lists/- - - "

    const options = {
        method: "POST",
        auth: "naqeeb:_ _ _-_ _"

    };

    const request = https.request(url, options, function (response) {

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }


        response.on("data", function (data) {
           // console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();

});
// failure button back to newsletter form
app.post("/failure",function(req, res){
    res.redirect("/");
    });
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running at port 3000");
});

