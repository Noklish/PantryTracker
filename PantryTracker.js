//Make sure to double check all queries based on what pantry attributes are allowed to be NULL
const express = require('express');
const app = express();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const port = 9000;
var mysql = require('mysql');

var cors = require('cors');
app.use(cors());
app.options('*', cors());

var privateKey = fs.readFileSync('./private.key', 'utf8');
var publicKey = fs.readFileSync('./public.key', 'utf8');
var token;
var i = 'Pantry LLC'; //issuer
var s;
var a;
var payload = {
	data1: "Data 1"
};

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

 var verifyOptions; /*= {
 	issuer: i,
 	subject: s,
 	audience: a,
 	expiresIn: "12h",
 	algorithm: ["RS2568"]
 };*/

app.get('/', function (req, res){
        res.send('Nobody expects the spanish inquisition!\n');
});

var connection = mysql.createConnection({
	host: "ec2-18-208-170-68.compute-1.amazonaws.com",
    user: "admin",
    password: "abc123",
    port: '9000',
    database: "rdsdatabase.c1kuubgkyedt.us-east-1.rds.amazonaws.com"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.listen(port);
console.log('Listening on port', port);

/************CREATE ACCOUNT EPIC************/
//USER STORY 12
app.post('/user', (req, res/*userName, pass, email*/) => {
	console.log(typeof userName);
	var user = req.body.userName;
	var pass = req.body.pass;
	var email = req.body.email;
	var userName = "klfajl";
	connection.query('INSERT INTO userAccount VALUES(' + user + ', ' + pass + ', ' + email + ')');
	//connection.query('INSERT INTO userAccount VALUES(? ? ?)');
});

//USER STORY 16 - updating password
app.put('/passUpdate/:userid', (req, res, user, newPass) => {
	connection.query('UPDATE userAccount SET userPassword = ' + newPass + ' WHERE userName = ' + user);
});

//USER STORY 12
app.get('/user/:userid', (req, res, User, pass) => {
	var login = connection.query('SELECT * FROM userAccount WHERE userName = ' + User + ' AND userPassword = ' + Pass); 
		if(typeof login != undefined && login) {/*login successful, go to homepage*/
				/*.query('SELECT * FROM ')*  TODO This should return relevant data needed for homepage*/
				var s = login[0].userName; //subject
				var a = 'http://pantrytracker.com'; //audience

				var signOptions = {
					issuer: i,
					subject: s,
					audience: a,
					expiresIn: "12h",
					algorithm: "RS256"
				};

				verifyOptions = {
				 	issuer: i,
				 	subject: s,
				 	audience: a,
				 	expiresIn: "12h",
 					algorithm: ["RS256"]
 				};

				token = jwt.sign(payload, privateKey, signOptions);
				console.log("Token - " + token);
		} else {
				/*go back to login page with error*/
				return 0;
		}
});

/*******MANUALLY INPUT FOOD EPIC*******/
//USER STORY 31
app.post('/user/:userid/pantry/add', (req, res, pID, uID, fName, fGroup, exDate, quant, desc, br) => {
	var food = connection.query('SELECT * FROM FoodItem WHERE foodName = ' + fName + ' AND brand = ' + br + " AND foodGroup = " + fGroup);
	if(typeof food != undefined && food) {
		connection.query('INSERT INTO pantry VALUES(' + uID + ', ' + pID + ', ' + food[0].foodID + ', ' + exDate + ', ' + quant + ')');
	} else {
		connection.query('INSERT INTO foodItem VALUES(' + fName + ', ' + fGroup + ', ' + br + ', ' + ')');
		var id = connection.query('SELECT foodID FROM foodItem WHERE foodName = ' + fName + ' AND foodGroup = ' + fGroup + ' AND brand = ' + br);
		connection.query('INSERT INTO pantry VALUES(' + uID + ', ' + pID + ', ' + id + ', ' + exDate + ', ' + quant + ')');
	}	
});



//USER STORY 42
app.put('/user/:userid/pantry/item/exDate', (req, res, uID, fName, br, exDate) => {
	connection.query('UPDATE pantry NATURAL JOIN foodItem SET expirationDate = ' + exDate + ' WHERE userID = ' + uID + ' AND foodName = ' + fName + ' AND brand = ' + br);
});

//USER STORY 42
app.delete('/user:userid/pantry/item', (req, res, uID, fName) => {
	connection.query('DELETE FROM pantry NATURAL JOIN foodItem WHERE foodName = ' + fName + ' AND userID = ' + uID);
});

/*******TRACK FOOD EPIC*******/
//USER STORY 24
app.get('user/:userid/pantry/categories', (req, res, uID) => {
	connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' GROUP BY foodGroup');
});

//USER STORY 24
app.get('user/:userid/pantry', (req, res, uID) => {
	connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID);
});

//USER STORY 30
app.get('user/:userid/pantry/exp', (req, res, uID) => {
	connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + 'ORDER BY (expirationDate) ASC');
});

/*******FILTER FOOD EPIC*******/

/*******SHOPPING RECOMMENDATIONS EPIC*******/

/*******RECIPE RECOMMENDATIONS EPIC*******/
//Viewing list of recipes for a user
app.get('user/:userid/recipes', (req, res, uID) => {
	connection.query('SELECT recipeName FROM recipes WHERE userID =' + uID);
});

/*******GROCERY LIST EPIC********/
//USER STORY 13
app.get('/user/:userid/groceryList', (req, res, uID) => {
	connection.query('SELECT * FROM groceryList NATURAL JOIN foodItem WHERE userID = ' + uID);
});

