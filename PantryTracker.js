var express = require('express');
var app = express();
var port = 9000;
var bodyParser = require('body-parser');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
const fs = require('fs');
var cors = require('cors');
var session = require('express-session');
var expsession = {
        secret: 'my express secret',
        resave: true,
        saveUninitialized: true
}
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res){
        res.send('Nobody expects the spanish inquisition!\n');
});
app.use(session(expsession));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res){
        res.send('Nobody expects the spanish inquisition!\n');
});
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

 var verifyOptions;
var connection = mysql.createConnection({
        host: "rdsdatabase.c1kuubgkyedt.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "abc12345",
        database: "rdsPantry"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(port);
console.log('Listening on port', port);

//CORS
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
/*******CREATE ACCOUNT EPIC*******/
//user story 12 - account creation
app.post('/user/create', (/*userName, pass, email*/req,res) => {
        var user = req.body.userName;
        var pass = req.body.pass;
        var email = req.body.email;
        var re;

        connection.query('INSERT INTO userAccount (userPassword, userName, email) VALUES(?, ?, ?)', [pass, user, email], function(err, results){
        if (err) res.send("L");
        else{
                let k = results.insertId;
                res.json({userid : k});
        }
        });
});
//user story 12 - account login
app.post('/user/login', function(req, res) {
        //return token, username, password
        var email = req.body.email;
        var pass = req.body.pass;
        var re;
        var tk;
        if(req.session.loggedin){
                res.send("You are logged in already, " + req.session.userName);
        }else{
                if(email && pass) {
                        connection.query('SELECT * FROM userAccount WHERE email = ? AND userPassword = ?', [email, pass], function(err, results) {
                        if (err) throw err;
                                else{
                                        re = JSON.parse(JSON.stringify(results));


                                        if(typeof re != undefined && re){
                                req.session.loggedin = true;
                                req.session.email = email;
                                //req.session.userName = userName;
                                //console.log(re[0]);
                                tk = jwt.sign({id: re[0].userID, username: re[0].userName}, expsession.secret, {expiresIn: 129600});

                                console.log(re[0].userName + " has logged in");
                                res.json({
                                        success: true,
                                        err: null,
                                        tk,
                                        userid: re[0].userID
 				});
                                res.end();

                        }else{
                                console.log("incorrect login");
                                res.send('Incorrect email or password.');
                                req.session.loggedin = false;
                        }//AHHH 


                                }//else 

                });//endgame
        }//end else
                else{
                        res.send("Please enter your username and password!");
                        res.end();
                }
        }
});

//LOGGING OUT - not a user story but functionally needed
app.get('/user/logout', function (req, res) {
        if(req.session.loggedin){
                req.session.destroy();
                res.send("You're now logged out. Goodbye!");
                console.log("Logged out!");
        }else{
                res.send("You either didn't log-in or something went very, very wrong...");
        }//end else
});
//user story 16 - updating password

app.put('/:userid/passUpdate/', (req, res) => {
        var user = req.body.userName;
        var pass = req.body.pass;
        var newPass = req.body.newPass;
        //var a = connection.query('SELECT * FROM userAccount WHERE userName = ? AND userPassword = ?' [user, pass], function(err, result) { if(err) throw err; });
        var a;

        connection.query('SELECT * FROM userAccount WHERE userName = ? AND userPassword = ?' [user, pass], function(err, result)
                {
                        if(err) throw err;
                        else a = JSON.parse(JSON.stringify(results));
                });
        console.log("user is " + user +" old pass is " + pass + " new pass " + newPass);
        if(typeof a != undefined && a){
                connection.query('UPDATE userAccount SET userPassword = ? WHERE userName = ?', [newPass, user],
                function(err, result) {
                        if(err) throw err;
                        res.send("Password Change Successful");
                });
        } else {
                res.send("The original password you entered for this user is incorrect");
        }
});

/*******MANUALLY INPUT FOOD EPIC*******//*********************************/

//USER STORY 24
app.get('/user/:userid/pantry', (req, res) => {
        var uID = req.params.userid;
        connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID, function(err, results) {
                if(err) throw err;
                else {
                        console.log("Inside 24 /pantry");
                        res.send(JSON.parse(JSON.stringify(results))); }
        });
});
//USER STORY 31
app.post('/user/:userid/pantry/add', (req, res) => {
        var uID = req.body.uID;
        var fName = req.body.fName;
        var exDate = req.body.exDate;
        var quant = req.body.quant;
        var fGroup = req.body.fGroup;
        var desc = req.body.desc;
        var br = req.body.br;
        var food;
        var id;
        var somethingRandom = new Date(exDate);
        var year = exDate.substring(0, 5);
        var month = exDate.substring(6, 8);
        var day = exDate.substring(9, 11);
        connection.query('SELECT * FROM foodItem WHERE foodName = \'' + fName + '\' AND brand = \'' + br + "\' AND foodGroup = \'" + fGroup + "\'", function(err, results) {
                console.log("got through that dang connection query");
                if(err) throw err;
                else {
                      food = JSON.parse(JSON.stringify(results));
                }//end else
        });

      if(typeof food != undefined && food) {
                connection.query('INSERT INTO pantry (userID, foodID, expirationDate, quantity) VALUES(' + uID + ', ' + food[0].foodID + ', \'' + exDate + '\', ' + quant + ')', function(err, results) {
                        if(err) throw err;
                        else{
                                res.send(food[0]);
                        }
                });
        } else {
                connection.query('INSERT INTO foodItem  (foodName, foodGroup, brand) VALUES(\'' + fName + '\', \'' + fGroup + '\', \'' + br + '\')', function(err, results) {     
                        if(err) throw err;
                        else {
                                connection.query('SELECT foodID FROM foodItem WHERE foodName = \'' + fName + '\' AND foodGroup = \'' + fGroup + '\' AND brand = \'' + br + "\'", function(err, results) {
                                        if(err) throw err;
                                        else{
                                                id = JSON.parse(JSON.stringify(results));
                                                connection.query('INSERT INTO pantry (userID, foodID, expirationDate, quantity) VALUES(' + uID + ', ' + id[0].foodID + ', \'' + exDate + '\', ' + quant + ')', function(err, results) {
                                                if(err) throw err;
                                                        else{
                                                 		res.send(id[0]);
                                                        }
                                                });
                                        }
                                });
                        }//end else
                });
        }
});

//USER STORY 42 - expiration thing
app.put('/user/:userid/pantry/item/exDate', (req, res) => {
        var fName = req.body.fName;
        var uID = req.body.uID;
        var br = req.body.br;
        var exDate = req.body.exDate;;
        var fid = connection.query('SELECT foodID FROM foodItem NATURAL JOIN pantry WHERE userID = ? AND foodName = ? AND brand = ?', [uID, fName, br], function(err, results) {
                if(err) throw err;
        });
        if(typeof fid != undefined && fid) {
                connection.query('UPDATE pantry SET expirationDate = \'' + exDate + '\' WHERE userID = ' + uID + ' AND foodID = ' + fid + ' AND brand = \'' + br + "\'", function(err, results) {
                        if(err) throw err;
                });
        }
});

//USER STORY 42 - remove item from pantry
app.delete('/user/:userid/pantry/:item', (req, res/*, uID, fName*/) => {
        var fName = req.params.item;
        var uID = req.params.userid;
        var fid = connection.query('SELECT foodID FROM pantry INNER JOIN foodItem ON pantry.foodID = foodItem.foodID WHERE userID = ? AND foodName = ?', [uID, fName],
                function(err, result) {
                        if(err) throw err;
                });
        connection.query('DELETE FROM pantry WHERE foodID = ' + fid + ' AND userID = ' + uID, function(err, results) {
                if(err) throw err;
                else{
                        res.send("successfully removed " + fName + " from your pantry");
                }
                });
});


//USER STORY 24 CATEGORIES
app.get('/user/:userid/pantry/categories', (req, res) => {
        var uID = req.params.userid;
        connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' ORDER BY foodGroup', function(err, results) {
                if(err) throw err;
                else {
                        res.send(JSON.parse(JSON.stringify(results))); }
        });
});

