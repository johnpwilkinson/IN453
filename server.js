const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const port = 3000;
const net = require("net");

app.use(express.static("public"));
app.use(express.json());

let connection = null;

async function closeConnection() {
  if (connection) {
    try {
      await connection.end();
      console.log("Previous database connection closed.");
    } catch (err) {
      console.error("Error closing previous connection:", err);
    }
    connection = null;
  }
}

app.post("/api/connect", async (req, res) => {
  const { server, database, user, password } = req.body;

  await closeConnection();

  try {
    connection = await mysql.createConnection({
      host: server,
      user,
      password,
      database,
    });
    console.log("Connected to MySQL as", user);
    res.json({ message: "Connected successfully" });
  } catch (err) {
    console.error("Database connection failed:", err);
    connection = null;
    res
      .status(500)
      .json({ error: err.message || "Database connection failed" });
  }
});

app.post("/api/logout", async (req, res) => {
  try {
    await closeConnection();
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout failed:", err);
    res.status(500).json({ error: "Failed to close connection" });
  }
});

app.get("/api/rowcount/a", async (req, res) => {
  if (!connection) {
    return res.status(500).json({ error: "Not connected to database" });
  }

  try {
    const [results] = await connection.query(
      "SELECT COUNT(*) as count FROM network_traffic"
    );
    res.json({ count: results[0].count });
  } catch (err) {
    console.error("MySQL Error:", err);
    res.status(500).json({ error: err.sqlMessage || "Query failed" });
  }
});

app.get("/api/rowcount/c", async (req, res) => {
  if (!connection) {
    return res.status(500).json({ error: "Not connected to database" });
  }

  try {
    const [results] = await connection.query(
      "SELECT COUNT(*) as count FROM applications"
    );
    res.json({ count: results[0].count });
  } catch (err) {
    console.error("MySQL Error:", err);
    res.status(500).json({ error: err.sqlMessage || "Query failed" });
  }
});

app.get("/api/names", async (req, res) => {
  if (!connection) {
    return res.status(500).json({ error: "Not connected to database" });
  }

  try {
    const [results] = await connection.query(
      'SELECT CONCAT(first_name, " ", last_name) as FullName FROM users'
    );
    res.json(results.map((row) => row.FullName));
  } catch (err) {
    console.error("MySQL Error:", err);
    res.status(500).json({ error: err.sqlMessage || "Query failed" });
  }
});

function findAvailablePort(port, callback) {
  const server = net.createServer();

  server.once("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      findAvailablePort(port + 1, callback);
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
