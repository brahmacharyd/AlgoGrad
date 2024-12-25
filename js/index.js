// formspamvalidation
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

// formspamvalidation


// Modal
// Function to open the modal dynamically based on data-modal attribute
function openModal(event) {
    event.preventDefault(); // Prevent default link behavior (scrolling)

    const modalId = event.target.getAttribute('data-modal'); // Get the value of data-modal
    const modal = document.getElementById(modalId); // Get the modal element with the corresponding ID

    if (modal) {
        modal.style.display = 'flex'; // Show the modal
        document.body.classList.add('no-scroll'); // Disable body scrolling when modal is open
    }
}

// Function to close the modal
function closeModal() {
    const modal = document.querySelector('.modal[style="display: flex;"]'); // Get the currently visible modal
    if (modal) {
        modal.style.display = 'none'; // Hide the modal
        document.body.classList.remove('no-scroll'); // Enable body scrolling
    }
}

// Add event listener for the "apply-btn" button or any element with data-modal attribute
document.querySelectorAll('[data-modal]').forEach(function (button) {
    button.addEventListener('click', openModal); // Add click event for all elements with data-modal attribute
});

// Close modal when close button is clicked
const closeBtns = document.querySelectorAll('.close-btn');
closeBtns.forEach(function (closeBtn) {
    closeBtn.addEventListener('click', closeModal); // Add event listener for each close button
});

// Close modal if user clicks outside of modal content
window.addEventListener('click', function (event) {
    const modal = document.querySelector('.modal[style="display: flex;"]'); // Get the currently visible modal
    if (modal && event.target === modal) {
        modal.style.display = 'none'; // Hide the modal
        document.body.classList.remove('no-scroll'); // Enable body scrolling
    }
});

// Modal



// program glance
document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.the-program-at-a-glance-container .main-content .left-container .items .item');
    const totalSteps = items.length;
    let currentStepIndex = 0;

    // Function to update progress bar for active item
    function updateProgressBar() {
        // Hide progress bars and images for all items
        items.forEach(item => {
            const progressContainer = item.querySelector('.progress');
            const stepImage = item.querySelector('.step-image');
            if (progressContainer) {
                progressContainer.style.display = 'none';  // Hide the progress bar
            }
            if (stepImage) {
                stepImage.style.display = 'none';  // Hide the image
            }
        });

        // Show the progress bar and image for the active item
        const activeItem = items[currentStepIndex];
        const progressContainer = activeItem.querySelector('.progress');
        const stepImage = activeItem.querySelector('.step-image');

        if (progressContainer) {
            progressContainer.style.display = 'block';  // Show the progress bar
            const progressBar = progressContainer.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = '0%';  // Reset width before starting the animation

                // Force reflow to trigger the animation
                progressBar.offsetWidth;

                progressBar.style.transition = 'width 3s ease-in-out';  // Smooth transition
                setTimeout(() => {
                    progressBar.style.width = '100%';  // Fill the progress bar
                }, 0);
            }
        }

        if (stepImage) {
            stepImage.style.display = 'block';  // Show the related image
        }

        // Update the right-side image dynamically
        const programImage = document.getElementById('program-image');
        const newImageUrl = activeItem.getAttribute('data-image');
        if (programImage && newImageUrl) {
            programImage.src = newImageUrl;  // Update the image source dynamically
        }
    }

    function activateStep() {
        // Remove 'active' class from all items
        items.forEach(item => item.classList.remove('active'));

        // Add 'active' class to the current item
        items[currentStepIndex].classList.add('active');

        // Reset the progress bar and update it
        updateProgressBar();

        // Move to the next step (loop back to the first step if at the end)
        currentStepIndex = (currentStepIndex + 1) % totalSteps;
    }


    // Function to activate a specific step based on user click
    function activateStepOnClick(index) {
        currentStepIndex = index;  // Set the clicked item as the active step
        activateStep();  // Call activateStep to update everything (progress bar, image, etc.)
    }

    // Add click event listeners to each item
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            activateStepOnClick(index);  // Manually activate the clicked step
        });
    });

    // Start the automatic loop, changing steps every 3 seconds
    setInterval(activateStep, 4000); // 3000 ms = 3 seconds

    // Initialize the first step
    activateStep();
});



