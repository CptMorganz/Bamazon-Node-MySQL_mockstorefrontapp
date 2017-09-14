# Bamazon!
## A Node and MySQL mock Amazon-like storfront application.

Uses Node to interact with a MySQL database to offer a list of items for customers to choose to purchase and how many they wish to purchase of that item.

It then checks the database to see if the item selected was listed and if there is enough in stock to sell to the customer.

* First: An example of the application on start up.
	* Run `node bamazonCustomer.js` in GitBash.
	![example1.png](/images/example1.png)

* Then enter the ID of the item you wish to purchase and the quantity
	![example2.png](/images/example2.png)

* The app will then charge you an amount based on the quantity and the price of the item selected. It will also update the database to show the item as being sold and amount in stock decreasing as you can see in the example picture below
	![example3.png](/images/example3.png)

* If the user tries to use an ID that is not registered then the app will inform them of the error and then end connection to the database.
	![example4.png](/images/example4.png)

* If the user tries to purchase a quantity that is higher than the amount in stock the app will also inform them of the error and end connection to the database.
	![example5.png](/images/example5.png)

That's all for my Bamazon Application for now. I hope to work on a manager portion of it in the future but for now this is what I have working.