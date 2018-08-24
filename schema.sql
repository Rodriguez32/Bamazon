create database bamazonDB;

use bamazonDB;

create table products (
item_id int not null auto_increment,
product_name varchar(100) not null,
department_name varchar(50) not null,
price decimal(10,2) not null,
stock_quantity int(10) not null,
primary key(item_id)
);

select * from products;



insert into products(product_name,department_name,price,stock_quantity)
values ("Fire 7 Kids Edition Tablet","Electronics",79.99,150),
	("Badger Suncscreen","Health",13.56,25),
    ("PlayDoh 10-pack case","Arts&Crafts",7.99,25),
    ("Child-Safe Scissors Activity book","Arts&Crafts",4.99,12),
    ("Kleenex wet wipes","Household",14.72,10),
    ("Crayola 24 count box","Toys&Games",5.60,100),
    ("Mead Primary Journal","Toys&Games",6.59,50),
    ("First day of school photo board","Toys&Games",21.95,50),
    ("Rubber Rain boots for boys","Kids",13.90,50),
    ("Kidorable kids space umbrella","Kids",18.00,25);
    
create table Departments(
departmentID int auto_increment not null,
department_name varchar(50) not null,
overHeadCosts decimal(10,2) not null,
TotalSale decimal(10,2) not null,
primary key(departmentID));