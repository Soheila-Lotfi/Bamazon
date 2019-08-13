var mysql = require("mysql");
var inquirer = require("inquirer");

// ### Challenge #1: Customer View (Minimum Requirement)

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Leila@1357",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  Start();
});
