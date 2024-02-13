const urlBase = "http://cop4331-18.xyz/LAMPAPI";
const extension = ".php";

let userId = 0;
let firstName = "";
let lastName = "";
let page = 1;

// Button elements

let loginBtn = document.getElementById("loginBtn");
console.log(loginBtn);

let registerBtn = document.getElementById("registerBtn");

console.log(registerBtn);

if (registerBtn)
{
  registerBtn.addEventListener("click", doRegister);
}

if (loginBtn)
{
  loginBtn.addEventListener("click", doLogin);
}


function doLogin() {

  console.log("inside the function");
  userId = 0;
  firstName = "";
  lastName = "";

  let login = document.getElementById("userName").value;
  console.log(login);
  let password = document.getElementById("userPassword").value;
  console.log(password);

  let tmp = { login: login, password: password };

  let jsonPayload = JSON.stringify(tmp);

  console.log(tmp);

  let url = urlBase + "/Login" + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.ID;
        sessionStorage.setItem('userId', userId);
        console.log("This is the saved userId " + userId);

        console.log("What is returned from the server: " + jsonObject);

        if (userId < 1) {
          //displayError();
          console.log("Invalid userName/Passwrod");
          let text = document.getElementById("invalidText");
          text.style.display = "block";
          return;
        }
        firstName = jsonObject.FirstName;
        console.log(firstName);
        lastName = jsonObject.LastName;
        console.log(lastName);
        window.location.href = "search.html";
      }

      
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert("Something bad has gone wrong");
  }
}

// Function that switches the pages from login to registration
document.addEventListener("DOMContentLoaded", function () {
  const registerLink = document.getElementById("open-register");
  const loginLink = document.getElementById("open-login");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  
  if (registerLink)
  {
    registerLink.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    });
  }
  
  
  if (loginLink)
  {
    loginLink.addEventListener("click", function (e) {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    });
  }
  
  
});



// Do register back-end

function doRegister() {
  // Grab the input forms details
  console.log("Into function");
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let newUser = document.getElementById("newUser").value;
  let password = document.getElementById("newPassword").value;
  
  

  let tmp = {
    FirstName: firstName,
    LastName: lastName,
    Login: newUser,
    Password: password,
  };
  
  console.log(tmp);

  let jsonPayload = JSON.stringify(tmp);
  
  console.log(jsonPayload);
  
  
  let url = urlBase + "/Register" + extension;
  
  console.log(url);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        
        let text = document.getElementById("validSignUp");
        
        if (jsonObject.error === "1")
        {
          text.innerHTML = "User Already Exists"
        }
        else
        {
          text.innerHTML = "Account Created.";
        }
        
        console.log(jsonObject.error);
        
        text.style.display = "block";
        
        console.log(jsonObject);
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert("Something bad has gone wrong");
  }
}

/****************************** Search functionality *****************************************/

// Elements
const createBtn = document.getElementById("btnCreate");
const closeModalBtn = document.getElementById("closeBtn");
const inputElements = document.querySelectorAll(".modalInput");


const form = document.getElementById("form");
const modal = document.getElementById("exampleModal");
// Create a new Bootstrap modal object from the modal element


const searchBar = document.getElementById("searchBar");

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", resetModal);
}


// Event Listeners

if (searchBar)
{
  searchBar.addEventListener("keyup", searchContact);
}

function resetModal() {
  let inputs = document.querySelectorAll(".modalInput");

  inputs.forEach((input) => {
    input.value = "";
    let formControl = input.parentElement;
    formControl.className = "formControl";
  });

  let popUpText = document.getElementById("acctCreated");
  popUpText.style.display = "none";
  createBtn.style.display = "inline";
}

// Event Listeners
if (createBtn) {
  //createBtn.addEventListener("submit", addContact);
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("Submit button clicked");

    if (isValidInputs()) {
      let popUpText = document.getElementById("acctCreated");
      popUpText.style.display = "block";
      createBtn.style.display = "none";
      addContact();
    }
  });
}

