apiUrl = "http://localhost:6009/api/";

loadAccounts();

function loadAccounts() {
  let acc = new XMLHttpRequest();

  console.log(document.getElementById("account"));
  acc.open("GET", apiUrl + "accounts?authToken="+getCookie('authToken'))
  acc.onload = function () {
    if(this.status === 200){
      let accounts = JSON.parse(this.response);
      document.getElementById('check1').setAttribute('value',accounts[0]['account_id'])
      document.getElementById('sav1').setAttribute('value',accounts[1]['account_id'])
    }
  }
  acc.send();
}

function DepositProfile() {
  let numberField = document.getElementById("number");
  let error_text = document.getElementById("error_text");
  let image_path = document.getElementById("image").files[0];
  let account = document.getElementById("account");
  let account_id = account.options[account.selectedIndex].value;
    let xhttp = new XMLHttpRequest();
    let formData = new FormData();

    formData.append('image_path', image_path);
    formData.append('account_id', account_id);
    formData.append('authToken', getCookie("authToken"));
    formData.append('check_amount', numberField.value);

    xhttp.open("POST", apiUrl + "checks");
    xhttp.onload = function () {
        if (this.status === 200) {
             alert("Your check was successfully submitted!");
            window.location.href = 'MainMenu.html';
        } else if (this.status === 401) alert("Failed to deposit check");
        else if (this.status !== 0) alert("Err.. something happened :(");
    };
    xhttp.send(formData);
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
