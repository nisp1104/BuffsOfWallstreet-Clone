/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/

//UNCOMMENT THE LINE BELOW IF YOU ARE USING THE ENV FILE!!!!!
require('dotenv').config()


var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//Create Database Connection
var pgp = require('pg-promise')();


/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
**********************/

//USE THE BELOW BLOCK IF YOU WANT TO TO 
//ADJUST THE ENV FILE INSTEAD OF  USING THE 
//CONFIG BELOW 
let dbConfig = {
 host: process.env.LOCAL_DB_HOST,
 port: process.env.LOCAL_DB_PORT,
 database: process.env.LOCAL_DB_NAME,
 user: process.env.LOCAL_DB_USER,
 password: process.env.LOCAL_DB_PASSWORD
};

//COMMENT THE BLOCK BELOW IF YOU WANT TO USE THE ENV FILE!!!
///////////////////////////////////////////////////////////
// const dbConfig = {
//   host: 'localhost',
//   port: 5432,
//   database: 'mockstock',
//   user: 'postgres',
//   password: 'mockstock'
// };
//////////////////////////////////////////////////////////


//UNCOMMENT THE 2 LINES BELOW IF YOU WANT TO USE THE ENV FILE!!!
const isProduction = process.env.NODE_ENV === 'production';
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;


let db = pgp(dbConfig);
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

// var query = "SELECT * FROM competitor;";
//db.any(query)
//	.then(function(rows){
 //		console.log('This is the email of the user: ')
//		console.log(rows[0].email);
//	})
//	.catch(function(err){
//		console.log("error message")
//});

/* Web Page Endpoints*/

app.get('/', function(req, res) {
  res.render('pages/homePage',{
    my_title:'Home Page'
  });
});

// registration page 
app.get('/register', function(req, res) {

  // Make a call out to your database.

	res.render('pages/register',{
		my_title:"Registration Page"
	});
});

app.get('/login', function(req, res) {

  // Make a call out to your database.

	res.render('pages/login',{
		my_title:"Login Page"
	});
});

app.get('/homePage', function(req, res) {
  res.render('pages/homePage',{
    my_title:'Home Page'
  });
});
//team page
app.get('/team', function(req, res) {
  res.render('pages/team',{
    my_title:'team Home'
  });
});

app.get('/news', function(req, res) {
  res.render('pages/news',{
    my_title:'news'
  });
});

//profile
app.get('/profile', function(req, res) {
		  res.render('pages/profile',{
			    my_title:'profile'
			  });
});

//trade
app.get('/trade', function(req, res) {
  res.render('pages/trade',{
    my_title:'trade'
  });
});


//user buys stock, update table
app.post('/trade/buy_stock', function(req, res) {
	var tckr_symbol= req.body.tckr_symbol;
	var qty = req.body.qty;
	var price = req.body.price;
	var insert_statement ="Insert Into user_stocks (ticker,qty,price) values ('"+tckr_symbol+"' , '"+qty+"','"+price+"');";// SQL statement to insert into user_stocks
  db.any(insert_statement)
    .then(function(rows){
    //console.log(rows);
      res.redirect('/trade');
      
    })
    .catch(function(err){
      res.sendStatus(500);
      console.log("Database query within /trade/buy_stock error.")
  });
	// db.task('get-everything', task => {
 //        task.batch([
 //            task.any(insert_statement)
 //        ]);
 //    })
 //  .catch(function(err){
 //      console.log("error message")
 //  });
});

//user sells stock, update table
app.post('/trade/sell_stock', function(req, res) {
	var tckr_symbol= req.body.tckr_symbol;
	var qty = req.body.qty;
	var price = req.body.price;
	// SQL statement to update table base on transaction
	var updateAndDeleteStatement ="UPDATE user_stocks SET qty = (qty - '"+qty+"') WHERE (user_stocks.ticker = '"+tckr_symbol+"'); DELETE FROM user_stocks WHERE (qty <= 0);"
  db.any(updateAndDeleteStatement)
    .then(function(rows){
    //console.log(rows);
      res.redirect('/trade');
      
    })
    .catch(function(err){
      res.sendStatus(500);
      console.log("Database query within /trade/sell_stock error.")
  });
	// db.task('get-everything', task => {
 //        return task.batch([
 //            task.any(insert_statement)
 //        ]);
 //    })
 //  .catch(function(err){
 //      console.log("error message")
 //  });
});

//search
app.get('/search', function(req, res) {
  res.render('pages/search',{
    my_title:'search'
  });
});

// API End-Points
app.get('/stock_info', function(req, res){
	var query = "SELECT * FROM user_stocks;";
	db.any(query)
		.then(function(rows){
		//console.log(rows);
		  res.json({stockData: rows});
			
		})
		.catch(function(err){
			console.log("Database query within /stock_info error.")
	});
});

// Start up server.
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});



















