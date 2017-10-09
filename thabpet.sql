create database thabpet;

use thabpet;

CREATE TABLE login_info(uid INT NOT NULL AUTO_INCREMENT,
				first_name VARCHAR(20),
                last_name VARCHAR(20), 
				  uname VARCHAR(20),
                  pass VARCHAR(20),  
                  PRIMARY KEY(uid), 
                  UNIQUE KEY(uid));
                  
INSERT INTO login_info(first_name, last_name, uname, pass) values("Pranav","Dakshinamurthy","pranav@thabpet.com","Linode@2210");