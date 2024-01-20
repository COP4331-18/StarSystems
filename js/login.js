const urlBase = "http://cop4331-18.xyz/LAMPAPI";
const extension = ".php";

let userId = 0;
let firstName = "";
let lastName = "";

const loginButton = document.getElementById("mainButton");
const inputButtons = document.querySelectorAll(".userInput");

// Once the input buttons are selected remove all the errors if they are placed.
inputButtons.forEach((button) => {
  button.addEventListener("focus", removeError);
});

// Removes the password incorret erros
function removeError() {
  document.getElementById("errorMessage").style.display = "none";
  document.getElementById("iconImg").classList.remove("addShake");
  document.getElementById("containerContent").classList.remove("addShake");
}

// Adds a shake to the elements and displays error messages.
function displayError() {
  document.getElementById("errorMessage").style.display = "block";

  // Shake animation
  // add class to img IconImg
  // add class to containerContent
  document.getElementById("iconImg").classList.add("addShake");
  document.getElementById("containerContent").classList.add("addShake");
}

function doLogin() {
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
        console.log("This is the saved userId " + userId);

        console.log("What is returned from the server: " + jsonObject);

        if (userId < 1) {
          displayError();
          return;
        }
        firstName = jsonObject.FirstName;
        console.log(firstName);
        lastName = jsonObject.LastName;
        console.log(lastName);
        alert("You have logged in");
      }

      // window.location.href = "signup"
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert("Something bad has gone wrong");
  }
}

loginButton.addEventListener("click", doLogin);
