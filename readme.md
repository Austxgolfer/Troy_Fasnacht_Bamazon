This is a basic inventory tracking program that runs in Node and uses a MySQL database to track inventory. The bamazonCustomer.js file contains all the code necessary to run this application

Node will require the following NPMs to be installed for this program to function
-inquirer
-cli-table
-Mysql

There will also need to be a database created called "bamazon" with one table called products

The program will generate a table with all the current inventory in the database. You will then be prompted to input the item to be purchased and the quantity required.

The program with verify the quantity is available then process the transaction by updating the database.

The total cost of the transaction will be displayed with it is determined the correct inventory is available
