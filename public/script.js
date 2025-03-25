document.getElementById("getData").addEventListener("click", async () => {
  try {
    const rowCountResponse = await fetch("/api/rowcount");
    const rowCountData = await rowCountResponse.json();
    document.getElementById(
      "rowCount"
    ).textContent = `IN453A Row Count: ${rowCountData.count}`;

    const namesResponse = await fetch("/api/names");
    const names = await namesResponse.json();
    console.log("Names:", names);
    const namesList = document.getElementById("namesList");
    namesList.innerHTML = "";
    names.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      namesList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
