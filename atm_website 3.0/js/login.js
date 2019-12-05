apiUrl = "http://localhost:6009/api/";

function loginProfile(username, password) {
    let xhttp = new XMLHttpRequest();
    error_text = document.getElementById("error_text");
    xhttp.open("GET", apiUrl + "auth?username=" + username + "&password=" + password, true);
    xhttp.onload = function () {
        error_text.innerText = "";
        if (this.status === 200) {
            document.cookie = "authToken=" + this.responseText;
            console.log(this.responseText);
            window.location.href = 'MainMenu.html';
        } else if (this.status === 400) error_text.innerText = "Invalid username or password";
        else if (this.status !== 0) error_text.innerText = "Err.. something happened :(";
    };
    xhttp.send();
}

// function called by login button
function onLogin() {
    usernameField = document.getElementById("username");
    passwordField = document.getElementById("password");
    let username = usernameField.value;
    let password = passwordField.value;
    loginProfile(username, password);
}
