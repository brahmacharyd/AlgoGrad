// Generate random math question
const num1 = Math.floor(Math.random() * 10) + 1;
const num2 = Math.floor(Math.random() * 10) + 1;
const correctAnswer = num1 + num2;

// Display the math question
document.getElementById('math-question').textContent = `${num1} + ${num2}`;

// Form elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const mathInput = document.getElementById('math-challenge');
const submitButton = document.getElementById('submit-btn');

// Error message elements
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const mathError = document.getElementById('math-error');

// Validation functions
function validateName() {
  const namePattern = /^[a-zA-Z\s]*$/;
  if (!nameInput.value.match(namePattern)) {
    nameError.textContent = 'Enter a valid Name.';
    nameInput.classList.add('invalid');
    return false;
  } else {
    nameError.textContent = '';
    nameInput.classList.remove('invalid');
    return true;
  }
}

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.match(emailPattern)) {
    emailError.textContent = 'Enter a valid email address.';
    emailInput.classList.add('invalid');
    return false;
  } else {
    emailError.textContent = '';
    emailInput.classList.remove('invalid');
    return true;
  }
}

function validatePhone() {
    const phonePattern = /^\d{10}$/; // Matches exactly 10 digits
    if (!phoneInput.value.match(phonePattern)) {
      phoneError.textContent = 'Enter a valid Phone number.';
      phoneInput.classList.add('invalid');
      return false;
    } else {
      phoneError.textContent = '';
      phoneInput.classList.remove('invalid');
      return true;
    }
  }
  
function validateMath() {
  const userAnswer = parseInt(mathInput.value, 10);
  if (userAnswer !== correctAnswer) {
    mathError.textContent = 'Incorrect answer.';
    mathInput.classList.add('invalid');
    return false;
  } else {
    mathError.textContent = '';
    mathInput.classList.remove('invalid');
    return true;
  }
}

// Handle form validation individually
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
mathInput.addEventListener('input', validateMath);

// Final validation when clicking the button
submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default form submission

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isMathValid = validateMath();

  if (isNameValid && isEmailValid && isPhoneValid && isMathValid) {
    alert('Form submitted successfully!');
    document.getElementById('signup-form').reset();
    submitButton.disabled = true;
  } else {
    alert('Please correct the errors in the form.');
  }
});
