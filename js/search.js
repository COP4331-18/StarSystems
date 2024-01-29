// Variables
let tableCount = 0;

// Elements
const createBtn = document.getElementById("btnCreate");
const closeModalBtn = document.getElementById("closeBtn");
const inputElements = document.querySelectorAll(".modalInput");

// Event listeners
closeModalBtn.addEventListener("click", clearContactTable);
createBtn.addEventListener("click", addToTable);

// Functions

// Clears the contact table
function clearContactTable() {
  inputElements.forEach((element) => {
    element.value = "";
  });
}

// Add a table row and data to the table dynamically

function addToTable() {
  let contactFirstName = document.getElementById("contactInputFirst").value;
  let contactLastName = document.getElementById("contactInputLast").value;
  let contactEmail = document.getElementById("contactInputEmail").value;
  let contactPhone = document.getElementById("contactInputPhone").value;

  let inputList = [
    contactFirstName,
    contactLastName,
    contactEmail,
    contactPhone,
  ];

  let newTableRow = document.createElement("tr");

  inputList.forEach((input) => {
    let dataEntry = document.createElement("td");
    console.log(input);
    dataEntry.textContent = input;

    newTableRow.appendChild(dataEntry);
  });

  // Create row for the button
  let btnEntry = document.createElement("td");

  // Create edit buttons and icons
  let editBtn = document.createElement("button");
  editBtn.classList.add("roundedBtn");
  let editIcon = document.createElement("ion-icon");
  editIcon.setAttribute("name", "create-sharp");

  editBtn.appendChild(editIcon);

  // Create delete buttons and icons
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("roundedBtn");
  let deleteIcon = document.createElement("ion-icon");
  deleteIcon.setAttribute("name", "person-remove-sharp");

  deleteBtn.appendChild(deleteIcon);

  let space = document.createTextNode(" ");

  // Add both buttons to the table row data
  btnEntry.appendChild(editBtn);
  btnEntry.appendChild(space);
  btnEntry.appendChild(deleteBtn);

  // Add new table row
  newTableRow.appendChild(btnEntry);

  // Add to the table
  const tableBody = document.querySelector("tbody");
  tableBody.appendChild(newTableRow);

  // Clear the input values after inserting
  clearContactTable();
}

// Loops through the avaiable table and displays them
function displayTable() {}
