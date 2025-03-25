const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const net = require("net");

app.use(express.static("public"));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "joshuaw6",
  database: "in453",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.get("/api/rowcount", (req, res) => {
  connection.query(
    "SELECT COUNT(*) as count FROM network_traffic",
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ count: results[0].count });
    }
  );
});

app.get("/api/names", (req, res) => {
  connection.query(
    'SELECT CONCAT(first_name, " ", last_name) as FullName FROM users',
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results.map((row) => row.FullName));
    }
  );
});

function findAvailablePort(port, callback) {
  const server = net.createServer();

  server.once("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      findAvailablePort(port + 1, callback); // Try the next port
    } else {
      callback(null);
    }
  });

  server.once("listening", () => {
    server.close(() => callback(port));
  });

  server.listen(port);
}

findAvailablePort(port, (finalPort) => {
  if (!finalPort) {
    console.error("Could not find an open port.");
    process.exit(1);
  }

  app.listen(finalPort, () => {
    console.log(`Server running on http://localhost:${finalPort}`);
  });
});