//USER STORY 18
app.post('user/:userid/groceryList', (req, res, uID, fName, fGroup, b, quant) => {
	var item = connection.query('SELECT * FROM foodItem WHERE foodName = ' + fName + ' AND brand = ' + br + " AND foodGroup = " + fGroup + ')');
	if(typeof item != undefined && item) {
		connection.query('INSERT INTO groceryList VALUES(' + uID + ', ' + item[0].foodID + ', ' + quant + ')');
	} else {
		connection.query('INSERT INTO foodItem VALUES(' + fName + ', ' + fGroup + ', ' + b + ', ' + quant + ', ' + ')');
		var newItem = connection.query('SELECT * FROM foodItem WHERE foodName = ' + fName + ' AND brand = ' + br + " AND foodGroup = " + fGroup + ')');
		connection.query('INSERT INTO groceryList VALUES(' + uID + ', ' + newItem[0].foodID + ', ' + quant + ')');
	}
});

//USER STORY 42 / 22
app.put('/user/:userid/pantry/item/quantity', (req, res, uID, fName, br, num) => {
	var item = connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + fName + ' AND brand = ' + br);
	connection.query('UPDATE pantry SET quantity = ' + num + ' WHERE userID = ' + uID + ' AND foodID = ' + item[0].foodID);  //42
	var a = connection.query('SELECT foodName, brand FROM pantry NATURAL JOIN favoriteFood NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + fName + ' AND quantity = 0'); //22
	var b = connection.query('SELECT foodName FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + fName + ' AND quantity = 0');
	var c = connection.query('SELECT quantity, minValue FROM pantry NATURAL JOIN favoriteFood NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + fName);
	if(typeof a != undefined && a) {
		connection.query('INSERT INTO groceryList (userID, foodID, quantity) VALUES(' + uID + ', ' + a[0].foodID + ', ' + a[0].brand + ', 1)');
		connection.query('DELETE FROM pantry WHERE userID = ' + uID + ' AND foodID = ' + a[0].foodID);
	} else if(typeof b != undefined && b){
		connection.query('DELETE FROM pantry WHERE userID = ' + uID + ' AND foodID = ' + b[0].foodID);
	} else if(typeof c != undefined && c && c[0].quantity < c[0].minValue) {
		connection.query('INSERT INTO groceryList (userID, foodID, quantity) VALUES('uID + ', ' + c[0].foodID + ', 1)');
	}
});

//USER STORY 23 & 46
//ADD EXPIRATION DATE HERE? (not in grocerylist)
app.delete('user/:userid/groceryList/item', (req, res, uID, fName, fGroup, brand, quant) => { //Quantity either needs to be specified upon saying it was bought or it will be defaulted to 1
	var item1 = connection.query('SELECT * FROM groceryList NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + fName + ' AND brand = ' + brand);
	var item2 = connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + fName + ' AND brand = ' + brand);
	

	connection.query('INSERT INTO pantry (userID, foodID, quantity) VALUES(' + uID + ', ' + item2[0].foodID + ', ' + brand + ', ' + quant + ')');
	connection.query('DELETE FROM groceryList WHERE foodID = ' + item1[0].foodID + ' AND userID = ' + uID);
});

//insert a food into favorited food table
app.post('/user:userid/pantry/favorite', (req, res, fID, uID) => {
	connection.query('INSERT INTO favoriteFood VALUES(' + uID + ', ' + fID + ')');
});


/*******ENTER CUSTOM RECIPE*******/

//Searching for recipes based on an ingredient
app.get('user/:userid/recipes/ingredient', (req, res, uID, ingred) => {
	connection.query('SELECT * FROM recipes NATURAL JOIN recipeAssignments NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + ingred);
});


//search / select recipe based on the recipe name
app.get('user/:userid/recipes/recipe', (req, res, uID, recipeName) => {
	connection.query('SELECT * FROM recipe NATURAL JOIN recipeAssignments NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND recipeName = ' + recipeName);
});

//INSERT RECIPE INGREDIENTS FIGURE OUT HOW TO ARRAY THING
app.post('user/:userid/recipes/recipe', (req, res, uID, recipeName, meal, ingredients, procedure) => {
	connection.query('INSERT INTO recipes (userID, recipeName, meal, steps) VALUES(' + uID + ', ' + recipeName + ', ' + meal + ', ' + procedure + ')');
	var recipe = connection.query('SELECT * FROM recipes WHERE userID = ' + uID + ' AND recipeName = ' + recipeName + ' AND procedure = ' + procedure);
	for(int j = 0; j < ingredients.length; j++){
		var fd = connection.query('SELECT * FROM foodItem NATURAL JOIN pantry WHERE foodName = ' + ingredients[0] + ' AND userID = ' + uID);
		if(typeof fd != undefined && fd) {
			//Ljlkfa dlkLKSDJKLFDSLFS FINISH ingredient quantities
			connection.query('INSERT INTO recipeAssignments (recipeID, foodID, quantity) VALUES(' + recipe[0].recipeID + ', ' + fd[0].foodID + ', ' + ')');
		} else {
			//LKFJ DLKFJ SDLFJSDLKFSJ DLKFSDFINISH brand / food group & brand for ingredients that aren't already in foodItem table
			connection.query('INSERT INTO foodItem (foodName) VALUES(' + ingredients[j] + ')');
		}
	}
});

//Update recipes as users edit them
app.put('user/:userid/recipes/recipe', (req, res, uID, recipeName, meal, ingredients, procedure) => {
	connection.query('');
});
