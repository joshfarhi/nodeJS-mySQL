var mysql = require('mysql');
var inquirer = require('inquirer');

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon"
  });

connection.connect(function (err) {
  if (err) throw err;
  readProducts();
});

readProducts();
userInput();

function readProducts() {
  console.log("...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);

    for (i = 0; i < res.length; i++) {
      console.log("Item: " + res[i].item_id);
      console.log("Product: " + res[i].product_name);
      console.log("Department: " + res[i].department_name);
      console.log("Price: " + res[i].price);
      console.log("Quantity: " + res[i].stock_quantity);
      console.log("///////////////////////////////////////")
    }
  });
}



function userInput() {
  var questions = [
    {
      type: 'input',
      name: 'userI',
      message: 'Enter the product ID '
    },
    {
      type: 'input',
      name: 'userQ',
      message: 'Enter the quantity '
    }]; inquirer.prompt(questions).then(function (answers) {
      var pID = answers.userI;
      var uQ = answers.userQ;

      


    });


}




