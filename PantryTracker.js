//Make sure to double check all queries based on what pantry attributes are allowed to be NULL

const express = require('express');
const app = express();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const port = 9000;
var mysql = require('mysql');

var privateKey = fs.readFileSync('./private.key', 'utf8');
var publicKey = fs.readFileSync('./public.key', 'utf8');
var token;
var i = 'Pantry LLC'; //issuer
//var s = '';
//var a = '';
var payload = {
	data1: "Data 1"
};

// var verifyOptions = {
// 	issuer: i,
// 	subject: s,
// 	audience: a,
// 	expiresIn: "12h",
// 	algorithm: ["RS256"]
// };

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
app.post('/user', (req, res, userName, pass, email) => {
	connection.query('INSERT INTO userAccount VALUES (userName, pass, email)');
});

//USER STORY 16 - updating password
app.put('/passUpdate/:userid', (req, res, user, newPass) => {
	connection.query('UPDATE userAccount SET userPassword = ' + newPass + ' WHERE userName = ' + user);
});

//USER STORY 12
app.get('/user/:userid', (req, res, User, Pass) => {
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
		connection.query('INSERT INTO pantry VALUES (' + uID + ', ' + pID + ', ' + food[0].foodID + ', ' + exDate + ', ' + quant + ')');
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
	connection.query('DELETE FROM pantry NATURAL JOIN foodItem WHERE foodName = ' + fName + ' AND userId = ' + uID);
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
	connection.query('SELECT * FROM groceryList NATURAL JOIN foodItem WHERE userid = ' + uID);
});

//USER STORY 18 FINISHsldjf alkfjslkafjlkskd fldsak jflkaj fdldas lkal fdla 
app.post('user/:userid/groceryList', (req, res, uID, fName, b, quant) => {
	var item = connection.query('SELECT * FROM foodItem WHERE foodName = ' + fName + ' AND brand = ' + br + " AND foodGroup = " + fGroup + ')');
	connection.query('INSERT INTO groceryList VALUES(' + uID + ', ' + fName + ', ' + b + ', ' + quant + ')');
});

//USER STORY 42 / 22
app.put('/user/:userid/pantry/item/quantity', (req, res, uID, fName, num) => {
	connection.query('UPDATE pantry SET quantity = ' + num + ' WHERE userID = ' + uID + ' AND foodName = ' + fName);  //42
	var a = connection.query('SELECT foodName, brand FROM pantry NATURAL JOIN favoriteFood WHERE userid = ' + uID + ' AND foodName = ' + fName + ' AND quantity = 0'); //22
	var b = connection.query('SELECT foodName FROM pantry WHERE userid = ' + uID + ' AND foodName = ' + fName + ' AND quantity = 0');
	var c = connection.query('SELECT quantity, minValue FROM pantry NATURAL JOIN favoriteFood WHERE userid = ' + uID + ' AND foodName = ' + fName);
	if(typeof a != undefined && a) {
		connection.query('INSERT INTO groceryList VALUES(' + fname + ', ' + a[0].brand + ', 1)');
		connection.query('DELETE FROM pantry WHERE userid = ' + uID + ' AND foodName = ' + fName);
	} else if(typeof b != undefined && b){
		connection.query('DELETE FROM pantry WHERE userid = ' + uID + ' AND foodName = ' + fName);
	} else if(c[0].quantity < c[0].minValue) {
		connection.query('INSERT INTO groceryList VALUES(' + fname + ', ' + a[0].brand + ', 1)');
	}
});

//USER STORY 23 & 46
//ADD EXPIRATION DATE HERE
app.delete('user/:userid/groceryList/item', (req, res, uID, fName, fGroup, brand, quant) => { //Quantity either needs to be specified upon saying it was bought or it will be defaulted to 1
	connection.query('INSERT INTO pantry VALUES(' + uID + ', ' + fName + ', ' + fGroup + ', ' + brand + ', ' + quant + ')');
	connection.query('DELETE FROM groceryList WHERE foodName = ' + fName + ' AND userID = ' + uID);
});

app.post('/user:userid/pantry/favorite', (req, res, fName, uID) => {
	connection.query('INSERT INTO favoriteFood VALUES (' + uID + ', ' + fName + ')');
});


/*******ENTER CUSTOM RECIPE*******/
app.get('user/:userid/recipes/ingredient', (req, res, uID, ingred) => {
	connection.query('SELECT * FROM recipes NATURAL JOIN recipeAssignments NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + ingred);
});



app.get('user/:userid/recipes/recipe', (req, res, uID, recipeName) => {
	connection.query('SELECT * FROM recipe NATURAL JOIN recipeAssignments NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND recipeName = ' + recipeName);
});

//INSERT RECIPE INGREDIENTS FIGURE OUT HOW TO ARRAY THING
app.post('user/:userid/recipes/recipe', (req, res, uID, recipeName, meal, ) => {

});

//Update recipes as users edit them
app.put('user/:userid/recipes/recipe', (req, res, uID, recipeName) => {
	connection.query('');
});
