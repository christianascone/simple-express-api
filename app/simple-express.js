var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

/**
 * Generates random users with (optional) given size.
 * A user is a json object with a numeric Id, a random name, a random email and
 * a random hex color (#RRGGBB)
 */
router.get("/users", function(req, res, next) {
  console.log("Request query");
  console.log(req.query);

  var count = req.query.size || 10;
  var values = [];
  for (var i = 0; i < count; i++) {
  	var email = randomString(5)+"@"+randomString(5)+".com";
  	var name = randomString(10);
  	//https://www.paulirish.com/2009/random-hex-color-code-snippets/
  	var color = getRandomColor();
  	color = color.toUpperCase();
  	values.push({id: i+1, name: name, email: email, colorHexCode: color});
  }

  res.json({success: 1, data: values});
});

/**
 * Generate a random hex color (#RRGGBB)
 * @return {String} The generated color's code
 */
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Generate a random string of given length
 * @param  {Integer} length Length of string to generate
 * @return {String}        Generated String
 */
function randomString(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

// BASE ROUTE
app.use("/api", router);


app.listen(port);
console.log("Server starts on port: " + port);
