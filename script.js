var uName = document.getElementById('name');
var email = document.getElementById('email');
var password = document.getElementById('password');
var signupBtn = document.getElementById("sign");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginBtn = document.getElementById("loginBtn");
var btnLogout = document.getElementById("btnLogout");
var usernameDisplay = document.getElementById('username');

var container = [];
var nameRegex = /^[a-zA-Z\s]{5,30}$/;

var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
if (signupBtn) {
    signupBtn.addEventListener("click", signup);
}
if (loginBtn) {
    loginBtn.addEventListener("click", login);
}


if (localStorage.getItem('users') == null) {
    container = [];
} else {
    container = JSON.parse(localStorage.getItem('users'));
}

function signup(e) {
    e.preventDefault(); 

    var errorMessage = "";
    if (!validation(nameRegex, uName)) {
        errorMessage += "Name must be 3-20 characters long and contain only letters and spaces.\n";
    }
    if (!validation(emailRegex, email)) {
        errorMessage += "Please enter a valid email address.\n";
    }


    if (!validation(passwordRegex, password)) {
        errorMessage += "Password must be at least 8 characters long and contain at least one letter and one number.\n";
    }


    if (prevUser()) {
        errorMessage += "Email is already registered.\n";
    }


    if (errorMessage === "") {
         const users = {
            userName: uName.value,
            userMail: email.value,
            userPassword: password.value,
        };
        container.push(users);
        localStorage.setItem("users", JSON.stringify(container));
        console.log(localStorage);

        clearInput();
        window.location.href = 'index.html';
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
        });
    }

    /*

    if (validation(nameRegex, uName) && validation(emailRegex, email) && validation(passwordRegex, password) && !prevUser()) {
        const users = {
            userName: uName.value,
            userMail: email.value,
            userPassword: password.value,
        };

        container.push(users);
        localStorage.setItem("users", JSON.stringify(container));
        console.log(localStorage);

        clearInput();
        window.location.href = 'index.html';
    } else {
        alert("Please ensure all fields are valid and the email is not already registered.");
    }*/
}

function validation(pattern, val) {
    return pattern.test(val.value);
}

function prevUser() {
    for (let index = 0; index < container.length; index++) {
        if (container[index].userMail.toLowerCase() === email.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function clearInput() {
    uName.value = '';
    email.value = '';
    password.value = '';
}



function login(e) {

    e.preventDefault();


    if (loginEmail.value=='' || loginPassword.value==""){
        Swal.fire("password or email is empty try again ");
        return false;
    } 

        let userFound = false;
    for (let i = 0; i < container.length; i++) {
        if ( loginEmail.value.toLowerCase()  === container[i].userMail.toLowerCase()  && loginPassword.value  === container[i].userPassword    ) {
           localStorage.setItem('loginUser',container[i].userName)
           window.location.href = 'home.html';  // i know that i can use setAttribute to login  button and put href and home.html
           userFound = true;
           break;
        }
    }
    if (!userFound) {
        Swal.fire("Password or email is incorrect.");
    }
}

function myFunction() {
   
    if (loginPassword.type === "password") {
        loginPassword.type = "text";
    } else {
        loginPassword.type = "password";
    }
  }

function myFunction2() {
    
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
  }


  
if (btnLogout) {
    btnLogout.addEventListener("click", logout);
}



function logout() {
    localStorage.removeItem('loginUser');
    window.location.href = 'index.html'; 

}

function appearName() {
    // localStorage.getItem('loginUser',container.userName)
    var loginUser = localStorage.getItem('loginUser');
    if (loginUser && usernameDisplay) {
        usernameDisplay.textContent = loginUser;
    }
}
if (usernameDisplay) {
    appearName();
}
