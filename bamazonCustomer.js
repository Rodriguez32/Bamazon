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


connection.connect(function (err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);

  // run the start function after a connection is made
  start();
  // connection.end();
});

function start() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.log("******************************************* Welcome to Bamazon  *********************************************************")
    console.log("-------------------------------------------------------------------------------------------------------------------------")

    // Inspired by kindergarten list of supplies
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Qty: " + res[i].stock_quantity)
    }

    console.log("-------------------------------------------------------------------------------------------------------------------------")

    inquirer
      .prompt([
        {
          name: "item",
          type: "id",
          message: "What is the ID of the product you would like to buy?",
          validate: function (value) {
            if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
              return true;
            } else {
              return false;
            }
          }
        },
        {
          type: "input",
          name: "qty",
          message: "How many units would you like to buy?",
          validate: function (value) {
            if (isNaN(value)) {
              return false;
            } else {
              return true;
            }
          }
        }
      ]).then(function (ans) {
        // console.log(ans);
        // console.log("This is response" + res);
        var whatToBuy = (ans.item) - 1;
        //  console.log(res[whatToBuy].price);
        var unitsToBuy = parseInt(ans.qty);
        var grandTotal = parseFloat(((res[whatToBuy].price) * unitsToBuy).toFixed(2));
        // console.log(grandTotal);

        //check if quantity is sufficient
        if (res[whatToBuy].stock_quantity >= unitsToBuy) {
          //after purchase, updates quantity in products
          connection.query("UPDATE products SET ? WHERE ?", [
            { stock_quantity: (res[whatToBuy].stock_quantity - unitsToBuy) },
            { item_id: ans.id }
          ], function (err, result) {
            if (err) throw (err);
            console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.")
          }
          )
        }


      });
  }
  )
}
