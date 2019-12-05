apiUrl = "http://localhost:6009/api/";



let request = new XMLHttpRequest();
request.open("GET", apiUrl + "accounts?authToken="+getCookie('authToken'));
request.onload = function() {
  if (this.status === 200) {
    let checkingsField = document.getElementById("Checkings");
    let savingsField = document.getElementById("Savings");
    let accounts = JSON.parse(this.response);
    checkingsField.innerText = "Checkings: $" + accounts[0]['balance'];
    savingsField.innerText = "Savings: $" + accounts[1]['balance'];
  }
}
request.send();

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