function isValidInputs() {
  let counter = 0; // 4 valid inputs is a pass

  let firstName = document.getElementById("contactInputFirst");
  let lastName = document.getElementById("contactInputLast");
  let email = document.getElementById("contactInputEmail");
  let phone = document.getElementById("contactInputPhone");

  let firstNameText = document.getElementById("contactInputFirst").value.trim();
  let lastNameText = document.getElementById("contactInputLast").value.trim();
  let emailText = document.getElementById("contactInputEmail").value.trim();
  let phoneText = document.getElementById("contactInputPhone").value.trim();

  if (firstNameText === "") {
    setError(firstName);
  } else {
    setSuccess(firstName);
    counter++;
  }

  if (lastNameText === "") {
    setError(lastName);
  } else {
    setSuccess(lastName);
    counter++;
  }

  if (emailText === "") {
    setError(email);
  } else if (!isEmail(emailText)) {
    setError(email);
  } else {
    setSuccess(email);
    counter++;
  }

  if (phoneText === "") {
    setError(phone);
  } else {
    setSuccess(phone);
    counter++;
  }

  if (counter == 4) {
    return 1;
  } else {
    return 0;
  }
}

function setError(element) {
  let formControl = element.parentElement;
  formControl.className = "formControl error";
}

function setSuccess(element) {
  let formControl = element.parentElement;
  formControl.className = "formControl success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function searchContact()
{
  let query = searchBar.value;
  
  loadContacts(query);
}


function addContact() {

  console.log(userId);
  let contactFirstName = document.getElementById("contactInputFirst").value;
  let contactLastName = document.getElementById("contactInputLast").value;
  let contactEmail = document.getElementById("contactInputEmail").value;
  let contactPhone = document.getElementById("contactInputPhone").value;

  let name = contactFirstName + " " + contactLastName;
  
  userId = sessionStorage.getItem('userId');

  let tmp = {
    Name: name,
    Phone: contactPhone,
    Email: contactEmail,
    UserID: userId,
  };

  let jsonPayload = JSON.stringify(tmp);

  console.log(tmp);

  let url = urlBase + "/AddContact" + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

        console.log("(Add contact) What is returned from the server: " + jsonObject);


        if (userId < 1) {
          //displayError();
          return;
        }
        
        loadContacts("");
      }

      // Display Table
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert("Something bad has gone wrong");
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


function deleteRow(event) {
  // Gets the table row containing the td elements
  let tableRow = event.currentTarget.parentNode.parentNode;
  let contactId = tableRow.getAttribute("data-id");
  userId = sessionStorage.getItem("userId");
  
  console.log(contactId);

  let check = confirm("Confirm deletion of contact: ");
  if (check == true) {
    console.log("Into confirm");
    let tmp = {UserID : userId, ID : contactId };
    
    console.log(tmp);

    let jsonPayload = JSON.stringify(tmp);

    console.log(tmp);

    let url = urlBase + "/DeleteContact" + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");
    try {
      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log("Contact has been deleted!");
          loadContacts("");
        }
      };
      xhr.send(jsonPayload);
    } catch (err) {
      alert("Something bad has gone wrong");
    }
  }
}




function saveEdit(event) {
  // Get parent element
  // Hide the save button and bring back the edit button
  event.currentTarget.style.display = "none";

  event.currentTarget.previousSibling.previousSibling.style.display =
    "inline-flex";

  // Gets the table row containing the td elements
  let tableRow = event.currentTarget.parentNode.parentNode;

  //
  let contactId = tableRow.getAttribute("data-id");
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
  }

  // Send to back-end
  let name = input[0] + " " + input[1];

  userId = sessionStorage.getItem("userId");

  let tmp = {
    Name: name,
    Phone: input[3],
    Email: input[2],
    UserID: userId,
    ID: contactId,
  };

  let jsonPayload = JSON.stringify(tmp);

  console.log(tmp);

  let url = urlBase + "/UpdateContact" + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Contact has been updated!");
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert("Something bad has gone wrong");
  }
}