//USER STORY 30
app.get('/user/:userid/pantry/exp', (req, res) => {
        var uID = req.params.userid;
        connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' ORDER BY (expirationDate) ASC', function(err, results) {
                if(err) throw err;
                else{
                        res.send(JSON.parse(JSON.stringify(results)));
                }
        });

});


/*******RECIPE RECOMMENDATIONS EPIC*******/
//USER STORY 11
app.get('/user/:userid/recipes', (req, res) => {
        var uID = req.params.userid;
        connection.query('SELECT recipeName FROM recipe WHERE userID =' + uID, function(err, results) {
                if(err) throw err;
        });
});

//USER STORY 13
app.get('/user/:userid/groceryList', (req, res) => {
        console.log(req.params);
        var uID = req.params.userid;
        connection.query('SELECT * FROM groceryList NATURAL JOIN foodItem WHERE userID = ' + uID, function(err, results) {
                if(err) throw err;
                else {
                        res.send(JSON.parse(JSON.stringify(results)));
                }//end else
        });
});

//USER STORY 18
app.post('/user/:userid/groceryList', (req, res) => {
        var fName = req.body.fName;
        var br = req.body.br;
        var uID = req.body.uID;
        var fGroup = req.body.fGroup;
        var quant = req.body.quant;
        var fid;
        var newItem;

        connection.query('SELECT foodID FROM foodItem WHERE foodName = \'' + fName + '\' AND brand = \'' + br + "\' AND foodGroup = \'" + fGroup + "\'", function(err, results) {

                if(err) throw err;
                else {fid = JSON.parse(JSON.stringify(results));}
        });
        if(typeof fid != undefined && fid) {
                console.log("Inside typeof != undefined");
                connection.query('INSERT INTO groceryList (userID, foodID, quantity) VALUES(' + uID + ', ' + fid[0] + ', ' + quant + ')', function(err, results) {
                        if(err) throw err;
                        else {
                                res.json(fid[0].foodID);
                                res.end();
                        }
                });
        } else {
                                console.log("Outside type of != undefined");
                connection.query('INSERT INTO foodItem (foodName, foodGroup, brand) VALUES(\'' + fName + '\', \'' + fGroup + '\', \'' + br + '\')', function(err, results) {
                        if(err) throw err;

                });

                connection.query('SELECT * FROM foodItem WHERE foodName = \'' + fName + '\' AND brand = \'' + br + "\' AND foodGroup = \'" + fGroup + "\'", function(err, results) {
                        if(err) throw err;
                        else{
                        newItem = JSON.parse(JSON.stringify(results));
                connection.query('INSERT INTO groceryList (userID, foodID, quantity) VALUES(' + uID + ', ' + newItem[0].foodID + ', ' + quant + ')', function(err, results) {
                        if(err) throw err;
                        else {
                                res.send(newItem[0]);
                            }
                });

                        }
                });
        }

});

