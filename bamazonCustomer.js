var mysql = require("mysql");
require("dotenv").config();
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: process.env.db_user,

  // Your password
  password: process.env.db_password,
  database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
   
    console.log("connected as id " + connection.threadId);
    connection.end();
  });