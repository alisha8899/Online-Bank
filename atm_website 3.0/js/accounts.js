let accountArea = document.getElementById("account-area");
let userProfile = document.getElementById("user-profile");
let accountType = document.getElementById("account-select");
let token = getCookie("authToken");

let apiUrl = "http://localhost:6009/api";

window.onload = loadAccounts();

// if you want something to happen when the page loads, link a function to window.onload
function loadAccounts() {

    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.status === 200) {

            // clear the account area's html so we can put our own
            accountArea.innerHTML = "";

            // get the API respose as a json file (basically a dictionary)
            let json = JSON.parse(this.response);

            let exist = false;
            // really strange way javascript makes us iterate through a dict
            for (var key in json) {
                if (json.hasOwnProperty(key)) {
                    let account_id = json[key]["account_id"];
                    let type = json[key]["type"];
                    let balance = json[key]["balance"];
                    accountArea.innerHTML += create_html_account(account_id, type, balance);
                    exist = true;
                }
            }

            if (!exist) {
                accountArea.innerHTML = "No accounts found."
            }
        }
    };
    xhttp.open('GET', apiUrl + '/accounts?authToken=' + token, false);
    xhttp.send();

    xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.response);
            userProfile.innerText = json['username'];
            userProfile.innerText = this.responseText;
        }
    };
    xhttp.open("GET", apiUrl + "/user_profiles?authToken=" + token, true);
    xhttp.send();
}


function onCreateAccount() {
    // wacko method of getting data out of a drop down menu
    let type = accountType.options[accountType.selectedIndex].text;

    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.status === 200) {
            M.toast({html: "Created new " + type + " account."});
            loadAccounts();
        }
    };
    xhttp.open("POST", apiUrl + "/accounts?type=" + type + "&authToken=" + token, true);
    xhttp.send();
}

// Super specific function (DONT REUSE) that creates a silly looking account display
function create_html_account(account_id, type, balance) {
    return "<div class=\"card-panel light-green lighten-1\">\n" +
        "                        <p>Account id: " + account_id + "</p>\n" +
        "                        <div class=\"row\">\n" +
        "                            <div class=\"col m6\"><p>" + type + "</p></div>\n" +
        "                            <div class=\"col m6 right-align\"><p>Balance : " + balance + "</p></div>\n" +
        "                        </div>\n" +
        "                    </div>" +
        "";
}

// little script for grabbing cookies by name from browser
// I use it for grabbing the authentication token that we save on login
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