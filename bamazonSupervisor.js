var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");

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
        choices: [
          "View Product Sales by Department",
          "Create New Department",
          "Exit"
        ]
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

        connection.query(querySelect, function(err, res) {
          if (err) throw err;
          console.table(res);
          connection.end();
        });
      } else if (answers.options === "Create New Department") {
        inquirer
          .prompt([
            {
              name: "departmentName",
              type: "input",
              message: "what is the name of the department?"
            },
            {
              name: "overheadcost",
              type: "input",
              message: "what is the over head cost?"
            },
            {
              name: "departmentid",
              type: "input",
              message: "what is the department's id?"
            }
          ])
          .then(function(answers) {
            connection.query(
              "INSERT INTO departments SET ?",
              {
                department_name: answers.departmentName,
                over_head_costs: answers.overheadcost,
                department_id: answers.departmentid
              },
              function(err, res) {
                if (err) throw err;
                console.log(
                  "New department was inserted into database suessfully!"
                );
                connection.end();
              }
            );
          });
      } else if (answers.options === "Exit") {
        connection.end();
      }
    });
}
