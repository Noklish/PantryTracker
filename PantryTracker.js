//Make sure to double check all queries based on what pantry attributes are allowed to be NULL
const express = require('express');
const app = express();
const port = 9000;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
const session = require('express-session');

const expression = {
	secret: 'my express secret',
	resave: true,
	saveUninitialized: true
}

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(expsession));
var privateKey = fs.readFileSync('./private.key', 'utf8');
var publicKey = fs.readFileSync('./public.key', 'utf8');
var token;
var i = 'Pantry LLC'; //issuer
var s;
var a;
var payload = {
	data1: "Data 1"
};

//CORS lite Setup
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

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
//USER STORY 12 - account creation
app.post('/user', (req, res/*userName, pass, email*/) => {
	var user = req.body.userName;
	var pass = req.body.pass;
	var email = req.body.email;
	connection.query('INSERT INTO userAccount (userPassword, userName, email) VALUES(?, ?, ?)', [pass, user, email], function(err, result){
		if(err) throw err;
		else {
			res.send("user successfully added!");
		}
	});
	// + user + ', ' + pass + ', ' + email + ')'
	//connection.query('INSERT INTO userAccount VALUES(? ? ?)');
});

//user story 12 - account login
app.post('/user/login', (req, res) => {
	var email = req.body.email;
	var pass = req.body.userPassword;
	if(req.session.loggedin) {
		res.send("You're already logged in");
	} else {
		if(email && pass) {
			connection.query('SELECT * FROM userAccount WHERE email = ? AND userPassword = ?', [email, pass],
				function(err, results, fields) {
					if(results.length > 0) {
						req.session.loggedin = true;
						req.session.email = email;
						req.send("Welcome back, " + email);
					} else {
						res.status(400).send('Incorrect Username or Password.');
						req.session.loggedin = false;
					} //end inner-inner-else
					res.end();
				}); //end function
		} else {
			res.send("Please enter your username and password!");
			res.end();
		} //end inner-if
	}
});

//Logging Out
app.get('/user/logout', (req, res) => {
	if(req.session.loggedin) {
		req.session.destroy();
		res.send("Successfully Logged Out. Goodbye!");
	} else {
		res.send("You either didn't log-in or something went very, very, very wrong");
	}
});

//USER STORY 16 - updating password
app.put('/:userid/passUpdate', (req, res/*, user, newPass*/) => {
	var user = req.body.userName;
	var pass = req.body.pass;
	var newPass = req.body.newPass;
	var a = connection.query('SELECT * FROM userAccount WHERE userName = ? AND userPassword = ?' [user, pass], function(err, result) { if(err) throw err; });
	if(typeof a != undefined && a) {
		connection.query('UPDATE userAccount SET userPassword = ? WHERE userName = ?', [newPass, user],
		function(err, result) {
			if(err) throw err;
			res.send("Password Change Successful");
		});
	} else {
		res.send("The original password you entered for this user is incorrect");
	}
	
	//connection.query('UPDATE userAccount SET userPassword = ' + newPass + ' WHERE userName = ' + user);
});

//USER STORY 12
// app.get('/user/:userid', (req, res, User, pass) => {
// 	var login = connection.query('SELECT * FROM userAccount WHERE userName = ' + User + ' AND userPassword = ' + pass); 
// 		if(typeof login != undefined && login) {/*login successful, go to homepage*/
// 				/*.query('SELECT * FROM ')*  TODO This should return relevant data needed for homepage*/
// 				var s = login[0].userName; //subject
// 				var a = 'http://pantrytracker.com'; //audience

// 				var signOptions = {
// 					issuer: i,
// 					subject: s,
// 					audience: a,
// 					expiresIn: "12h",
// 					algorithm: "RS256"
// 				};

// 				verifyOptions = {
// 				 	issuer: i,
// 				 	subject: s,
// 				 	audience: a,
// 				 	expiresIn: "12h",
//  					algorithm: ["RS256"]
//  				};

// 				token = jwt.sign(payload, privateKey, signOptions);
// 				console.log("Token - " + token);
// 		} else {
// 				/*go back to login page with error*/
// 				return 0;
// 		}
// });

