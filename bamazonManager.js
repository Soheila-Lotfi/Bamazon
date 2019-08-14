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
        name: "Option",
        type: "list",
        message: "How can we help you?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
    .then(function(answers) {
      if (answers.Option === "View Products for Sale") {
        viewProducts();
      } else if (answers.Option === "View Low Inventory") {
        viewLowInventory();
      } else if (answers.Option === "Add to Inventory") {
        addToInventroy();
      } else if (answers.Option === "Add New Product") {
        addNewProduct();
      }
    });
}

//If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

function viewProducts() {
  connection.query(
    "SELECT item_id, product_name, price, stock_quantity FROM products",
    function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(
          "Item_id: " +
            res[i].item_id +
            "|| Product_name: " +
            res[i].product_name +
            "|| Price: $" +
            res[i].price +
            "|| Quantity: " +
            res[i].stock_quantity
        );
      }
    }
  );
}

// If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
function viewLowInventory() {
  connection.query(
    "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity <5",

    function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(
          "Item_id: " +
            res[i].item_id +
            "|| Product_name: " +
            res[i].product_name
        );
      }
    }
  );
}

//If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

function addToInventroy() {
  inquirer
    .prompt([
      {
        name: "Id",
        type: "input",
        message:
          "What is the id of the product that you would like to add more?"
      },
      {
        name: "unit",
        type: "input",
        message: "How many items whould you like to add?"
      }
    ])
    .then(function(answers) {
      connection.query(
        "SELECT item_id, stock_quantity FROM products WHERE ?",
        { item_id: parseInt(answers.Id) },
        function(err, res) {
          if (err) throw err;
          var newQuantity = res[0].stock_quantity + parseInt(answers.unit);
          connection.query(
            "UPDATE products SET ?",
            { stock_quantity: newQuantity },
            function(err, res) {
              if (err) throw err;
              inquirer
                .prompt([
                  {
                    name: "newitemid",
                    type: "list",
                    message:
                      "Is there any item that you would like to add more to it?",
                    choices: ["Yes", "No,back to main menu"]
                  }
                ])
                .then(function(answers) {
                  if (answers.newitemid === "Yes") {
                    addToInventroy();
                  } else if (answers.newitemid === "No,back to main menu") {
                    Start();
                  }
                });
            }
          );
        }
      );
    });
}

// If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

function addNewProduct() {
  inquirer
    .prompt([
      {
        name: "itemname",
        type: "input",
        message: "what is the product's name that you would like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "what is the department's name?"
      },
      {
        name: "price",
        type: "input",
        message: "what is the price?"
      },
      {
        name: "unit",
        type: "input",
        message: "How many units is available?"
      }
    ])
    .then(function(answers) {
      connection.query(
        "INSERT INTO products SET ?",

        {
          product_name: answers.itemname,
          department_name: answers.department,
          price: parseInt(answers.price),
          stock_quantity: parseInt(answers.unit)
        },
        function(err, res) {
          if (err) throw err;
        }
      );
    });
}
