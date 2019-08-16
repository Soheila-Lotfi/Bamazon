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

function Start() {
  connection.query(
    "SELECT item_id, product_name, price FROM products",
    function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(
          "Item_id: " +
            res[i].item_id +
            "|| Product_name: " +
            res[i].product_name +
            "|| Price: $" +
            res[i].price
        );
      }
      runSearch();
    }
  );
}

function runSearch() {
  inquirer
    .prompt([
      {
        name: "itemId",
        type: "input",
        message: "What is the id of the product that you would like to buy?"
      },
      {
        name: "units",
        type: "input",
        message: "How many units whould you like to buy?"
      }
    ])
    .then(function(answers) {
      connection.query(
        "SELECT stock_quantity, price FROM products WHERE ? ",
        { item_id: answers.itemId },
        function(err, res) {
          if (err) throw err;
          if (res[0].stock_quantity >= parseInt(answers.units)) {
            var totalCost = res[0].price * answers.units;
            console.log("The total cost is : $" + totalCost);
            var remainingQuantity =
              res[0].stock_quantity - parseInt(answers.units);
            console.log(
              remainingQuantity + " units has been left in the stock"
            );

            connection.query(
              "UPDATE products SET? WHERE ?",
              [
                { stock_quantity: remainingQuantity },
                { item_id: answers.itemId }
              ],
              function(err, res) {
                if (err) throw err;
              }
            );
          } else {
            console.log("Insufficient quantity!");
            console.log(res[0].stock_quantity + " are available in the stock");
          }
          inquirer
            .prompt([
              {
                name: "newitem",
                type: "list",
                message: "whould you like to buy another item?",
                choices: ["Yes", "No,Exit"]
              }
            ])
            .then(function(answers) {
              if (answers.newitem === "Yes") {
                runSearch();
              } else if (answers.newitem === "No,Exit") {
                connection.end();
              }
            });
        }
      );
    });
}