//USER STORY 42 / 22
app.put('/user/:userid/pantry/item/quantity', (req, res/*, uID, fName, br, num*/) => {
        var uID = req.body.uID;
        var fName = req.body.fName;
        var br = req.body.br;
        var num = req.body.num;
        var item = connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = \'' + fName + '\' AND brand = \'' + br + "\'", function(err, results) {
                if(err) throw err;
        });
        connection.query('UPDATE pantry SET quantity = ' + num + ' WHERE userID = ' + uID + ' AND foodID = ' + item[0].foodID, function(err, results) {
                if(err) throw err;
        });  //42
        var a = connection.query('SELECT * FROM pantry NATURAL JOIN favoriteFood NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = \'' + fName + '\' AND quantity = 0', function(err, results) {
                if(err) throw err;
        }); //22
        var b = connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = \'' + fName + '\' AND quantity = 0', function(err, results) {
                if(err) throw err;
        });
        var c = connection.query('SELECT * FROM pantry NATURAL JOIN favoriteFood NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = \'' + fName + "\'", function(err, results) {
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
                connection.query('INSERT INTO groceryList (userID, foodID, quantity) VALUES(' + uID + ', ' + c[0].foodID + ', 1)', function(err, results) {
                        if(err) throw err;
                });
        }
});

//USER STORY 23 & 46
//ADD EXPIRATION DATE HERE

