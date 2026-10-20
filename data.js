document.addEventListener("DOMContentLoaded", () => {
  
  let people = [
    { name: "Alice Johnson", age: 28, city: "New York" },
    { name: "Bob Smith", age: 34, city: "Los Angeles" },
    { name: "Charlie Brown", age: 22, city: "Chicago" },
    { name: "Diana Prince", age: 30, city: "Houston" },
    { name: "Evan Wright", age: 45, city: "Phoenix" },
    { name: "Fiona Gallagher", age: 26, city: "Philadelphia" },
    { name: "George Clark", age: 39, city: "San Antonio" }
  ];

  let sortDirection = {
    name: "asc",
    age: "asc"
  };

  const tableBody = document.getElementById("tableBody");
  const searchInput = document.getElementById("searchInput");
  const sortNameBtn = document.getElementById("sortNameBtn");
  const sortAgeBtn = document.getElementById("sortAgeBtn");

  
  function renderTable(data) {
    tableBody.innerHTML = "";

    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="3" class="no-data">No matching records found</td></tr>`;
      return;
    }

    data.forEach((person) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${person.name}</td>
        <td>${person.age}</td>
        <td>${person.city}</td>
      `;

      tableBody.appendChild(row);
    });
  }

  
  function filterData() {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = people.filter((person) => {
      return (
        person.name.toLowerCase().includes(query) ||
        person.city.toLowerCase().includes(query) ||
        person.age.toString().includes(query)
      );
    });

    renderTable(filtered);
  }

  
  sortNameBtn.addEventListener("click", () => {
    const isAsc = sortDirection.name === "asc";
    
    people.sort((a, b) => {
      return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });

    sortDirection.name = isAsc ? "desc" : "asc";
    sortNameBtn.textContent = `Sort by Name (${isAsc ? "A-Z" : "Z-A"})`;

    filterData(); 
  });

  
  sortAgeBtn.addEventListener("click", () => {
    const isAsc = sortDirection.age === "asc";

    people.sort((a, b) => {
      return isAsc ? a.age - b.age : b.age - a.age;
    });

    sortDirection.age = isAsc ? "desc" : "asc";
    sortAgeBtn.textContent = `Sort by Age (${isAsc ? "Low to High" : "High to Low"})`;

    filterData(); 
  });

  
  searchInput.addEventListener("input", filterData);

  
  renderTable(people);
});