-- Use the provided information to create a table schema.
-- Create the Child Care Regulated Programs Table
CREATE TABLE Child_Care_Services(
	"Facility ID" INT PRIMARY KEY NOT NULL,   -- COLUMN 1
	"Program Type" VARCHAR(4) NOT NULL,       -- COLUMN 2
	"Region Code" VARCHAR(8) NOT NULL,               -- 3
	County VARCHAR(50) NOT NULL,                     -- 4
	"Facility Status" VARCHAR(50) NOT NULL,          -- 5
	"Facility Name" VARCHAR(200),                    -- 6
-- 	"Facility Opened Date" DATE,              		 -- 7
-- 	"License Issue Date" DATE,                		 -- 8
-- 	"License Expiration Date" DATE,           		 -- 9
	"Address Omitted" VARCHAR(3),             		 -- 10
	"Street Number" VARCHAR(30),               		 -- 11
	"Street Name" VARCHAR(55),   			  		 -- 12
	"Additional Address" VARCHAR(80),   	  		 -- 13
	"Floor" VARCHAR(20), 					  		 -- 14
	Apartment VARCHAR(30),					  		 -- 15
	City VARCHAR(30),       				  		 -- 16
	"State" VARCHAR(2), 					  		 -- 17
	"Zip Code" INT,         				  		 -- 18
	"Phone Number Omitted" VARCHAR(3),		  		 -- 19
	"Phone Number" VARCHAR(13),				  		 -- 20
	"Phone Extension" VARCHAR(10),			  		 -- 21
	"Provider Name" VARCHAR(80),			  		 -- 22
	"School District Name" VARCHAR(50),		 		 -- 23
	"Capacity Description" VARCHAR(80),		 		 -- 24
	"Infant Capacity" INT,							 -- 25
	"Toddler Capacity" INT,							 -- 26
	"Preschool Capacity" INT,						 -- 27
	"School Age Capacity" INT, 						 -- 28
	"Total Capacity" INT,							 -- 29
	"Program Profile" VARCHAR(80),					 -- 30
	Latitude VARCHAR(25),							 -- 31
	Longitude VARCHAR(25)   						 -- 32	
);

SELECT * FROM Child_Care_Services;
-- -----------------------------------------------------------------