app.delete('/user/:userid/groceryList/item', (req, res) => {
        var uID = req.body.uID;
        var fName = req.body.fName;
        var fGroup = req.body.fGroup;
        var brand = req.body.br;
        var quant = req.body.quant;

        var item1 = connection.query('SELECT * FROM groceryList NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = \'' + fName + '\' AND brand = \'' + brand + "\'", function(err, results) {
                if(err) throw err;
        });
        var item2 = connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = \'' + fName + '\' AND brand = \'' + brand + "\'", function(err, results) {
                if(err) throw err;
        });


        connection.query('INSERT INTO pantry (userID, foodID, brand, quantity) VALUES(' + uID + ', ' + item2[0].foodID + ', ' + brand + ', ' + quant + ')', function(err, results) {
                if(err) throw err;
        });
        connection.query('DELETE FROM groceryList WHERE foodID = ' + item1[0].foodID + ' AND userID = ' + uID, function(err, results) {
                if(err) throw err;
        });
});
/*******ENTER CUSTOM RECIPE*******/
//get ingredient search based on specific ingred
app.get('/user/:userid/recipes/searchByIngred', (req, res) => {
        var uID = req.params.userid;
        var ingred = req.body.ingred;
        connection.query('SELECT * FROM recipe NATURAL JOIN recipeAssignments NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND foodName = \'' + ingred + "\'", function(err, results) {
                if(err) throw err;
        });
});
//return ingred for ALL recipes
app.get('/user/recipes/:recipe/ingredients', (req, res) => {
        //var uID = req.params.user
        var rID = req.params.recipe;
        connection.query('SELECT * FROM recipeAssignments NATURAL JOIN foodItem WHERE recipeID = ' + rID, function(err, results) {
                if(err) throw err;
                else{
                        //console.log(JSON.parse(JSON.stringify(results)));
                        res.send(JSON.parse(JSON.stringify(results)));
                }
        });
});

//search / select a recipe based on its name
app.get('/user/:userid/recipes/:recipeName', (req, res) => {
        var recipeName = req.params.recipeName;
        var uID = req.params.userid;
        var a;
        connection.query('SELECT * FROM recipe WHERE userID = ' + uID + ' AND recipeName = \'' + recipeName + "\'", function(err, results) {
                if(err) throw err;

                //res.write
                else {
                        a = JSON.parse(JSON.stringify(results));
                        res.write(JSON.parse(JSON.stringify(results)));

                        connection.query("SELECT * FROM recipeAssignments NATURAL JOIN foodItem WHERE userID = " + uID + " AND recipeID = " + a[0].recipeID, function(err, results){
                                if (err) throw err;
                                else{
                                        res.write(JSON.parse(JSON.stringify(results)));

                                }
                        });

                }//end else
                res.end();
        });//end query

});

//insert a food into favorites
app.post('/user/:userid/pantry/favorite', (req, res) => {
        var fID = req.body.fID;
        var uID = req.params.userid;
        var minVal = req.body.minVal;
        connection.query('INSERT INTO favoriteFood VALUES(' + uID + ', ' + fID + ', ' + minVal + ')', function(err, results) {
                if(err) throw err;
        });
});

