apiUrl = "http://localhost:6009/api/";

function DepositProfile() {
  let username = document.getElementById("username")
  let pin = document.getElementById("pin");

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", apiUrl + "auth?username="+username.value+"&pin="+pin.value);
    xhttp.onload = function () {
        if (this.status === 200) {
             document.cookie = 'authToken='+this.responseText;
            window.location.href = 'ATMmainmenu.html';
        } else if (this.status === 400) alert("Failed to log in");
        else if (this.status !== 0) alert("Err.. something happened :(");
    };
    xhttp.send();
}

// function called by login button
function onDeposit() {
    DepositProfile();
}
