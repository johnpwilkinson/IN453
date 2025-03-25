 
CREATE USER 'IN453A'@'localhost' IDENTIFIED BY 'passwordA';
CREATE USER 'IN453B'@'localhost' IDENTIFIED BY 'passwordB';
CREATE USER 'IN453C'@'localhost' IDENTIFIED BY 'passwordC';

 
GRANT SELECT ON in453.network_traffic TO 'IN453A'@'localhost';
GRANT SELECT ON in453.users TO 'IN453A'@'localhost';
GRANT SELECT ON in453.applications TO 'IN453A'@'localhost';

GRANT SELECT ON in453.users TO 'IN453B'@'localhost';
GRANT SELECT ON in453.applications TO 'IN453C'@'localhost';

FLUSH PRIVILEGES;