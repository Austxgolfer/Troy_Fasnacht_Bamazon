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
