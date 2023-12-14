CREATE TABLE Child_Care_Services(
	"Facility ID" INT PRIMARY KEY NOT NULL,   -- COLUMN 1
	"Program Type" VARCHAR(4) NOT NULL,       -- COLUMN 2
	"Region Code" VARCHAR(8) NOT NULL,               -- 3
	"County" VARCHAR(50) NOT NULL,                   -- 4 -- in "" to make the 1st letter capatalized!
	"Facility Status" VARCHAR(50) NOT NULL,          -- 5
	"Facility Name" VARCHAR(200),                    -- 6
	"Address Omitted" VARCHAR(3),             		 -- 7
	"Street Number" VARCHAR(30),               		 -- 8
	"Street Name" VARCHAR(55),   			  		 -- 9
	"Additional Address" VARCHAR(80),   	  		 -- 10
	"Floor" VARCHAR(20), 					  		 -- 11
	"Apartment" VARCHAR(30),					  	 -- 12
	"City" VARCHAR(30),       				  		 -- 13
	"State" VARCHAR(2), 					  		 -- 14
	"Zip Code" INT,         				  		 -- 15
	"Phone Number Omitted" VARCHAR(3),		  		 -- 16
	"Phone Number" VARCHAR(13),				  		 -- 17
	"Phone Extension" VARCHAR(10),			  		 -- 18
	"Provider Name" VARCHAR(80),			  		 -- 19
	"School District Name" VARCHAR(50),		 		 -- 20
	"Capacity Description" VARCHAR(80),		 		 -- 21
	"Infant Capacity" INT,							 -- 22
	"Toddler Capacity" INT,							 -- 23
	"Preschool Capacity" INT,						 -- 24
	"School Age Capacity" INT, 						 -- 25
	"Total Capacity" INT,							 -- 26
	"Program Profile" VARCHAR(80),					 -- 27
	"Latitude" VARCHAR(25),							 -- 28
	"Longitude" VARCHAR(25)   						 -- 29	
);

SELECT * FROM Child_Care_Services;
-- -- --------------------------------------------------------------------
-- QUERIES TO CLEAN THE DATA
ALTER TABLE Child_Care_Services
	DROP COLUMN "Address Omitted", 
	DROP COLUMN "Additional Address",
	DROP COLUMN "Floor", 
	DROP COLUMN "Apartment", 
	DROP COLUMN "Phone Number Omitted";