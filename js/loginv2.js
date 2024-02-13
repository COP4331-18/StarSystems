const urlBase = "http://cop4331-18.xyz/LAMPAPI";
const extension = ".php";

let userId = 0;
let firstName = "";
let lastName = "";

// Button elements

let loginBtn = document.getElementById("loginBtn");

let registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", doRegister);
loginBtn.addEventListener("click", doLogin);

function doLogin() {
  userId = 0;
  firstName = "";
  lastName = "";

  let loginText = document.getElementById("userName").value;
  console.log(login);
  let passwordT = document.getElementById("userPassword").value;
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
        console.log("This is the saved userId " + userId);

        console.log("What is returned from the server: " + jsonObject);

        if (userId < 1) {
          //displayError();
          return;
        }
        firstName = jsonObject.FirstName;
        console.log(firstName);
        lastName = jsonObject.LastName;
        console.log(lastName);
        alert("You have logged in");
      }

      // window.location.href = "search.html";
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

  registerLink.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });
  loginLink.addEventListener("click", function (e) {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });
});

// Do register back-end

function doRegister() {
  // Grab the input forms details
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let newUser = document.getElementById("newUser").value;
  let password = document.getElementById("newPassword").value;

  let tmp = {
    firstName: login,
    lastName: lastName,
    login: newUser,
    password: password,
  };

  let jsonPayload = JSON.stringify(tmp);

  console.log(tmp);

  let url = urlBase + "/Register" + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset-UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

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

// Event Listeners
createBtn.addEventListener("click", addContact);


function addContact() {
  let contactFirstName = document.getElementById("contactInputFirst").value;
  let contactLastName = document.getElementById("contactInputLast").value;
  let contactEmail = document.getElementById("contactInputEmail").value;
  let contactPhone = document.getElementById("contactInputPhone").value;

  let name = contactFirstName + " " + contactLastName;

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

        console.log("What is returned from the server: " + jsonObject);

        if (userId < 1) {
          //displayError();
          return;
        }
      }

      // Display Table
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert("Something bad has gone wrong");
  }
}