window.addEventListener('scroll', function () {
    const steps = document.querySelectorAll('.mobile-step');
    const progressBar = document.getElementById('progress');
    const windowHeight = window.innerHeight;
    const windowMiddle = window.scrollY + windowHeight / 2; // Middle of the viewport
    let activatedSteps = 0;  // Track the number of active steps

    steps.forEach((step, index) => {
        const stepTop = step.getBoundingClientRect().top + window.scrollY;
        const stepBottom = stepTop + step.offsetHeight;
        const stepMiddle = stepTop + step.offsetHeight / 2; // Middle of the step

        // Check if the middle of the step is within the viewport's middle
        if (stepMiddle <= windowMiddle && stepMiddle >= windowMiddle - windowHeight) {
            activatedSteps = index + 1;  // Mark the current step as active
            // Activate the step
            step.classList.add('active');
            step.querySelector('.bullet').classList.add('active');
            step.querySelector('.mobile-step-content .heading').style.color = '#fff';
            step.querySelector('.mobile-step-content .description').style.color = '#fff';
        } else {
            // Deactivate the step
            step.classList.remove('active');
            step.querySelector('.bullet').classList.remove('active');
            step.querySelector('.mobile-step-content .heading').style.color = 'hsla(0, 0%, 100%, .7)';
            step.querySelector('.mobile-step-content .description').style.color = 'hsla(0, 0%, 100%, .6)';
        }
    });

    // Calculate the progress based on activated steps
    const progressHeight = (activatedSteps / steps.length) * 100;
    progressBar.style.height = progressHeight + '%'; // Update the height of the progress bar

    // Optionally, for a smoother effect, you could also change the width or position based on scroll progress
    // const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - windowHeight)) * 100;
    // progressBar.style.width = scrollPercentage + '%'; // If you prefer a horizontal progress bar
});

// program glance



// scrolltop

// Function to scroll to the top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to show/hide the scroll to top button based on scroll position
window.onscroll = function () {
    const scrollToTopBtn = document.querySelector('.scroll-to-top-container');
    if (document.body.scrollTop > window.innerHeight / 1 || document.documentElement.scrollTop > window.innerHeight / 1) {
        scrollToTopBtn.style.display = 'flex'; // Show button
    } else {
        scrollToTopBtn.style.display = 'none'; // Hide button
    }
};
// scrolltop

// sidebar
// Function to toggle the side menu
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.querySelector('.mobile-nav-toggle');

    // Toggle 'open' class for the side menu
    sidebar.classList.toggle('open');

    // Toggle 'collapsed' class for the button to change its appearance (optional)
    toggleButton.classList.toggle('collapsed');
    toggleButton.classList.toggle('open');
}

// sidebar



// sticky
window.addEventListener('scroll', function () {
    var stickyCourseInfoContainer = document.getElementById('stickyCourseInfo');
    if (!stickyCourseInfoContainer) return; // Ensure the element exists

    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    var pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Define a margin to handle fractional scroll positions
    var margin = 5;

    // If the user is at or very close to the bottom of the page
    if (scrollPosition >= pageHeight - margin) {
        stickyCourseInfoContainer.classList.remove('sticky');
        stickyCourseInfoContainer.style.display = 'none';
    } else if (scrollPosition > pageHeight / 6) {
        // Make the sticky element visible for sufficient scrolling
        stickyCourseInfoContainer.classList.add('sticky');
        stickyCourseInfoContainer.style.display = 'block';
    } else {
        // Hide the sticky element for minimal scrolling
        stickyCourseInfoContainer.classList.remove('sticky');
        stickyCourseInfoContainer.style.display = 'none';
    }
});

// sticky


// weekScript
// Select all week divs
const weeks = document.querySelectorAll('.week');

// Select content sections
const contentHeading = document.getElementById('content-heading');
const contentPoints = document.getElementById('content-points');

