import Firebase from './firebase';

if (Firebase.auth().currentUser !== null) {
    Firebase.auth().signOut();
}

const email = document.getElementById('email-text');
const password = document.getElementById('password-text');
const loginButton = document.getElementById('login-button');
const errorDisplay = document.querySelector('.error-message');
const loginTextDiv = document.querySelector('.login-text');
const loginFormDiv = document.querySelector('.login-form');

loginButton.addEventListener('click', () => {
    if (email.value !== null || (password.value !== null && password.value.length >= 6)) {
        //login here

        Firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then((response) => {

            if (response.user.email.includes("hr")) {
                window.location.href = "hr.html";
            } else if(response.user.email.includes("emp")) {
                window.location.href = "emp.html";
            } else if (response.user.email.includes("manager")) {
                window.location.href = "manager.html";
            }
        }).catch((error) => {
                loginTextDiv.style.height = '300px';
                loginFormDiv.style.height = '300px';
                errorDisplay.style.display = 'block';
                errorDisplay.innerHTML = 'Error: ' + error.message;
        });

    } else {
        alert("There's an error in your inputs please check again!");
    }
}, false);