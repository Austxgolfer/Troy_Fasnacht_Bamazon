//required assets for node
var cliTable = require("cli-table");
var inquire = require("inquirer");
var mysql = require("mysql");
var displayArray = [];
var purchase = [];
var y;
var table = new cliTable({
  head: ["ID_#", "Name", "Dept", "Cost", "Qty"],
  colWidths: [8, 25, 10, 8, 8]
});
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
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (x = 0; x < res.length; x++) {
      displayArray[x] = Array.from([
        res[x].item_id,
        res[x].prod_name,
        res[x].dept_name,
        res[x].price,
        res[x].onhand_qty
      ]);
      table.push(displayArray[x]);
    }
    console.log(table.toString());
  });
});

function selectItem() {
  console.log("");
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
    .then(function(resp) {
      purchase.push(resp.Qty);
      console.log(purchase);
      checkInv();
    });
} // end of function to inquire about quantity

function checkInv() {
  var query = "select * from products where ?";
  connection.query(query, { item_id: purchase[0] }, function(err, res) {
    if (err) throw err;
    if (res[0].onhand_qty >= purchase[1]) {
      console.log("We have the inventory the order will be placed.");
      console.log(
        "The total cost of you order will be $",
        purchase[1] * res[0].price
      );
      updateDB();
    } else {
      console.log(
        "there is not enough inventory for this order. Please select another item."
      );
    }
  }); //end of connection query function
} //end of check inventory function

function updateDB() {
  var newData = "update products set onhand_qty = ? where item_id = ?";
  var chkData = "select onhand_qty from products where ?";
  connection.query(chkData, { item_id: purchase[0] }, function(err, res) {
    if (err) throw err;
    var newQty = res[0].onhand_qty - purchase[1];
    connection.query(newData, [newQty, purchase[0]], function(err, res) {
      if (err) throw err;
      connection.query(chkData, { item_id: purchase[0] }, function(err, res) {
        if (err) throw err;
        if (res[0].onhand_qty === newQty) {
          console.log("Transaction completed.");
          connection.end();
        }
      });
    });
  });
}
selectItem();