//INSERT RECIPE INGREDIENTS FIGURE OUT HOW To ARRAY THING
app.post('/user/:userid/recipes/recipe', (req, res) => {
        var uID = req.body.uID;
        var recipeName = req.body.recipeName;
        var meal = req.body.meal;
        var ingredients = JSON.parse(JSON.stringify(req.body.ingredients)); //Not currently working
        var procedure = req.body.procedure;

        var recipe;
        var fd;
        var newfd;
        connection.query('INSERT INTO recipe (userID, recipeName, meal, steps) VALUES(' + uID + ', \'' + recipeName + '\', \'' + meal + '\', \'' + procedure + '\')', function(err, results) {
                if(err) throw err;
                else{
                        connection.query('SELECT * FROM recipe WHERE userID = ' + uID + ' AND recipeName = \'' + recipeName + '\' AND steps = \'' + procedure + '\'', function(err, results) {
                                if(err) throw err;
                                else{
                                recipe = JSON.parse(JSON.stringify(results));
                                console.log(" recipe is " + recipe)
                                if(typeof recipe != undefined && recipe) {
                                        //FOR LOOOOOP
                                        for(var j = 0; j < ingredients.length; j++){
                                                console.log(Object.keys(ingredients[j]));
                                                connection.query('SELECT * FROM foodItem NATURAL JOIN pantry WHERE foodName = \'' + ingredients[j].name + '\' AND userID = ' + uID, function(err, results) {
                                        if(err) throw err;
                                        else { fd = JSON.parse(JSON.stringify(results)); }
                                                });
                                             if(typeof fd != undefined && fd) {
                                        connection.query('INSERT INTO recipeAssignments (recipeID, foodID, quantity) VALUES(' + recipe[0].recipeID + ', ' + fd[0].foodID + ', ' + ingredients[j].quantity + ')', function(err, results) {
                                        if(err) throw err;
                                    });
                                                } else {
                                                connection.query('INSERT INTO foodItem (foodName) VALUES(\'' + ingredients[j].name + '\')', function(err, results) {
                                        if(err) throw err;
                                        else{
                                                //ISSUE IS HERE
                                        connection.query('SELECT * FROM foodItem WHERE foodName = \'' + ingredients[j].name + '\'', function(err, results) {
                                                        if(err) throw err;
                                                        else { newfd = JSON.parse(JSON.stringify(results));}
                                                        });
                                        }
                                               });
                                        }
                                                }
                                                }
                                                }
                                                });
                                }
});


app.put('/user/:userid/recipes/recipe', (req, res) => {
        var uID = req.body.uID;
        var rID = req.body.rID;
        var recipeName = req.body.recipeName;
        var meal = req.body.meal;
        var ingredients = req.body.ingredients;
        var procedure = req.body.procedure;
        var recipe;
        connection.query('SELECT * FROM recipe WHERE recipeid = ' + rID + 'AND userID = ' + uID, function(err, results) {
                if(err) throw err;
                else{
                        recipe = JSON.parse(JSON.stringify(results));
                }//end else
        });
        connection.query('UPDATE recipe SET recipeName = \'' + recipeName + '\', meal = \'' + meal + '\', steps = \'' + procedure + '\' WHERE userID = ' + uID + ' AND recipeID = ' + recipe[0].recipeID, function(err, result){
                if(err) throw err;

        });
});
app.put('/user/:userid/recipes/recipe/ingred', (req, res) => {
        var fName = req.body.fName;
        var rID = req.body.rID;

        var fid;
        var newF;

        connection.query('SELECT * FROM foodItem WHERE foodName = \'' + fName.name + '\'', function(err, results) {
                if(err) throw err;
                else {
                        fid = JSON.parse(JSON.stringify(results));
                }
        });

        if(typeof fid != undefined && fid) {
                connection.query('INSERT INTO recipeAssignments VALUES(' + rID + ', ' + fid[0].foodID + ', ' + fName.quantity + ')', function(err, results) {
                        if(err) throw err;
                });
        } else {
                connection.query('INSERT INTO foodItem (foodName) VALUES(' + fName.name + ')', function(err, results) {
                        if(err) throw err;
                        else {
                                newF = JSON.parse(JSON.stringify(results));
                        }
                });
                connection.query('INSERT INTO recipeAssignments VALUES(' + rID + ', ' + newF.foodID + ', ' + fName.quantity + ')');
        }
});

//new pantry distinct  NUMBER 37
app.get('/user/:userid/recipes/pantry', (req, res) => {
        var uID = req.params.userid;
        var r = [];
        var b;
        var c;
        console.log("37");
        connection.query('SELECT DISTINCT recipeID FROM recipe WHERE userID = ' + uID, function(err, results) {
                if(err) throw err;
                else {
                        b = JSON.parse(JSON.stringify(results));
                }
        });
        connection.query('SELECT recipeID, COUNT(*) as t FROM (recipe NATURAL JOIN recipeAssignments) x LEFT OUTER JOIN pantry ON pantry.foodID = x.foodID' +
                ' WHERE userID = ' + uID + ' AND pantry.foodID IS NULL' + ' GROUP BY recipeID', function(err, results) {
                        if(err) throw err;
                        else {
                                for(var j = 0; j < results.length; j++) {
                                        if(results[j].t <= 2) {
                                                r.push(results[j].recipeID);
                                        }
                                }
                                for(var j = 0; j < r.length; j++) {
                                        connection.query('SELECT foodID FROM (recipe NATURAL JOIN recipeAssignments) x LEFT OUTER JOIN pantry ON pantry.foodID = x.foodID WHERE' +
                                                'userID = ' + uID + ' AND recipeID = ' + r[j] + ' AND pantry.foodID IS NULL', function(err, results) {
                                                        if(err) throw err;
                                                        else {
                                                                c = JSON.parse(JSON.stringify(results));
                                                        }
                                                });
                                }
                                res.json({
                                        recipes: r,
                                        iToBuy: c
                                });
                                res.end();
                       }

        });
});
});

//new favorites 1
app.get('/user/:userid/favorites', (req, res) => {
        var uID = req.params.userid;
        connection.query('SELECT * FROM favoriteFood NATURAL JOIN foodItem WHERE userID = ' + uID, function(err, results) {
                if(err) throw err;
                else { res.send(JSON.parse(JSON.stringify(results)));
                        console.log(JSON.parse(JSON.stringify(results)));
                        }
        });
});
//new recipes entry 2
//select all recipes for a user
app.get('/user/:userid/recipesSelect', (req, res) => {
        var a;
        var uID = req.params.userid;
        connection.query('SELECT * FROM recipe WHERE userID = ' + uID, function(err, results) {
                if(err) throw err;
                else {
                        a = JSON.parse(JSON.stringify(results));
                        res.send(JSON.parse(JSON.stringify(results)));
                }//end else
        });
});

