let connectionConfig = null;

document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const server = document.getElementById("server").value;
    const database = document.getElementById("database").value;
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;


    const serverRegex = /^[a-zA-Z0-9.-]+$/; // Alphanumeric, dots, hyphens
    const dbRegex = /^[a-zA-Z0-9_]+$/; // Alphanumeric, underscores
    const userRegex = /^[a-zA-Z0-9_]+$/; // Alphanumeric, underscores
    if (!serverRegex.test(server) || !dbRegex.test(database) || !userRegex.test(user)) {
        alert("Invalid input format. Use only alphanumeric characters, dots, or hyphens.");
        return;
    }
    
    connectionConfig = { server, database, user, password };

    try {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ server, database, user, password }),
        credentials: 'include' // Include cookies
    });
    if (response.ok) {
        sessionStorage.setItem('sessionToken', (await response.json()).token);
        document.getElementById("user_name").textContent = user ? `Hello ${user}` : "";
        document.getElementById("dataSection").style.display = "block";
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("logout").style.display = "block";
    }

      await fetchRowCountA();
      await fetchRowCountC();
      await fetchUserNames();
    } catch (error) {
      alert("Failed to connect to the database: " + error.message);
      console.error(error);
    }
  });

document.getElementById("logout").addEventListener("click", async () => {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Logout failed");
    }

    document.getElementById("dataSection").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("user_name").textContent = "";
    document.getElementById("rowCountA").textContent = "";
    document.getElementById("rowCountC").textContent = ""; // Fixed typo from rowCountB
    document.getElementById("namesList").innerHTML = "";
    connectionConfig = null;
  } catch (error) {
    alert("Failed to logout: " + error.message);
    console.error(error);
  }
});

async function fetchRowCountA() {
  try {
    const rowCountResponse = await fetch("/api/rowcount/a");
    const rowCountData = await rowCountResponse.json();

    if (!rowCountResponse.ok) {
      throw new Error(
        rowCountData.error || "Failed to fetch row count for IN453A"
      );
    }

    document.getElementById(
      "rowCountA"
    ).textContent = `Row Count: ${rowCountData.count}`;
  } catch (error) {
    console.error("Error fetching row count A:", error);
    document.getElementById(
      "rowCountA"
    ).textContent = `Error: ${error.message}`;
  }
}

async function fetchRowCountC() {
  try {
    const rowCountResponse = await fetch("/api/rowcount/c");
    const rowCountData = await rowCountResponse.json();

    if (!rowCountResponse.ok) {
      throw new Error(
        rowCountData.error || "Failed to fetch row count for IN453C"
      );
    }

    document.getElementById(
      "rowCountC"
    ).textContent = `Row Count: ${rowCountData.count}`;
  } catch (error) {
    console.error("Error fetching row count C:", error);
    document.getElementById(
      "rowCountC"
    ).textContent = `Error: ${error.message}`;
  }
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

async function fetchUserNames() {
  const namesList = document.getElementById("namesList");
  namesList.innerHTML = "";

  try {
    const namesResponse = await fetch("/api/names");
    const namesData = await namesResponse.json();

    if (!namesResponse.ok) {
      throw new Error(namesData.error || "Failed to fetch names for IN453B");
    }

    namesData.forEach((name) => {
      const li = document.createElement("li");
      li.innerHTML = escapeHTML(name); // Escape output
      namesList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching names:", error);
    namesList.innerHTML = `<li style="color: red;">Error: ${error.message}</li>`;
  }
}