/*******MANUALLY INPUT FOOD EPIC*******/
//USER STORY 31
app.post('/user/:userid/pantry/add', (req, res/*, pID, uID, fName, fGroup, exDate, quant, desc, br*/) => {
	var uID = req.body.uID;
	var fName = req.body.fName;
	var exDate = req.body.exDate;
	var quant = req.body.quant;
	var desc = req.body.desc;
	var br = req.body.br;

	var food = connection.query('SELECT * FROM FoodItem WHERE foodName = ' + fName + ' AND brand = ' + br + " AND foodGroup = " + fGroup, function(err, results) {
		if(err) throw err;
	});
	if(typeof food != undefined && food) {
		connection.query('INSERT INTO pantry (userID, foodID, expirationDate, quantity) VALUES(' + uID + ', ' + food[0].foodID + ', ' + exDate + ', ' + quant + ')', function(err, results) {
			if(err) throw err;
		});
	} else {
		connection.query('INSERT INTO foodItem  (foodName, foodGroup, brand) VALUES(' + fName + ', ' + fGroup + ', ' + br + ', ' + ')', function(err, results) {
			if(err) throw err;
		});
		var id = connection.query('SELECT foodID FROM foodItem WHERE foodName = ' + fName + ' AND foodGroup = ' + fGroup + ' AND brand = ' + br, function(err, results) {
			if(err) throw err;
		});
		connection.query('INSERT INTO pantry (userID, foodID, expirationDate, quantity) VALUES(' + uID + ', ' + id + ', ' + exDate + ', ' + quant + ')', function(err, results) {
			if(err) throw err;
		});
	}	
});



//USER STORY 42
app.put('/user/:userid/pantry/item/exDate', (req, res/*, uID, fName, br, exDate*/) => {
	var uID = req.body.uID;
	var fName = req.body.fName;
	var br = req.body.br;
	var exDate = req.body.exDate;
	var fid = connection.query('SELECT foodID FROM foodItem NATURAL JOIN pantry WHERE userID = ? AND foodName = ? AND brand = ?', [uID, fName, br], function(err, results) {
		if(err) throw err;
	});
	if(typeof fid != undefined && fid) {
		connection.query('UPDATE pantry SET expirationDate = ' + exDate + ' WHERE userID = ' + uID + ' AND foodID = ' + fid + ' AND brand = ' + br, function(err, results) {
			if(err) throw err;
		});
	}
});

app.put('/user/:userid/pantry/item/foodGroup', (req, res) => {
	var uID = req.body.uID;
	var fID = req.body.fID;
	var newFG = req.body.newFG;

	connection.query('UPDATE foodItem SET foodGroup = ' + newFG + ' WHERE foodID = ' + fID, function(err, results) {
		if(err) { res.send("Something went wrong updating that item"); }
	});
}); 

//USER STORY 42 - remove item from pantry
app.delete('/user/:userid/pantry/:item', (req, res/*, uID, fName*/) => {
	var fName = req.params.item;
	var uID = req.params.uID;
	var fid = connection.query('SELECT foodID FROM pantry INNER JOIN foodItem ON pantry.foodID = foodItem.foodID WHERE userID = ? AND foodName = ?', [uID, fName],
		function(err, result) {
			if(err) throw err;
		});
	connection.query('DELETE FROM pantry WHERE foodID = ' + fid + ' AND userID = ' + uID, function(err, results) {
		if(err) throw err;
		else res.send("successfully removed " + fName + " from your pantry");
	});

});

/*******TRACK FOOD EPIC*******/

//USER STORY 24
app.get('/user/:userid/pantry', (req, res/*, uID*/) => {
	var uID = req.params.userid;
	connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID, function(err, results) {
		if(err) throw err;
		else { res.send(JSON.parse(JSON.stringify(results))); }
	});
});

//USER STORY 24
app.get('/user/:userid/pantry/categories', (req, res/*, uID*/) => {
	var uID = req.params.userid;
	connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' GROUP BY foodGroup', function(err, results) {
		if(err) throw err;
		else { res.send(JSON.parse(JSON.stringify(results))); }
	});
});

//USER STORY 30
app.get('/user/:userid/pantry/exp', (req, res/*, uID*/) => {
	var uID = req.params.userid;
	connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + 'ORDER BY (expirationDate) ASC', function(err, results) {
		if(err) throw err;
		else { res.send(JSON.parse(JSON.stringify(results))); }
	});
});

/*******FILTER FOOD EPIC*******/

/*******SHOPPING RECOMMENDATIONS EPIC*******/

/*******RECIPE RECOMMENDATIONS EPIC*******/
//USER STORY 11 - Viewing list of recipes for a user
app.get('/user/:userid/recipes', (req, res/*, uID*/) => {
	var uID = req.params.userid;
	connection.query('SELECT recipeName FROM recipe WHERE userID =' + uID, function(err, results) {
		if(err) throw err;
		else { res.send(JSON.parse(JSON.stringify(results))); }
	});
});

