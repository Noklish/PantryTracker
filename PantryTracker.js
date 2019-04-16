//Make sure to double check all queries based on what pantry attributes are allowed to be NULL

const express = require('express');
const app = express();
const port = 3000;
var mysql = require('mysql');

var connection = mysql.createConnection({
	host:
	user:
	password:
	database:

});

//USER STORY 12
app.post('/user', (req, res, userName, pass, email) => {
	//TODO Generate UserID somehow to distinguish users
	//SQL autoincrement
	//var userID =
	connection.query('INSERT INTO userAccount VALUES (userName, pass, email)');
});

//USER STORY 12
app.get('/user/:userid', (req, res, User, Pass) => {
	connection.query('SELECT * FROM userAccount WHERE userName = ' + User + ' AND userPassword = ' + Pass,
		function(err, row) { 
		if(err) {/*go back to login page with error*/} 
		else {/*login successful, go to ho4mepage*/
				/*.query('SELECT * FROM ')*  TODO This should return relevant data needed for homepage*/
			 }
	});
});


//USER STORY 16
app.put('/passUpdate/:userid', (req, res, user, newPass) => {
	connection.query('UPDATE userAccount SET userPassword = ' + newPass + ' WHERE userName = ' + user);
});


//USER STORY 31
app.post('/user/:userid/pantry/add', (req, res, pID, uID, fName, fGroup, exDate, quant, desc, br) => {
	connection.query('INSERT INTO pantry VALUES (' + pID + ', ' + uID + ', ' + fName ', ' + fGroup ', ' + exDate ', ' + quant ', ' + desc + ', ' + br + ')');
});


//USER STORY 42 / 22
app.put('/user/:userid/pantry/item/quantity', (req, res, uID, fName, num) => {
	connection.query('UPDATE pantry SET quantity = ' + num + ' WHERE userID = ' + uID + ' AND foodName = ' + fName);  //42
	var a = .query('SELECT foodName, brand FROM pantry NATURAL JOIN favoriteFood WHERE userid = ' + uID + ' AND foodName = ' + fName + ' AND quantity = 0'); //22
	var b = .query('SELECT foodName FROM pantry WHERE userid = ' + uID + ' AND foodName = ' + fName + ' AND quantity = 0');
	var c = .query('SELECT quantity, minValue FROM pantry NATURAL JOIN favoriteFood WHERE userid = ' + uID + ' AND foodName = ' + fName);
	if(typeof a != undefined && a) {
		connection.query('INSERT INTO groceryList VALUES(' + fname + ', ' + a[0].brand + ', 1)');
		connection.query('DELETE FROM pantry WHERE userid = ' + uID + ' AND foodName = ' + fName);
	} else if(typeof b != undefined && b){
		connection.query('DELETE FROM pantry WHERE userid = ' + uID + ' AND foodName = ' + fName);
	} else if(c[0].quantity < c[0].minValue) {
		connection.query('INSERT INTO groceryList VALUES(' + fname + ', ' + a[0].brand + ', 1)');
	}
});


//USER STORY 42
app.put('/user/:userid/pantry/item/exDate', (req, res, uID, exDate) => {
	connection.query('UPDATE pantry SET expirationDate = ' + exDate + ' WHERE userID = ' + uID + ' AND foodName = ' + fName);
});

//USER STORY 42
app.delete('/user:userid/pantry/item', (req, res, uID, fName) => {
	connection.query('DELETE FROM pantry WHERE foodName = ' + fName + ' AND userId = ' + uID);
});

app.post('/user:userid/pantry/favorite', (req, res, fName, uID) => {
	connection.query('INSERT INTO favoriteFood VALUES (' + uID + ', ' + fName + ')');
});

//USER STORY 13
app.get('/user/:userid/groceryList', (req, res, uID) => {
	connection.query('SELECT * FROM groceryList WHERE userid = ' + uID);
});

//USER STORY 23 & 46
//ADD EXPIRATION DATE HERE
app.delete('user/:userid/groceryList/item', (req, res, uID, fName, fGroup, brand, quant) => { //Quantity either needs to be specified upon saying it was bought or it will be defaulted to 1
	connection.query('INSERT INTO pantry VALUES(' + uID + ', ' + fName + ', ' + fGroup + ', ' + brand + ', ' + quant + ')');
	connection.query('DELETE FROM groceryList WHERE foodName = ' + fName ' AND userID = ' + uID);
});

//USER STORY 18
app.post('user/:userid/groceryList', (req, res, uID, fName, b, quant) => {
	connection.query('INSERT INTO groceryList VALUES(' + uID + ', ' + fName + ', ' + b + ', ' + quant + ')');
});

//USER STORY 24
app.get('user/:userid/pantry/categories', (req, res, uID) => {
	connection.query('SELECT * FROM pantry WHERE userID = ' + uID + ' GROUP BY foodGroup');
});

//USER STORY 24
app.get('user/:userid/pantry', (req, res, uID) => {
	connection.query('SELECT * FROM pantry WHERE userID = ' + uID);
});

//USER STORY 30
app.get('user/:userid/pantry/exp', (req, res, uID) => {
	connection.query('SELECT * FROM pantry WHERE userID = ' + uID + 'ORDER BY (expirationDate) ASC');
});


app.get('user/:userid/recipes/ingredient', (req, res, uID, ingred) => {
	connection.query('SELECT * FROM recipes NATURAL JOIN recipeAssignments NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + ingred);
});

//Viewing list of recipes for a user
app.get('user/:userid/recipes', (req, res, uID) => {
	connection.query('SELECT recipeName FROM recipes WHERE userID =' + uID);
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
