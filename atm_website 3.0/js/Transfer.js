apiUrl = "http://localhost:6009/api/";

function DepositProfile() {
  let authToken = getCookie("authToken");
  let amount = document.getElementById("amount");
  let from_account = document.getElementById("from_account");
  let from_account_id = from_account.options[from_account.selectedIndex].value;
  let to_account = document.getElementById("to_account");
  let to_account_id = to_account.options[to_account.selectedIndex].value;
    let xhttp = new XMLHttpRequest();
    let formData = new FormData();

    let request = new XMLHttpRequest();
    request.open("GET", apiUrl + "accounts?authToken="+getCookie('authToken'));
    request.onload = function() {
      if (this.status === 200) {
        let accounts = JSON.parse(this.response);
        let acc1 = accounts[0]['account_id'];
        let acc2 = accounts[1]['account_id'];

        let from = 0;
        let to = 0;
        if(from_account_id == 1)from = acc1;
        else from = acc2;
        if(to_account_id == 1) to = acc1;
        else to = acc2;

        formData.append('amount', amount.value);
        formData.append('from_account_id', from);
        formData.append('to_account_id', to);
        formData.append('authToken', getCookie("authToken"));

        xhttp.open("POST", apiUrl + "transfers");
        xhttp.onload = function () {
            if (this.status === 200) {
                 alert("Your money was successfully transferred!");
                window.location.href = 'MainMenu.html';
            } else if (this.status === 401) alert("Failed to transfer");
            else if (this.status !== 0) alert("Err.. something happened :(");
        };
        xhttp.send(formData);
      }
    }
    request.send();
}

// function called by login button
function onDeposit() {
    DepositProfile();
}

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