/*******GROCERY LIST EPIC********/
//USER STORY 13
app.get('/user/:userid/groceryList', (req, res/*, uID*/) => {
	var uID = req.params.userid;
	connection.query('SELECT * FROM groceryList NATURAL JOIN foodItem WHERE userID = ' + uID, function(err, results) {
		if(err) throw err;
		else { res.send(JSON.parse(JSON.stringify(results))); }
	});
});

//USER STORY 18
app.post('/user/:userid/groceryList', (req, res/*, uID, fName, fGroup, br, quant*/) => {
	var uID = req.body.uID;
	var fName = req.body.fName;
	var fGroup = req.body.fGroup;
	var br = req.body.br;
	var quant = req.body.quant;
	var fid = connection.query('SELECT foodID FROM foodItem WHERE foodName = ' + fName + ' AND brand = ' + br + " AND foodGroup = " + fGroup, function(err, results) {
		if(err) throw err;
	});
	if(typeof fid != undefined && fid) {
		connection.query('INSERT INTO groceryList (userID, foodID, quantity) VALUES(' + uID + ', ' + fid[0] + ', ' + quant + ')', function(err, results) {
			if(err) throw err;
			else {
				res.send("Added " + fName + " to your grocery list");
			}
		});
	} else {
		connection.query('INSERT INTO foodItem (foodName, foodGroup, brand) VALUES(' + fName + ', ' + fGroup + ', ' + br + ', ' + quant + ')', function(err, results) {
			if(err) throw err;
		});
		var newItem = connection.query('SELECT * FROM foodItem WHERE foodName = ' + fName + ' AND brand = ' + br + " AND foodGroup = " + fGroup, function(err, results) {
			if(err) throw err;
		});
		connection.query('INSERT INTO groceryList (userID, foodID, quantity) VALUES(' + uID + ', ' + newItem[0].foodID + ', ' + quant + ')', function(err, results) {
			if(err) throw err;
			else res.send("");
		});
	}
});

//USER STORY 42 / 22
app.put('/user/:userid/pantry/item/quantity', (req, res/*, uID, fName, br, num*/) => {
	var uID = req.body.uID;
	var fName = req.body.fName;
	var br = req.body.br;
	var num = req.body.num;
	var item = connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + fName + ' AND brand = ' + br, function(err, results) {
		if(err) throw err;
	});
	connection.query('UPDATE pantry SET quantity = ' + num + ' WHERE userID = ' + uID + ' AND foodID = ' + item[0].foodID, function(err, results) {
		if(err) throw err;
	});  //42
	var a = connection.query('SELECT * FROM pantry NATURAL JOIN favoriteFood NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + fName + ' AND quantity = 0', function(err, results) {
		if(err) throw err;
	}); //22
	var b = connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + fName + ' AND quantity = 0', function(err, results) {
		if(err) throw err;
	});
	var c = connection.query('SELECT * FROM pantry NATURAL JOIN favoriteFood NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + fName, function(err, results) {
		if(err) throw err;
	});
	if(typeof a != undefined && a) {
		connection.query('INSERT INTO groceryList (userID, foodID, quantity) VALUES(' + uID + ', ' + a[0].foodID + ', ' + a[0].brand + ', 1)', function(err, results) {
			if(err) throw err;
		});
		connection.query('DELETE FROM pantry WHERE userID = ' + uID + ' AND foodID = ' + a[0].foodID, function(err, results) {
			if(err) throw err;
		});
	} else if(typeof b != undefined && b){
		connection.query('DELETE FROM pantry WHERE userID = ' + uID + ' AND foodID = ' + b[0].foodID, function(err, results) {
			if(err) throw err;
		});
	} else if(typeof c != undefined && c && c[0].quantity < c[0].minValue) {
		connection.query('INSERT INTO groceryList (userID, foodID, quantity) VALUES('uID + ', ' + c[0].foodID + ', 1)', function(err, results) {
			if(err) throw err;
		});
	}
});

