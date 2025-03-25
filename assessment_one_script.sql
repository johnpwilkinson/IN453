
CREATE DATABASE IF NOT EXISTS in453;
USE network_data_db;

CREATE TABLE network_traffic (
    sequence INT PRIMARY KEY,           
    source VARCHAR(15) NOT NULL,        
    destination VARCHAR(15) NOT NULL,   
    domain VARCHAR(50),                 
    length INT,                         
    info VARCHAR(64)                    
);


CREATE TABLE applications (
    app_id VARCHAR(50) PRIMARY KEY,     
    app_name VARCHAR(50) NOT NULL,      
    app_version VARCHAR(10),            
    source VARCHAR(15) NOT NULL,        
    destination VARCHAR(15) NOT NULL,   
    dig_sig VARCHAR(64)                 
);


CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY,     
    first_name VARCHAR(50) NOT NULL,    
    last_name VARCHAR(50) NOT NULL,     
    source VARCHAR(15) NOT NULL,        
    destination VARCHAR(15) NOT NULL    
);

