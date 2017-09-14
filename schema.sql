DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
ItemID INTEGER AUTO_INCREMENT PRIMARY KEY,
ProductName VARCHAR(30),
DepartmentName VARCHAR(30),
Price DOUBLE(10,2),
StockQuantity INTEGER);

-- Seed Items into Database
INSERT INTO products(ProductName, DepartmentName, Price, StockQuantity)
VALUES ("Orange Juice", "grocery", 3.50, 18),
  ("Milk", "grocery", 2.99, 29),
  ("HD Monitor", "electronics", 199.99, 5), -- I need one.
  ("Guild Wars 2", "electronics", 49.99, 14), -- Really want the Expansion. 
  ("iPad", "electronics", 399.99, 8),
  ("Bowflex", "sporting goods", 999.99, 2), -- I need one of these as well.
  ("Football", "sporting goods", 9.99, 49),
  ("Harry Potter Series", "books", 69.99, 10),
  ("Game of Thrones", "books", 19.99, 30), -- Winter is here!
  ("Eragon", "books", 14.99, 13),
  ("WonderWoman", "movies", 17.99, 36),  
  ("Logan", "movies", 15.99, 21),
  ("It", "movies", 19.99, 15); -- Hate scary movies.

-- View Database Entries
SELECT * FROM products;