//USER STORY 23 & 46
//ADD EXPIRATION DATE HERE? (not in grocerylist)
app.delete('/user/:userid/groceryList/:item/:group/:br/:quant', (req, res/*, uID, fName, fGroup, br, quant*/) => { //Quantity either needs to be specified upon saying it was bought or have it defaulted to 1
	var uID = req.params.userid;
	var fName = req.params.item;
	var fGroup = req.params.group;
	var br = req.params.br;
	var quant = req.params.quant;

	var item1 = connection.query('SELECT * FROM groceryList NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + fName + ' AND brand = ' + brand, function(err, results) {
		if(err) throw err;
	});
	var item2 = connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + fName + ' AND brand = ' + brand, function(err, results) {
		if(err) throw err;
	});
	

	connection.query('INSERT INTO pantry (userID, foodID, brand, quantity) VALUES(' + uID + ', ' + item2[0].foodID + ', ' + brand + ', ' + quant + ')', function(err, results) {
		if(err) throw err;
	});
	connection.query('DELETE FROM groceryList WHERE foodID = ' + item1[0].foodID + ' AND userID = ' + uID, function(err, results) {
		if(err) throw err;
	});
});

//insert a food into favorited food table
app.post('/user/:userid/pantry/favorite', (req, res/*, fID, uID, minVal*/) => {
	var fID = req.body.fID;
	var uID = req.body.uID;
	var minVal = req.body.minVal;
	connection.query('INSERT INTO favoriteFood VALUES(' + uID + ', ' + fID + ', ' + minVal + ')', function(err, results) {
		if(err) throw err;
	});
});

app.get('/user/:userid/favorites', (req, res) => {
	var uID = req.params.userid;
	connection.query('SELECT * FROM favoriteFood NATURAL JOIN foodItem WHERE userID = ' + uID, function(err, results) {
		if(err) throw err;
		else { res.send(JSON.parse(JSON.stringify(results))); }
	});
});


/*******ENTER CUSTOM RECIPE*******/

//select all recipes for a user
app.get('/user/:userid/recipes', (req, res) => {
	var uID = req.params.userid;
	connection.query('SELECT * FROM recipe WHERE userID = ' + uID, function(err, results) {
		if(err) throw err;
		else { res.send(jSON.parse(JSON.stringify(results))); }
	});
});

//Searching for recipes based on an ingredient (name?)
app.get('/user/:userid/recipes/:ingredient', (req, res/*, uID, ingred*/) => {
	var user = req.params.userid;
	var ingred = req.params.ingredient;
	connection.query('SELECT * FROM recipe NATURAL JOIN recipeAssignments NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = ' + ingred, function(err, results) {
		if(err) throw err;
		else { res.send(JSON.parse(JSON.stringify(results))); }
	});
});


//search / select recipe based on the recipe ID
app.get('/user/:userid/recipes/:recipe', (req, res/*, uID, recipeName*/) => {
	var recipeID = req.params.recipe;
	var uID = req.params.userid;
	connection.query('SELECT * FROM recipe NATURAL JOIN recipeAssignments NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND recipeID = ' + recipeID, function(err, results) {
		if(err) throw err;
		else { res.send(JSON.parse(JSON.stringify(results))); }
	});
});

//INSERT RECIPE INGREDIENTS FIGURE OUT HOW TO ARRAY THING
app.post('/user/:userid/recipes/recipe', (req, res/*, uID, recipeName, meal, ingredients, procedure*/) => {
	var uID = req.body.uID;
	var recipeName = req.body.recipeName;
	var meal = req.body.meal;
	var ingredients = req.body.ingredients;
	var procedure = req.body.procedure;
	connection.query('INSERT INTO recipe (userID, recipeName, meal, steps) VALUES(' + uID + ', ' + recipeName + ', ' + meal + ', ' + procedure + ')', function(err, results) {
		if(err) throw err;
	});
	var recipe = connection.query('SELECT * FROM recipe WHERE userID = ' + uID + ' AND recipeName = ' + recipeName + ' AND procedure = ' + procedure, function(err, results) {
		if(err) throw err;
	});
	for(int j = 0; j < ingredients.length; j++){
		var fd = connection.query('SELECT * FROM foodItem NATURAL JOIN pantry WHERE foodName = ' + ingredients[j].name + ' AND userID = ' + uID, function(err, results) {
			if(err) throw err;
		});
		if(typeof fd != undefined && fd) {
			//Figure out quantities
			connection.query('INSERT INTO recipeAssignments (recipeID, foodID, quantity) VALUES(' + recipe[0].recipeID + ', ' + fd[0].foodID + ', ' + ingredients[j].quantity + ')', function(err, results) {
				if(err) throw err;
			});
		} else {
			//brand / food group & brand for ingredients that aren't already in foodItem table
			connection.query('INSERT INTO foodItem (foodName) VALUES(' + ingredients[j].name + ')', function(err, results) {
				if(err) throw err;
			});
			var newfd = connection.query('SELECT * FROM foodItem WHERE foodName = ' + ingredients[j].name, function(err, results) {
				if(err) throw err;
			});
			connection.query('INSERT INTO recipeAssignments (recipeID, foodID, quantity) VALUES(' + recipe[0].recipeID + ', ' + newfd[0].foodID + ', ' + ingredients[j].quantity +')', function(err, results) {
				if(err) throw err;
			});
		}
	}
});

