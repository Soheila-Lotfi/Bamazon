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
      if (answers.options === "View Product Sales by Department") {
        connection.query(
          "SELECT d.department_id, d.department_name, d.over_head_costs, p.product_sales," +
            "(SELECT p.product_sales)-(SELECT d.over_head_costs)" +
            "AS total FROM departments AS d" +
            "LEFT JOIN products AS p ON p.department_name=d.department_name" +
            "GROUP BY department_name",
          function(err, res) {
            if (err) throw err;
            console.log(res);
          }
        );
      }
    });
}

// 4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |

// 5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

// 6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

//    * Hint: You may need to look into aliases in MySQL.

//    * Hint: You may need to look into GROUP BYs.

//    * Hint: You may need to look into JOINS.

//    * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)
