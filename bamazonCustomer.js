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
    userInput(res);
  });
}

function userInput(results) {
  var questions = [
    {
      type: 'input',
      name: 'userI',
      message: 'Enter the product ID: '
    },
    {
      type: 'input',
      name: 'userQ',
      message: 'Enter the quantity: '
    }]; inquirer.prompt(questions).then(function (answers) {
      var pID = answers.userI;
      var uQ = answers.userQ;
      var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id == pID) {
            chosenItem = results[i];
            
          }
        }
      if (chosenItem.stock_quantity >= uQ) {
        connection.query("UPDATE products SET ? WHERE ?",
        [{
          stock_quantity: chosenItem.stock_quantity - uQ
        }, 
        {item_id: chosenItem.item_id}
      ])
      console.log("Order successfully placed!")
      console.log("Total Price: " + uQ * chosenItem.price)
      } else {
        console.log("Please enter a lower quantity")
      }
        

    });

connection.end();
}




