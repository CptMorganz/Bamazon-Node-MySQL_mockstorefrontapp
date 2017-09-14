var mysql = require("mysql");
var prompt = require("prompt");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Temple42captain",
  database: "bamazon"
});

// Connect to Database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

// Padding function to make the table look pretty.
// Code from Thomas Thompson(tomtom28) on Github.
function padText(titleText, entryText){
  
  // Left and Right Padding
  var padLeft;
  var padRight;

  // Subtract text lengths
  var splitLength = (titleText.length - entryText.length)/2;

  // Loop through length difference to get proper padding
  var pad = '';
  for(var j=0; j < splitLength; j++){
    pad += ' ';
  }

  // Handle odd sized lengths
  if(Number.isInteger(splitLength)){
    padLeft = pad;
    padRight = pad;
  }
  else{
    padLeft = pad;
    padRight = pad.substring(0, pad.length-1); // remove last space
  }

  // Return newly padded entry for table
  return padLeft + entryText + padRight;
}

// Display All Items inside Database and sell an item to customer
connection.query("SELECT * FROM Products", function(err, res){
  
  // Error Handler
  if(err) throw err;

  // Show User message
  console.log('Check out our selection...\n');

  // Set up table header
  console.log('  ID  |      Product Name      |  Department Name  |   Price  | In Stock');
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
  
  // Loop through database and show all items
  for(var i = 0; i < res.length; i++){

    // ---------- Add in padding for table ----------
    var itemID = res[i].ItemID + ''; 
    itemID = padText("  ID  ", itemID);

    var productName = res[i].ProductName + ''; 
    productName = padText("      Product Name      ", productName);

    var departmentName = res[i].DepartmentName + ''; 
    departmentName = padText("  Department Name  ", departmentName);

    var price = '$' + res[i].Price.toFixed(2) + ''; 
    price = padText("   Price  ", price);

    var quantity = res[i].StockQuantity + ''; 

    // Log table entry
    console.log(itemID + '|' + productName + '|' + departmentName + '|' + price + '|    ' + quantity);
  }

  // Prompt for items customer wishes to purchase.
  prompt.start();

  // Ask for the itemID of the item to be purchased.
  console.log("\nPlease enter the ID of the item you wish to purchase.");
  prompt.get(["purchaseID"], function(err,result) {

  	var purchaseID = result.purchaseID;

  	// Ask for how many the customer wishes to purchase.
  	console.log("\nHow many of this item would you like to buy?");
  	prompt.get(["purchaseQuantity"], function(err,result) {

  		var purchaseQuantity = result.purchaseQuantity;

  		// Check the DB to see if there is enough items to be purchased.
  		connection.query("SELECT StockQuantity FROM products WHERE ?", [{ItemID: purchaseID}], function(err, res) {

  			if(err) throw err;

  			// Check if there is an ID that matches the ID given by customer.
  			if(res[0] == undefined) {
  				console.log("Sorry, there were no items with the ID: " + purchaseID);
  				connection.end();
  			} else { 
  				// Check it there is enough items in stock to meet the customers order.
  				var dbQuantity = res[0].StockQuantity;

  				if(dbQuantity >= purchaseQuantity) {
  					// Update the database with the new stock value
  					var updateInv = parseInt(dbQuantity) - parseInt(purchaseQuantity);

  					connection.query("UPDATE products SET ? WHERE ?", [{StockQuantity: updateInv}, {ItemID: purchaseID}], function(err,res) {
  						if(err) throw err;
  					}); // End of DB UPDATE.

  					// Give the customer the total price to complete the purchase.
  					var total;
  					connection.query("SELECT Price FROM products WHERE ?", [{ItemID: purchaseID}], function(err,res) {
  						var itemPrice = res[0].Price;
  						total = purchaseQuantity * itemPrice.toFixed(2);
  						total = total.toFixed(2);

  						console.log("\nYour total for this purchase is $" + total + ".");
  						console.log("\nThank you for your purchase please come again!");

  						// End the connection
  						connection.end();
  					}); // End of third Query.
  				} else {
  					// There isn't enough in stock to make the purchase.
  					console.log("\nSorry, we only have " + dbQuantity +" in stock. Please place an order for that amount or lower.");
  					connection.end();
  				}
  			}

  		}); // End of second Query.

  	}); // End of second prompt.

  }); // End first prompt.

}); // End Main Query.