

DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE bamazon.products (

    item_id INT NOT NULL auto_increment,
    product_name VARCHAR (30) NOT NULL,
    department_name VARCHAR (30)  NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INT (10) NOT NULL,
    product_sales DECIMAL (10,2) NULL,
    PRIMARY KEY (item_id)
);
 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("kitkat", "food", 2 , 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hamilton Beach Blender", "Electronics", 200,500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Digital photography", "books", 45,1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Versace black and gold ring", "jewelery", 2000 ,100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("donut", "food", 3,2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sequin coat", "clothing", 139.99,50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mini bucket bag", "clothing", 39.99,150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("orange juice", "food", 4.99,5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sumsung TV", "Electronics", 1500,230);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Piza", "food", 6.99,3000);



-- ------------------------------------------------------- Create a new table- department---------------

CREATE TABLE departments (
    department_id INT NOT NULL auto_increment,
    department_name VARCHAR (30) NOT NULL,
    over_head_costs DECIMAL (10,2) NOT NULL,
    PRIMARY KEY (department_id)

);


INSERT INTO departments (department_name, over_head_costs)
VALUES ("clothing", 10000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("food", 350000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("jewelery", 500000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 100000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("books", 30000);


--- -----------------------------------------------------------------------------------------------------


