// Welcome Page
function goToSignUp() {
  window.location.href = "Sign-Up.html";
}

// SignUp Page

// HTML Inputs
let usernameInput = document.getElementsByName("username")[0],
  emailInput = document.getElementsByName("email")[0],
  passwordInput = document.getElementsByName("password")[0],
  confirmPasswordInput = document.getElementsByName("confirmPassword")[0];

// Regex Patterns
let userNamePattern = /^[a-zA-Z][a-zA-Z0-9]{5,14}[a-zA-Z]$/g,
  emailPattern = /^[a-zA-Z0-9_]+@[a-zA-Z]+\.[a-zA-Z]{1,3}$/g;

//   Validation Functions
let validateUsername = (form, username) => {
  if (userNamePattern.test(username)) {
    console.log("Valid User Name");
  } else {
    console.log("InValid User Name");
    usernameInput.value = "";
    usernameErrMsg.innerText =
      "Please Enter a User Name that must consist of 5 to 15 characters, only letters and numbers are allowed, with no numbers at the beginning or the end ";
    form.classList.add("was-validated");
  }
};

let validateEmail = (form, email) => {
  if (emailPattern.test(email)) {
    console.log("Valid Email");
  } else {
    console.log("InValid Email");
    emailInput.value = "";
    emailErrMsg.innerText = "Please Enter a vaild Email";
    form.classList.add("was-validated");
  }
};

let validatePass = (form, password) => {
  if (password.length >= 8) {
    console.log("Valid Password");
  } else {
    console.log("InValid Password");
    passwordInput.value = "";
    passErrMsg.innerText = "Please Enter a Password greater than 8 chars";
    form.classList.add("was-validated");
  }
};

let ValidateConfirmPassword = (form, password, confirmPassword) => {
  if (password === confirmPassword) {
    console.log("Password Confirmed");
  } else {
    console.log("Password Not Confirmed");
    passwordInput.value = "";
    confirmPasswordInput = "";
    confrimPassErrMsg.innerText = "Inconfirmed Password";
    form.classList.add("was-validated");
  }
};

let fetchEndPoint = async (userData) => {
  const url = "https://goldblv.com/api/hiring/tasks/register";

  const params = {
    userename: userData.username,
    email: userData.email,
    password: userData.password,
    password_confirmation: userData.confirmPassword,
  };

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((response) => {
      window.location.href = `Succeed.html?email=${params.email}`;
  });
};

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      async (event) => {
        let userInputs = {
          username: event.target.username.value,
          email: event.target.email.value,
          password: event.target.password.value,
          confirmPassword: event.target.confirmPassword.value,
        };
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          // UserName Validation
          validateUsername(form, userInputs.username);

          // Email Validation
          validateEmail(form, userInputs.email);

          // Password Validation
          validatePass(form, userInputs.password);

          // Confrim Password Validation
          ValidateConfirmPassword(
            form,
            userInputs.password,
            userInputs.confirmPassword
          );
        } else {
          event.preventDefault();
          event.stopPropagation();
          console.log(userInputs);
          await fetchEndPoint(userInputs);
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