function loadContacts(search) {
  let searchResult = search;
  userId = sessionStorage.getItem("userId");

  let tmp = { UserID: userId, search : searchResult };

  let jsonPayload = JSON.stringify(tmp);

  console.log(tmp);

  let url = urlBase + "/SearchContact" + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

        // How to create a brand new table
        let table = document.querySelector("table"); // Select the first table
        let tbody = table.querySelector("tbody"); // Select the tbody inside the table
        tbody.innerHTML = ""; // This will remove all contents inside the tbody

        for (let i = 0; i < jsonObject.results.length; i++) {
          let id = jsonObject.results[i].ID;
          console.log(id);
          let name = jsonObject.results[i].Name.split(" ");
          let contactFirstName = name[0];
          let contactLastName = name[1];
          let contactEmail = jsonObject.results[i].Email;
          let contactPhone = jsonObject.results[i].Phone;

          let inputList = [
            contactFirstName,
            contactLastName,
            contactEmail,
            contactPhone,
          ];

          let newTableRow = document.createElement("tr");
          newTableRow.setAttribute("data-id", id);

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

        }
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert("Something bad has gone wrong");
  }
}



let prevBtn = document.getElementById("prev");

let nextBtn = document.getElementById("next");

if (prevBtn)
{
  prevBtn.addEventListener("click", loadPagesPrev);
}

if (nextBtn)
{
  nextBtn.addEventListener("click", loadPagesNext);
}


function loadPagesPrev()
{
  page--;
  
  userId = sessionStorage.getItem("userId");
  
  let tmp = { UserID : userId, page : page };

  let jsonPayload = JSON.stringify(tmp);

  console.log(tmp);

  let url = urlBase + "/AllContacts" + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
      
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

        // How to create a brand new table
        let table = document.querySelector("table"); // Select the first table
        let tbody = table.querySelector("tbody"); // Select the tbody inside the table
        tbody.innerHTML = ""; // This will remove all contents inside the tbody

        for (let i = 0; i < jsonObject.results.length; i++) {
          let id = jsonObject.results[i].ID;
          console.log(id);
          let name = jsonObject.results[i].Name.split(" ");
          let contactFirstName = name[0];
          let contactLastName = name[1];
          let contactEmail = jsonObject.results[i].Email;
          let contactPhone = jsonObject.results[i].Phone;

          let inputList = [
            contactFirstName,
            contactLastName,
            contactEmail,
            contactPhone,
          ];

          let newTableRow = document.createElement("tr");
          newTableRow.setAttribute("data-id", id);

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

        }
      }
      
      
      
      }

      
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert("Something bad has gone wrong");
  }
}






function loadPagesNext()
{
  page++;
  
  userId = sessionStorage.getItem("userId");
  
  let tmp = { UserID : userId, page : page };

  let jsonPayload = JSON.stringify(tmp);

  console.log(tmp);

  let url = urlBase + "/AllContacts" + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
      
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

        // How to create a brand new table
        let table = document.querySelector("table"); // Select the first table
        let tbody = table.querySelector("tbody"); // Select the tbody inside the table
        tbody.innerHTML = ""; // This will remove all contents inside the tbody

        for (let i = 0; i < jsonObject.results.length; i++) {
          let id = jsonObject.results[i].ID;
          console.log(id);
          let name = jsonObject.results[i].Name.split(" ");
          let contactFirstName = name[0];
          let contactLastName = name[1];
          let contactEmail = jsonObject.results[i].Email;
          let contactPhone = jsonObject.results[i].Phone;

          let inputList = [
            contactFirstName,
            contactLastName,
            contactEmail,
            contactPhone,
          ];

          let newTableRow = document.createElement("tr");
          newTableRow.setAttribute("data-id", id);

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

        }
      }
      
      
      
      }

      
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert("Something bad has gone wrong");
  }
}




