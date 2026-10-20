document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const ageInput = document.getElementById("age");

  function setError(inputElement, errorElementId, message) {
    const errorSpan = document.getElementById(errorElementId);
    if (message) {
      errorSpan.textContent = message;
      inputElement.classList.add("invalid");
    } else {
      errorSpan.textContent = "";
      inputElement.classList.remove("invalid");
    }
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (value === "") {
      setError(nameInput, "nameError", "Name is required.");
      return false;
    }
    setError(nameInput, "nameError", "");
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === "") {
      setError(emailInput, "emailError", "Email is required.");
      return false;
    } else if (!emailRegex.test(value)) {
      setError(emailInput, "emailError", "Please enter a valid email address.");
      return false;
    }
    setError(emailInput, "emailError", "");
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value;
    if (value === "") {
      setError(passwordInput, "passwordError", "Password is required.");
      return false;
    } else if (value.length < 8) {
      setError(passwordInput, "passwordError", "Password must be at least 8 characters.");
      return false;
    }
    setError(passwordInput, "passwordError", "");
    return true;
  }

  function validateConfirmPassword() {
    const passwordValue = passwordInput.value;
    const confirmValue = confirmPasswordInput.value;

    if (confirmValue === "") {
      setError(confirmPasswordInput, "confirmPasswordError", "Please confirm your password.");
      return false;
    } else if (confirmValue !== passwordValue) {
      setError(confirmPasswordInput, "confirmPasswordError", "Passwords do not match.");
      return false;
    }
    setError(confirmPasswordInput, "confirmPasswordError", "");
    return true;
  }

  function validateAge() {
    const value = ageInput.value.trim();
    const ageNum = parseInt(value, 10);

    if (value === "") {
      setError(ageInput, "ageError", "Age is required.");
      return false;
    } else if (isNaN(ageNum) || ageNum < 18) {
      setError(ageInput, "ageError", "You must be at least 18 years old.");
      return false;
    }
    setError(ageInput, "ageError", "");
    return true;
  }

  
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  passwordInput.addEventListener("input", validatePassword);
  confirmPasswordInput.addEventListener("input", () => {
    validateConfirmPassword();
  });
  passwordInput.addEventListener("input", () => {
    if (confirmPasswordInput.value !== "") {
      validateConfirmPassword();
    }
  });
  ageInput.addEventListener("input", validateAge);


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isAgeValid = validateAge();

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgeValid) {
      alert("Registration successful!");
      form.reset();
    }
  });
});