// Define content for each week (you can replace with actual content)
const weekContent = {
    1: {
        heading: 'Building Foundations',
        points: [
            'HTML & CSS: Structuring and Styling Websites',
            'JavaScript Essentials: Programming for the Web',
            'Version Control with Git and GitHub',
            'Responsive Design and Accessibility',
        ]
    },
    2: {
        heading: 'Frontend Development',
        points: [
            'Advanced JavaScript Concepts',
            'React Basics: Components, State, and Props',
            'Introduction to Angular: Modules and Components',
            'Building Dynamic User Interfaces with Frontend Frameworks',
        ]
    },
    3: {
        heading: 'Backend Development',
        points: [
            'Introduction to Node.js and Express.js',
            'Database Management with MongoDB',
            'Creating RESTful APIs',
            'Authentication and Authorization with JWT',
        ]
    },
    4: {
        heading: 'Full-Stack Development',
        points: [
            'Integrating Frontend and Backend',
            'Building End-to-End Features',
            'Error Handling and Debugging Techniques',
            'Deployment Basics with Heroku and AWS',
        ]
    },
    5: {
        heading: 'Certification Phase',
        points: [
            'Deep Dive into Your Chosen Technology Stack (MERN or MEAN)',
            'Mock Certification Projects and Assessments',
            'Hands-on Practice with Industry-Standard Tools',
            'Prepare for Certification in Your Selected Technology',
        ]
    },
    6: {
        heading: 'Real-Time Project',
        points: [
            'Work on a Live Full-Stack Project',
            'Collaborate with a Mentor for Real-World Problem Solving',
            'Deploy and Showcase Your Project',
            'Final Presentation and Portfolio Building',
        ]
    }
};

// Event listener for week selection
weeks.forEach(week => {
    week.addEventListener('click', () => {
        // Remove active class from all weeks
        weeks.forEach(w => w.classList.remove('active'));

        // Add active class to clicked week
        week.classList.add('active');

        // Get the week number
        const weekNumber = week.getAttribute('data-week');

        // Update content dynamically
        if (weekContent[weekNumber]) {
            contentHeading.textContent = weekContent[weekNumber].heading;
            contentPoints.innerHTML = weekContent[weekNumber].points.map(point => {
                return `<div class="point"><img src="./assets/img/download_check.svg" alt="tick"> ${point}</div>`;
            }).join('');
        }
    });
});

// Set Week 1 as the default active week
document.addEventListener('DOMContentLoaded', () => {
    // Select the first week (Week 1)
    const firstWeek = document.querySelector('.week[data-week="1"]');

    // Trigger click event on Week 1 to set it as active and load its content
    if (firstWeek) {
        firstWeek.click();
    }
});

// weekScript


// slider

document.addEventListener("DOMContentLoaded", function () {
    const sliderItems = document.querySelectorAll(".slider-item");

    // Define the colors for the box-shadow and text color dynamically
    const shadowColors = [
        "rgba(255, 150, 150, 0.5)",  // Light red shadow for the first item
        "rgba(150, 255, 150, 0.5)",  // Light green shadow for the second item
        "rgba(204, 255, 204, 0.5)", // Very light green shadow for the third item
        "rgba(255, 255, 150, 0.5)",  // Light yellow shadow for the fourth item
        "rgba(150, 150, 255, 0.5)",  // Light blue shadow for the fifth item
        "rgba(255, 205, 140, 0.5)", // Light orange shadow for the sixth item
        "rgba(140, 120, 255, 0.5)"   // Light indigo shadow for the seventh item
    ];


    // Loop through the items and assign a unique box-shadow and text color
    sliderItems.forEach((item, index) => {
        const colorIndex = index % shadowColors.length; // Loop the colors if there are more items
        const textColor = shadowColors[colorIndex]; // Use the same color for text

        // Apply the box-shadow and text color
        item.style.color = textColor; // Set the text color
        item.style.boxShadow = `0px 0px 0px 0.4px ${shadowColors[colorIndex]}, 0.25px 0.25px 10px rgba(0, 0, 0, 0.2)`; // Set the box-shadow
    });
});

// slider