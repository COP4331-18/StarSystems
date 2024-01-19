const urlBase = "http://cop4331-18.xyz/LAMPAPI";
const extension = "php";

let userId = 0;
let firstName = "";
let lastName = "";

const loginButton = document.getElementById("mainButton");

loginButton.addEventListener("click", doLogin());

function doLogin() {
  userId = 0;
  firstName = "";
  lastName = "";

  let login = document.getElementById("userName").value;
  let password = document.getElementById("userPassword").value;

  let tmp = { login: login, password: password };

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/Login" + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json;  charset-UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;
      }
      if (userId < 1) {
        alert("User/password combination incorrect");
        return;
      }

      firstName = jsonObject.firstName;
      lastName = jsonObject.lastName;

      // window.location.href = "signup"
      alert("You logged in");
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert("Something bad has gone wrong");
  }
}
