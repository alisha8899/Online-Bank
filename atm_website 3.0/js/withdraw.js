apiUrl = "http://localhost:6009/api/";

function DepositProfile() {
  let authToken = getCookie("authToken");
  let amount = document.getElementById("amount");
  let account = document.getElementById('account');
  let account_id = account.options[account.selectedIndex].value;

  let request = new XMLHttpRequest();
  request.open("GET", apiUrl + "accounts?authToken="+getCookie('authToken'));
  request.onload = function() {
    if (this.status === 200) {
      let accounts = JSON.parse(this.response);
      let acc1 = accounts[0]['account_id'];
      let acc2 = accounts[1]['account_id'];

      let from = 0;
      if(account_id == 1)from = acc1;
      else from = acc2;

      let xhttp = new XMLHttpRequest();
      let formData = new FormData();

      formData.append('amount', amount.value);
      formData.append('account_id', from);
      formData.append('authToken', getCookie("authToken"));

      xhttp.open("POST", apiUrl + "withdraw");
      xhttp.onload = function () {
          if (this.status === 200) {
               alert("You have successfully withdrawn your money!");
              window.location.href = 'ATMmainmenu.html';
          } else if (this.status === 401) alert("Failed to withdraw money");
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
