
CREATE DATABASE IF NOT EXISTS in453;
USE network_data_db;

CREATE TABLE network_traffic (
    sequence INT PRIMARY KEY,           -- Unique identifier for each record
    source VARCHAR(15) NOT NULL,        -- IP address of the source (e.g., 192.102.122.87)
    destination VARCHAR(15) NOT NULL,   -- IP address of the destination (e.g., 127.50.110.170)
    domain VARCHAR(50),                 -- Domain name (e.g., geocities.jp)
    length INT,                         -- Packet length (e.g., 1274)
    info VARCHAR(64)                    -- Hash or info string (e.g., 99ccefa6635c2f892f8171ff55d90d6525f553dde2746799d3b9bbbd22b3eca0)
);


CREATE TABLE applications (
    app_id VARCHAR(50) PRIMARY KEY,     -- Application identifier (e.g., gov.ftc.Fixflex)
    app_name VARCHAR(50) NOT NULL,      -- Name of the application (e.g., Zathin)
    app_version VARCHAR(10),            -- Version of the application (e.g., 2.2)
    source VARCHAR(15) NOT NULL,        -- Source IP address (e.g., 233.173.245.114)
    destination VARCHAR(15) NOT NULL,   -- Destination IP address (e.g., 88.12.36.81)
    dig_sig VARCHAR(64)                 -- Digital signature (e.g., 1237244f66dba6ac98797429b3a92c78b726da60b24ad69938279949a3e55cf2)
);


CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY,     -- Unique email as primary key (e.g., tfinnan0@fastcompany.com)
    first_name VARCHAR(50) NOT NULL,    -- User's first name (e.g., Talia)
    last_name VARCHAR(50) NOT NULL,     -- User's last name (e.g., Finnan)
    source VARCHAR(15) NOT NULL,        -- Source IP address (e.g., 74.66.205.206)
    destination VARCHAR(15) NOT NULL    -- Destination IP address (e.g., 196.24.125.220)
);

