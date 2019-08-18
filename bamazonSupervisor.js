var inquirer = require("inquirer");
var mysql = require("mysql");

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

function Start() {
  inquirer
    .prompt([
      {
        name: "options",
        type: "list",
        message: "How can we help you?",
        choices: ["View Product Sales by Department", "Create New Department"]
      }
    ])
    .then(function(answers) {
      // When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window.
      if (answers.options === "View Product Sales by Department") {
        var querySelect =
          "SELECT d.department_id, d.department_name, d.over_head_costs, p.product_sales," +
          " " +
          "(SELECT p.product_sales)-(SELECT d.over_head_costs)" +
          " " +
          "AS total FROM departments AS d" +
          " " +
          "LEFT JOIN products AS p ON p.department_name=d.department_name" +
          " " +
          "GROUP BY department_name";
        console.log(querySelect);
        connection.query(querySelect, function(err, res) {
          if (err) throw err;
          console.log(res);
        });
      }
    });
}
