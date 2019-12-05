

let messageText = document.getElementById('log-text');
let errorText = document.getElementById('error-text');
let usernameField = document.getElementById('username');
let first_nameField = document.getElementById('first_name');
let last_nameField = document.getElementById('last_name');
let passwordField = document.getElementById('password');
let EmailField = document.getElementById('email');
let AddressField = document.getElementById('address');
let PhoneField = document.getElementById('contact_no');
let PinField = document.getElementById('Pin');


let apiUrl = "http://localhost:6009/api/";

// Created a new user profile in the database
function call_put_user(first_name, last_name, username, password, pin, email, phone, address) {
    let request = new XMLHttpRequest();
    request.open('PUT', apiUrl + 'user_profiles');
    request.onload = function () {
        if (this.status === 200) {
          alert('You have successfully updated your account settings!')
          window.location.href = "MainMenu.html";
        }
        else alert('Failed to modify user');
    };

    let formData = new FormData();
    formData.append('authToken', getCookie('authToken'));
    if(first_name !== '') formData.append('first_name',first_name);
    if(last_name !== '') formData.append('last_name',last_name);
    if(username !== '') formData.append('username',username);
    if(password !== '') formData.append('password',password);
    if(pin !== '') formData.append('pin',pin);
    if(email !== '') formData.append('email',email);
    if(phone !== '') formData.append('phone_number',phone);
    if(address !== '') formData.append('address',address);
    request.send(formData);
}

    function onmodify() {
      let first = first_nameField.value;
      let last = last_nameField.value;
      let username = usernameField.value;
      let password = passwordField.value;
      let email = EmailField.value;
      let phone_number = PhoneField.value;
      let address = AddressField.value;
      let pin = PinField.value;
      call_put_user(first, last, username, password,email,phone_number,address,pin);
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
