var express = require("express");
var bodyParser = require("body-parser");
var path = require ("path");

var app = express();

var PORT = process.env.PORT || 8000;

//Serving static css for deployment to heroku
app.use(express.static(__dirname + "/app/public/"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


var apiRoutes = require("./app/routing/apiRoutes.js");
var htmlRoutes = require("./app/routing/htmlRoutes.js");

apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});