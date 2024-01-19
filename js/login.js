const urlBase = "http://cop4331-18.xyz/LAMPAPI";
const extension = ".php";

let userId = 0;
let firstName = "";
let lastName = "";

const loginButton = document.getElementById("mainButton");

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
          alert("User/Password combination incorrect");
          return;
        }
        firstName = jsonObject.FirstName;
        console.log(FirstName);
        lastName = jsonObject.LastName;
        console.log(LastName);
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
