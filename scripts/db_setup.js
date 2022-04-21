//Create Database Connection
require('dotenv').config("../.env")
var pgp = require('pg-promise')();
let dbConfig = {
    host: process.env.LOCAL_DB_HOST,
    port: process.env.LOCAL_DB_PORT,
    database: process.env.LOCAL_DB_NAME,
    user: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASSWORD
  };

console.log(dbConfig)
let db = pgp(dbConfig);

// Drop all tables from DB
var insertSotckData = "DROP stocks IF EXISTS";

db.any(query)
	.then(function(rows){
		console.log('This is the email of the user: ')
		console.log(rows[0].email);
	})
	.catch(function(err){
		console.log("error message")
});

// Add all tables to DB
// Insert table data so that everyone starts with the same data in our local databases.


var insertSotckData = "INSERT * ...... stocks;";

db.any(query)
	.then(function(rows){
		console.log('This is the email of the user: ')
		console.log(rows[0].email);
	})
	.catch(function(err){
		console.log("error message")
});

var insertUsers = "INSERT * ...... stocks;";

db.any(query)
	.then(function(rows){
		console.log('This is the email of the user: ')
		console.log(rows[0].email);
	})
	.catch(function(err){
		console.log("error message")
});