//delete row from table

app.delete('/user/:userid/groceryList/:foodid/deleteRow', (req, res) => {
        var userID = req.params.userid;
        var fid = req.params.foodid;
         connection.query("DELETE FROM groceryList WHERE foodid = " + fid + " AND userid = " + userID, function(err, results) {
                if(err) throw err;
                else {
                        console.log("deleted " + fid + " from groceryList");
                        res.send("deleted " + fid + "from groceryList");
                }//end else
         });//end query
});//end app.delete call
//delete food item from pantry
app.delete('/user/:userid/pantry/:foodid/deleteFood', (req, res) => {
        var userID = req.params.userid;
        var fid = req.params.foodid;
         connection.query("DELETE FROM pantry WHERE foodid = " + fid + " AND userid = " + userID, function(err, results) {
                if(err) throw err;
                else {
                        console.log("deleted " + fid + " from pantry");
                        res.send("deleted " + fid + "from pantry");
                }//end else
         });//end query
});//end app.delete call

//get a notification 101
app.get('/user/:userid/notifications/', (req, res) => {
        //nofificationid
        //if something dips below
        console.log("notification 101 was called");
        connection.query("SELECT FROM favoriteFood NATURAL JOIN pantry WHERE quantity < minVal", function(err, results) {
                        if(err) throw err;
                        else{
                                console.log(results);
                                res.send(results);

                        }//end else
        });//end query
});//end notification

//insert from favorites to grocery list
app.post('/user/:userid/favorite-to-grocery', (req, res) => {
        var uID = req.body.uID;
        var fID = req.body.fID;
        var quant = req.body.quant;
        connection.query('INSERT INTO groceryList (userID, foodID, quantity) VALUES(' + uID + ', ' + fID + ', ' + quant + ')', function(err, results) {
                if(err) throw err;
        });
});
//insert from favorites to grocery list
app.post('/user/:userid/favorite-to-grocery', (req, res) => {
        var uID = req.body.uID;
        var fID = req.body.fID;
        var quant = req.body.quant;
        connection.query('INSERT INTO groceryList (userID, foodID, quantity) VALUES(' + uID + ', ' + fID + ', ' + quant + ')', function(err, results) {
                if(err) throw err;
        });
});
//order by nutritional groups
app.get('/user/:userid/nutrition', (req, res) => {
        var uID = req.params.userid;
        var r;
        connection.query('SELECT foodGroup, count(*) as t FROM pantry WHERE userID = ' + uID + ' GROUP BY foodGroup ORDER BY ASC', function(err, results) {
                if(err) throw err;
                else {
                        r = JSON.parse(JSON.stringify(results));
                        res.send(r[0].foodGroup);
                }
        });
});
//get notification if food expires soon
app.get('/user/:userid/expireSoon', (req, res) => {
        var uID = req.params.userid;

        var a;
        connection.query('SELECT * FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND expirationDate < CURDATE() + 3', function(err, results) {
                if(err) throw err;
                else {
                        a = JSON.parse(JSON.stringify(results));
                        res.send(a);
                }
        });

});


//gets expired food 
app.get('/user/:userid/expired', (req, res) => {
        var a;
        connection.query('SELECT foodName FROM pantry NATURAL JOIN foodItem WHERE userID = ' + uID + ' AND expirationDate >= CURDATE()', function(err, results) {
                if(err) throw err;
                else {
                        a = JSON.parse(JSON.stringify(results));
                        res.send(a);
                }
        });
});

//put statement to update pantry items
app.put('/user/:userid/pantry/item', (req, res) => {
        var uID = req.body.uID;
        var fID = req.body.fID;
        var exDate = req.body.exDate;
        var quant = req.body.quant;
        var fGroup = req.body.fGroup;
        var brand = req.body.brand;
        console.log ("updating this");
        connection.query('UPDATE pantry SET expirationDate = \'' + exDate + '\', quantity = ' + quant + ' WHERE userID = ' + uID + ' AND foodID = ' + fID,
         function(err, results) {
                if(err) throw err;
         });

        connection.query('UPDATE foodItem SET foodGroup = \'' + fGroup + '\', brand = \'' + brand + '\' WHERE foodID = ' + fID,
         function(err, results){
                if(err) throw err;
        });
});