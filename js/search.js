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
  editBtn.addEventListener("click", editTable);

  editBtn.appendChild(editIcon);

  // Create save buttons, icons, and event listerners
  let saveBtn = document.createElement("button");
  saveBtn.classList.add("roundedBtn", "saveBtn");
  let saveIcon = document.createElement("ion-icon");
  saveIcon.setAttribute("name", "checkmark-sharp");
  saveBtn.addEventListener("click", saveEdit);

  saveBtn.appendChild(saveIcon);

  saveBtn.style.display = "none";

  // Create delete buttons and icons
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("roundedBtn", "deleteBtn");
  let deleteIcon = document.createElement("ion-icon");
  deleteIcon.setAttribute("name", "person-remove-sharp");
  deleteBtn.addEventListener("click", deleteRow);

  deleteBtn.appendChild(deleteIcon);

  let space = document.createTextNode(" ");
  let space2 = document.createTextNode(" ");

  // Add both buttons to the table row data
  btnEntry.appendChild(editBtn);
  btnEntry.appendChild(space2);
  btnEntry.appendChild(saveBtn);
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

function deleteRow() {}

function saveEdit(event) {
  // Get parent element
  // Hide the save button and bring back the edit button
  event.currentTarget.style.display = "none";

  event.currentTarget.previousSibling.previousSibling.style.display =
    "inline-flex";

  // Gets the table row containing the td elements
  let tableRow = event.currentTarget.parentNode.parentNode;
  // saves childes nodes into array
  let childNodes = tableRow.childNodes;

  // Going to store the important values into the array
  let input = [];

  for (let i = 0; i < 4; i++) {
    console.log(childNodes[i]);
    let text = childNodes[i].firstChild.value;

    console.log(text);
    input.push(text);

    childNodes[i].innerHTML = text;

    // Send info to backend data base.
  }
}

function editTable(event) {
  console.log(event.currentTarget);
  event.currentTarget.style.display = "none";

  // Get the button next sibling
  event.currentTarget.nextSibling.nextSibling.style.display = "inline-flex";

  // Grab the parent table row
  let tableRow = event.currentTarget.parentNode.parentNode;

  let childNodes = tableRow.childNodes;

  for (let i = 0; i < 4; i++) {
    // Save the text
    let text = childNodes[i].textContent;
    childNodes[i].textContent = "";

    // Create a input
    let inputElement = document.createElement("input");
    inputElement.classList.add("tableInput");
    inputElement.type = "text";
    inputElement.value = text;

    childNodes[i].appendChild(inputElement);
  }
}