//Update recipes as users edit them
app.put('/user/:userid/recipes/recipe', (req, res/*, uID, recipeName, meal, ingredients, procedure*/) => {
	var uID = req.body.uID;
	var rID = req.body.rID;
	var recipeName = req.body.recipeName;
	var meal = req.body.meal;
	var ingredients = req.body.ingredients;
	var procedure = req.body.procedure;

	var recipe = connection.query('SELECT * FROM recipe WHERE recipeID = ' + rID + ' AND userID = ' + uID, function(err, results) {
		if(err) throw err;
	});

	connection.query('UPDATE recipe SET recipeName = ' + recipeName + ', meal = ' + meal + ', steps = ' + procedure + ' WHERE userID = ' + uID + ' AND recipeID = ' + recipe[0].recipeID, function(err, results) {
		if(err) throw err;
	});
});

app.put('/user/:userid/recipes/recipe/ingred', (req, res) => {
	var fName = req.body.fName;
	var rID = var.body.rID;

	var fid = connection.query('SELECT * FROM foodItem WHERE foodName = ' + fName.name, function(err, results) {
		if(err) throw err;
	});

	if(typeof fid != undefined && fid) {
		connection.query('INSERT INTO recipeAssignments VALUES(' + rID + ', ' + fid[0].foodID + ', ' + fName.quantity + ')', function(err, results) {
			if(err) throw err;
		});
	} else {
		var newF = connection.query('INSERT INTO foodItem (foodName) VALUES(' + fName.name + ')', function(err, results) {
			if(err) throw err;
		});
		connection.query('INSERT INTO recipeAssignments VALUES(' + rID + ', ' + newF.foodID + ', ' + fName.quantity + ')');
	}
});

app.delete('/user/:userid/recipes/:recipe/ingred/:ingred', (req, res) => {
	var uID = req.params.userid;
	var rID = req.params.recipe;
	var ingred = req.params.ingred;

	var fname = connection.query('SELECT * FROM foodItem WHERE foodName = ' + ingred, function(err, results) {
		if(err) throw err;
	});

	if(typeof fname != undefined && fname) {
		for(int j = 0; j < fname.length; j++) {
			var bol = connection.query('SELECT * FROM recipeAssignments WHERE recipeID = ' + rID + ' AND foodID = ' + fname[j].foodID, function(err, results) {
				if(err) throw err;
			});
			if(typeof bol != undefined && bol) {
				connection.query('DELETE FROM recipeAssignments WHERE recipeID = ' + rID + ' AND foodID = ' + fname[j].foodID, function(err, results) {
					if(err) throw err;
				});
			} //end inner-if
		} //end for loop
	} //end outer if
});

app.get('/user/:userid/recipes/pantry', (req, res) => {
	var uID = req.params.userid;
	var r = [];

	var b = connection.query('SELECT DISTINCT recipeID FROM recipe WHERE userID = ' + uID, function(err, results) {
		if(err) throw err;
	});
	var a = connection.query('SELECT recipeID, COUNT(*) as t FROM (recipe NATURAL JOIN recipeAssignments) x LEFT OUTER JOIN pantry ON pantry.foodID = x.foodID' + 
		' WHERE userID = ' + uID + ' AND pantry.foodID IS NULL' + ' GROUP BY recipeID', function(err, results) {
			if(err) throw err;
			else {
				for(var j = 0; j < results.length; j++) {
					if(results[j].t <= 2) {
						r.push(results[j].recipeID);
					}
				}
				res.send(r);
			}

		});

	 // for(var j = 0; j < b.length; j++) {
	 // 	// var a = connection.query('SELECT * FROM (recipes NATURAL JOIN recipeAssignments) x LEFT OUTER JOIN pantry ON pantry.foodID = x.foodID' + 
	 // 	// ' WHERE userID = ' + uID + ' AND recipeID = ' + b[j]);
	 // 	connection.query('SELECT * FROM ' + r + ' WHERE recipeID = ' + b[j]);

	 // }

});