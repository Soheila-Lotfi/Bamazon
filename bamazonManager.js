var inquirer = require("inquirer");

inquirer
  .prompt([
    {
      name: "Option",
      type: "list",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    }
  ])
  .then(function(answers) {});
