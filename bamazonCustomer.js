var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bamazon"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw err;
    console.log(result[i]);
  });
});