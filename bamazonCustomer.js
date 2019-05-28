//required assets for node
var table = require("table");
var inquire = require("inquirer");
var mysql = require("mysql");
//import { table, getBorderCharacters } from "table";
//table template for display of database data
//var config = {
//border: getBorderCaracters("norc")
//};
var data;
var purchase = [];
//connection to mysql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Lokidog_01",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
function selectItem() {
  inquire
    .prompt([
      {
        message: "Enter the ID number of the item you would like to purchase.",
        type: "number",
        name: "ID"
      }
    ])
    .then(function(answer) {
      purchase.push(answer.ID);
      qtyReqst();
    });
} //end or selectitem function

function qtyReqst() {
  inquire
    .prompt([
      {
        message: "Enter the quanitity you would like to purchase.",
        type: "number",
        name: "Qty"
      }
    ])
    .then(function(answer) {
      purchase.push(answer.Qty);
      console.log(purchase);
    });
} // end of function to inquire about quantity

selectItem();
