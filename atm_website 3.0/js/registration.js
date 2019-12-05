// $(document).ready(function() {
//     $('#contact_form').bootstrapValidator({
//         feedbackIcons: {
//             valid: 'glyphicon glyphicon-ok',
//             invalid: 'glyphicon glyphicon-remove',
//             validating: 'glyphicon glyphicon-refresh'
//         },
//         fields: {
//             first_name: {
//                 validators: {
//                         stringLength: {
//                         min: 2,
//                     },
//                         notEmpty: {
//                         message: 'Please enter your First Name'
//                     }
//                 }
//             },
//              last_name: {
//                 validators: {
//                      stringLength: {
//                         min: 2,
//                     },
//                     notEmpty: {
//                         message: 'Please enter your Last Name'
//                     }
//                 }
//             },
// 			 user_name: {
//                 validators: {
//                      stringLength: {
//                         min: 8,
//                     },
//                     notEmpty: {
//                         message: 'Please enter your Username'
//                     }
//                 }
//             },
// 			 user_password: {
//                 validators: {
//                      stringLength: {
//                         min: 8,
//                     },
//                     notEmpty: {
//                         message: 'Please enter your Password'
//                     }
//                 }
//             },
// 			confirm_password: {
//                 validators: {
//                      stringLength: {
//                         min: 8,
//                     },
//                     notEmpty: {
//                         message: 'Please confirm your Password'
//                     }
//                 }
//             },
//             email: {
//                 validators: {
//                     notEmpty: {
//                         message: 'Please enter your Email Address'
//                     },
//                     emailAddress: {
//                         message: 'Please enter a valid Email Address'
//                     }
//                 }
//             },
//             contact_no: {
//                 validators: {
//                   stringLength: {
//                         min: 12,
//                         max: 12,
//                     notEmpty: {
//                         message: 'Please enter your Contact No.'
//                      }
//                 }
//             },

//                 }
//             }
//         })
//         .on('success.form.bv', function(e) {
//             $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
//                 $('#contact_form').data('bootstrapValidator').resetForm();

//             e.preventDefault();

//             var $form = $(e.target);


//             var bv = $form.data('bootstrapValidator');

//             $.post($form.attr('action'), $form.serialize(), function(result) {
//                 console.log(result);
//             }, 'json');
//         });
// });

// Get html fields for later use



let apiUrl = "http://localhost:6009/api";

// Created a new user profile in the database
function createProfile(first, last, username, password, email,phone_number,address,pin) {

    let xhttp = new XMLHttpRequest();
    //messageText.innerText = "Creating user " + username;
    let messageText = document.getElementById('log-text');
let errorText = document.getElementById('error-text');
    xhttp.onload = function () {

        //messageText.innerText = "";
        errorText.innerText = "";
        if (this.status === 200) {
					alert("Successfully created user: " + username);
					let auth = new XMLHttpRequest();
					auth.open("GET",apiUrl + "/auth?username="+username+"&password="+password);
					auth.onload = function () {
						if(this.status === 200){
							token = this.responseText;
							document.cookie = 'authToken='+token;
							let acc1 = new XMLHttpRequest();
							let acc2 = new XMLHttpRequest();
							acc1.open("POST", apiUrl + "/accounts?authToken="+token+"&type=CHECKING");
							acc2.open("POST", apiUrl + "/accounts?authToken="+token+"&type=SAVINGS");
							acc2.onload = function () {
								window.location.href = "MainMenu.html";
							}
							acc1.send();
							acc2.send();
						}
					}
					auth.send();
			}
        else if (this.status === 403) alert("Username already exists.");
        else if (this.status !== 0)alert("Err.. something happened :(");
    };
    xhttp.open("POST", apiUrl+"/user_profiles?first_name=" + first +"&last_name=" + last + "&username=" + username + "&password=" + password +
        "&email=" + email + "&phone_number=" + phone_number + "&address=" + address + "&pin=" + pin, true);
    xhttp.send();
}





// function called by sign in button
function onSignUp() {


let usernameField = document.getElementById('username');
let first_nameField = document.getElementById('first_name');
let last_nameField = document.getElementById('last_name');
let passwordField = document.getElementById('password');
let EmailField = document.getElementById('email');
let AddressField = document.getElementById('address');
let PhoneField = document.getElementById('contact_no');
let PinField = document.getElementById('Pin');
		let first = first_nameField.value;
		let last = last_nameField.value;
    let username = usernameField.value;
    let password = passwordField.value;
    let email = EmailField.value;
    let phone_number = PhoneField.value;
    let address = AddressField.value;
    let pin = PinField.value;
    createProfile(first, last, username, password,email,phone_number,address,pin);
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
