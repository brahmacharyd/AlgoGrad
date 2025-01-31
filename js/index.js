// Form elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const submitButton = document.getElementById("submit-btn");

// Error message elements
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");

// Validation functions
function validateName() {
  const namePattern = /^[a-zA-Z\s]*$/;
  if (!nameInput.value.match(namePattern)) {
    nameError.textContent = "Enter a valid Name.";
    nameInput.classList.add("invalid");
    return false;
  } else {
    nameError.textContent = "";
    nameInput.classList.remove("invalid");
    return true;
  }
}

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.match(emailPattern)) {
    emailError.textContent = "Enter a valid email address.";
    emailInput.classList.add("invalid");
    return false;
  } else {
    emailError.textContent = "";
    emailInput.classList.remove("invalid");
    return true;
  }
}

function validatePhone() {
  const phonePattern = /^\d{10}$/; // Matches exactly 10 digits
  if (!phoneInput.value.match(phonePattern)) {
    phoneError.textContent = "Enter a valid Phone number.";
    phoneInput.classList.add("invalid");
    return false;
  } else {
    phoneError.textContent = "";
    phoneInput.classList.remove("invalid");
    return true;
  }
}

// Handle form validation individually
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);

// Final validation when form is submitted
document.getElementById("signup-form").addEventListener("submit", (event) => {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();

  if (!(isNameValid && isEmailValid && isPhoneValid)) {
    event.preventDefault(); // Prevent submission if validation fails
    alert("Please correct the errors in the form.");
  }
});

// mobile side-menu start

// mobile side-menu close

// Modal-Start
// Function to open the modal dynamically based on data-modal attribute
function openModal(event) {
  event.preventDefault(); // Prevent default link behavior (scrolling)

  const modalId = event.target.getAttribute("data-modal"); // Get the value of data-modal
  const modal = document.getElementById(modalId); // Get the modal element with the corresponding ID

  if (modal) {
    modal.style.display = "flex"; // Show the modal
    document.body.classList.add("no-scroll"); // Disable body scrolling when modal is open
  }
}

// Function to close the modal
function closeModal() {
  const modal = document.querySelector('.modal[style="display: flex;"]'); // Get the currently visible modal
  if (modal) {
    modal.style.display = "none"; // Hide the modal
    document.body.classList.remove("no-scroll"); // Enable body scrolling
  }
}

// Add event listener for the "apply-btn" button or any element with data-modal attribute
document.querySelectorAll("[data-modal]").forEach(function (button) {
  button.addEventListener("click", openModal); // Add click event for all elements with data-modal attribute
});

// Close modal when close button is clicked
const closeBtns = document.querySelectorAll(".close-btn");
closeBtns.forEach(function (closeBtn) {
  closeBtn.addEventListener("click", closeModal); // Add event listener for each close button
});

// Close modal if user clicks outside of modal content
window.addEventListener("click", function (event) {
  const modal = document.querySelector('.modal[style="display: flex;"]'); // Get the currently visible modal
  if (modal && event.target === modal) {
    modal.style.display = "none"; // Hide the modal
    document.body.classList.remove("no-scroll"); // Enable body scrolling
  }
});

// Modal-Ends

// program glance-Start
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(
    ".the-program-at-a-glance-container .main-content .left-container .items .item"
  );
  const totalSteps = items.length;
  let currentStepIndex = 0;

  // Function to update progress bar for active item
  function updateProgressBar() {
    // Hide progress bars and images for all items
    items.forEach((item) => {
      const progressContainer = item.querySelector(".progress");
      const stepImage = item.querySelector(".step-image");
      if (progressContainer) {
        progressContainer.style.display = "none"; // Hide the progress bar
      }
      if (stepImage) {
        stepImage.style.display = "none"; // Hide the image
      }
    });

    // Show the progress bar and image for the active item
    const activeItem = items[currentStepIndex];
    const progressContainer = activeItem.querySelector(".progress");
    const stepImage = activeItem.querySelector(".step-image");

    if (progressContainer) {
      progressContainer.style.display = "block"; // Show the progress bar
      const progressBar = progressContainer.querySelector(".progress-bar");
      if (progressBar) {
        progressBar.style.width = "0%"; // Reset width before starting the animation

        // Force reflow to trigger the animation
        progressBar.offsetWidth;

        progressBar.style.transition = "width 3s ease-in-out"; // Smooth transition
        setTimeout(() => {
          progressBar.style.width = "100%"; // Fill the progress bar
        }, 0);
      }
    }

    if (stepImage) {
      stepImage.style.display = "block"; // Show the related image
    }

    // Update the right-side image dynamically
    const programImage = document.getElementById("program-image");
    const newImageUrl = activeItem.getAttribute("data-image");
    if (programImage && newImageUrl) {
      programImage.src = newImageUrl; // Update the image source dynamically
    }
  }

  function activateStep() {
    // Remove 'active' class from all items
    items.forEach((item) => item.classList.remove("active"));

    // Add 'active' class to the current item
    items[currentStepIndex].classList.add("active");

    // Reset the progress bar and update it
    updateProgressBar();

    // Move to the next step (loop back to the first step if at the end)
    currentStepIndex = (currentStepIndex + 1) % totalSteps;
  }

  // Function to activate a specific step based on user click
  function activateStepOnClick(index) {
    currentStepIndex = index; // Set the clicked item as the active step
    activateStep(); // Call activateStep to update everything (progress bar, image, etc.)
  }

  // Add click event listeners to each item
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      activateStepOnClick(index); // Manually activate the clicked step
    });
  });

  // Start the automatic loop, changing steps every 3 seconds
  setInterval(activateStep, 4000); // 3000 ms = 3 seconds

  // Initialize the first step
  activateStep();
});

window.addEventListener("scroll", function () {
  const steps = document.querySelectorAll(".mobile-step");
  const progressBar = document.getElementById("progress");
  const windowHeight = window.innerHeight;
  const windowMiddle = window.scrollY + windowHeight / 2; // Middle of the viewport
  let activatedSteps = 0; // Track the number of active steps

  steps.forEach((step, index) => {
    const stepTop = step.getBoundingClientRect().top + window.scrollY;
    const stepBottom = stepTop + step.offsetHeight;
    const stepMiddle = stepTop + step.offsetHeight / 2; // Middle of the step

    // Check if the middle of the step is within the viewport's middle
    if (
      stepMiddle <= windowMiddle &&
      stepMiddle >= windowMiddle - windowHeight
    ) {
      activatedSteps = index + 1; // Mark the current step as active
      // Activate the step
      step.classList.add("active");
      step.querySelector(".bullet").classList.add("active");
      step.querySelector(".mobile-step-content .heading").style.color = "#fff";
      step.querySelector(".mobile-step-content .description").style.color =
        "#fff";
    } else {
      // Deactivate the step
      step.classList.remove("active");
      step.querySelector(".bullet").classList.remove("active");
      step.querySelector(".mobile-step-content .heading").style.color =
        "hsla(0, 0%, 100%, .7)";
      step.querySelector(".mobile-step-content .description").style.color =
        "hsla(0, 0%, 100%, .6)";
    }
  });

  // Calculate the progress based on activated steps
  const progressHeight = (activatedSteps / steps.length) * 100;
  progressBar.style.height = progressHeight + "%"; // Update the height of the progress bar

  // Optionally, for a smoother effect, you could also change the width or position based on scroll progress
  // const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - windowHeight)) * 100;
  // progressBar.style.width = scrollPercentage + '%'; // If you prefer a horizontal progress bar
});

// program glance-Ends

// scrolltop-Start

// Function to scroll to the top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Function to show/hide the scroll to top button based on scroll position
window.onscroll = function () {
  const scrollToTopBtn = document.querySelector(".scroll-to-top-container");
  if (
    document.body.scrollTop > window.innerHeight / 1 ||
    document.documentElement.scrollTop > window.innerHeight / 1
  ) {
    scrollToTopBtn.style.display = "flex"; // Show button
  } else {
    scrollToTopBtn.style.display = "none"; // Hide button
  }
};
// scrolltop-Ends

// sidebar-Start
// Function to toggle the side menu
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.querySelector(".mobile-nav-toggle");

  // Toggle 'open' class for the side menu
  sidebar.classList.toggle("open");

  // Toggle 'collapsed' class for the button to change its appearance
  toggleButton.classList.toggle("collapsed");
  toggleButton.classList.toggle("open");

  // Adjust aria-expanded attribute to reflect the state of the side menu
  const isOpen = sidebar.classList.contains("open");
  toggleButton.setAttribute("aria-expanded", isOpen.toString());
}

document.addEventListener("DOMContentLoaded", () => {
  const sideMenu = document.querySelector(".side-menu");
  const dropdownLinks = document.querySelectorAll(".dropdown-link");
  const menuItem = document.querySelector(".item");
  const toggleButton = document.querySelector(".mobile-nav-toggle");

  // Function to check if screen size is responsive
  const isResponsive = () => window.innerWidth <= 768;

  // Close the side menu when a dropdown link is clicked
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isResponsive()) {
        sideMenu.classList.remove("open");
        toggleButton.classList.add("collapsed");
        toggleButton.classList.remove("open");
        toggleButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Ensure the side menu closes if resized to a larger screen
  window.addEventListener("resize", () => {
    if (!isResponsive()) {
      sideMenu.classList.remove("open");
      toggleButton.classList.add("collapsed");
      toggleButton.classList.remove("open");
      toggleButton.setAttribute("aria-expanded", "false");
    }
  });
});

// sidebar-Ends

// sticky-start
window.addEventListener("scroll", function () {
  var stickyCourseInfoContainer = document.getElementById("stickyCourseInfo");
  if (!stickyCourseInfoContainer) return; // Ensure the element exists

  var scrollPosition = window.scrollY || document.documentElement.scrollTop;
  var pageHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  // Define a margin to handle fractional scroll positions
  var margin = 5;

  // If the user is at or very close to the bottom of the page
  if (scrollPosition >= pageHeight - margin) {
    stickyCourseInfoContainer.classList.remove("sticky");
    stickyCourseInfoContainer.style.display = "none";
  } else if (scrollPosition > pageHeight / 6) {
    // Make the sticky element visible for sufficient scrolling
    stickyCourseInfoContainer.classList.add("sticky");
    stickyCourseInfoContainer.style.display = "block";
  } else {
    // Hide the sticky element for minimal scrolling
    stickyCourseInfoContainer.classList.remove("sticky");
    stickyCourseInfoContainer.style.display = "none";
  }
});
// sticky-Ends

//week content-start
// Select all week divs
const weeks = document.querySelectorAll(".week");

// Select content sections
const contentHeading = document.getElementById("content-heading");
const contentPoints = document.getElementById("content-points");

const weekContent = {
  1: {
    heading: "Building Foundations",
    points: [
      "HTML & CSS: Structuring and Styling Websites",
      "JavaScript Essentials: Programming for the Web",
      "Version Control with Git and GitHub",
      "Responsive Design and Accessibility",
    ],
  },
  2: {
    heading: "Frontend Development",
    points: [
      "Advanced JavaScript Concepts",
      "React Basics: Components, State, and Props",
      "Introduction to Angular: Modules and Components",
      "Building Dynamic User Interfaces with Frontend Frameworks",
    ],
  },
  3: {
    heading: "Backend Development",
    points: [
      "Introduction to Node.js and Express.js",
      "Database Management with MongoDB",
      "Creating RESTful APIs",
      "Authentication and Authorization with JWT",
    ],
  },
  4: {
    heading: "Full-Stack Development",
    points: [
      "Integrating Frontend and Backend",
      "Building End-to-End Features",
      "Error Handling and Debugging Techniques",
      "Deployment Basics with Heroku and AWS",
    ],
  },
  5: {
    heading: "Certification Phase",
    points: [
      "Deep Dive into Your Chosen Technology Stack (MERN or MEAN)",
      "Mock Certification Projects and Assessments",
      "Hands-on Practice with Industry-Standard Tools",
      "Prepare for Certification in Your Selected Technology",
    ],
  },
  6: {
    heading: "Real-Time Project",
    points: [
      "Work on a Live Full-Stack Project",
      "Collaborate with a Mentor for Real-World Problem Solving",
      "Deploy and Showcase Your Project",
      "Final Presentation and Portfolio Building",
    ],
  },
};

const dataScienceContent = {
  1: {
    heading: "Introduction to Data Science & Python Fundamentals",
    points: [
      "Understand the role and scope of data science in modern industries.",
      "Learn Python programming essentials, including data types, loops, and functions.",
      "Introduction to Jupyter Notebook and data science libraries like NumPy and Pandas.",
      "Perform basic data cleaning and manipulation tasks.",
    ],
  },
  2: {
    heading: "Data Visualization & Exploratory Data Analysis",
    points: [
      "Learn to visualize data with Matplotlib and Seaborn.",
      "Understand the importance of Exploratory Data Analysis (EDA) in data projects.",
      "Generate insights by identifying patterns, trends, and correlations.",
      "Work on case studies to perform EDA on real-world datasets.",
    ],
  },
  3: {
    heading: "Statistics & Probability for Data Science",
    points: [
      "Master fundamental concepts of descriptive and inferential statistics.",
      "Learn probability distributions and hypothesis testing.",
      "Apply statistical techniques to analyze datasets.",
      "Understand confidence intervals and p-values.",
    ],
  },
  4: {
    heading: "Machine Learning Fundamentals",
    points: [
      "Introduction to supervised and unsupervised learning techniques.",
      "Understand the concepts of regression, classification, and clustering.",
      "Learn to build and evaluate machine learning models using Scikit-learn.",
      "Hands-on practice with datasets to implement machine learning algorithms.",
    ],
  },
  5: {
    heading: "Specialization: Get Certified in Advanced Data Science Tools",
    points: [
      "Choose a specialization: Natural Language Processing (NLP), Computer Vision, or Time Series Analysis.",
      "Learn advanced tools like TensorFlow, PyTorch, or Spark (depending on specialization).",
      "Work on mini-projects to apply the advanced tools to specific domains.",
      "Prepare for relevant certification exams.",
    ],
  },
  6: {
    heading: "Real-Time Data Science Project",
    points: [
      "Collaborate on a capstone project involving a real-world problem.",
      "Perform end-to-end data science workflows: Data collection, cleaning, modeling, and deployment.",
      "Document findings and build a comprehensive project report.",
      "Present your work to mentors and industry experts for feedback.",
    ],
  },
};

const devOpsContent = {
  1: {
    heading: "Foundations of DevOps & Linux Essentials",
    points: [
      "Introduction to DevOps: Principles, tools, and workflows.",
      "Learn Linux fundamentals and shell scripting for automation.",
      "Understand version control with Git and GitHub.",
      "Build a basic CI/CD pipeline using GitHub Actions.",
    ],
  },
  2: {
    heading: "Continuous Integration & Continuous Deployment (CI/CD)",
    points: [
      "Deep dive into CI/CD concepts and workflows.",
      "Set up Jenkins and integrate with source control.",
      "Automate testing and deployment pipelines.",
      "Hands-on practice deploying applications to a local environment.",
    ],
  },
  3: {
    heading: "Infrastructure as Code & Configuration Management",
    points: [
      "Learn Infrastructure as Code (IaC) with tools like Terraform.",
      "Understand configuration management with Ansible.",
      "Set up automated server provisioning and configuration.",
      "Work on practical exercises to deploy scalable infrastructure.",
    ],
  },
  4: {
    heading: "Containerization with Docker & Orchestration with Kubernetes",
    points: [
      "Introduction to Docker: Building and managing containers.",
      "Learn container orchestration concepts with Kubernetes.",
      "Deploy and manage multi-container applications using Kubernetes.",
      "Hands-on with Helm charts and Kubernetes networking.",
    ],
  },
  5: {
    heading: "Specialization: Cloud Platforms & Monitoring Tools",
    points: [
      "Choose a specialization: AWS, Azure, or Google Cloud.",
      "Learn cloud-native tools and services for deploying DevOps pipelines.",
      "Understand monitoring and logging using tools like Prometheus, Grafana, and ELK Stack.",
      "Work on real-world scenarios, such as auto-scaling and disaster recovery.",
    ],
  },
  6: {
    heading: "Real-Time DevOps Project",
    points: [
      "Collaborate on a capstone project to implement an end-to-end DevOps pipeline.",
      "Include IaC, CI/CD, containerization, and cloud deployment.",
      "Integrate security practices in your DevOps workflows (DevSecOps).",
      "Present your project to industry mentors and get valuable feedback.",
    ],
  },
};

// Function to update content based on week number and content type
function updateContent(contentData, weekNumber) {
  const content = contentData[weekNumber];
  if (content) {
    contentHeading.textContent = content.heading;
    contentPoints.innerHTML = content.points
      .map((point) => {
        return `<div class="point"><img src="./assets/img/download_check.svg" alt="tick"> ${point}</div>`;
      })
      .join("");
  }
}

// Set the default content for Program Overview or Guidance & Mentorship
function setDefaultContent(contentType) {
  // Make sure the content buttons are updated
  if (contentType === "overview") {
    document
      .querySelector('.content-button[data-content="overview"]')
      .classList.add("active");
    document
      .querySelector('.content-button[data-content="dataScience"]')
      .classList.remove("active");
    document
      .querySelector('.content-button[data-content="devOps"]')
      .classList.remove("active");
    updateContent(weekContent, 1); // Set default Week 1 content for Program Overview
  } else if (contentType === "dataScience") {
    document
      .querySelector('.content-button[data-content="dataScience"]')
      .classList.add("active");
    document
      .querySelector('.content-button[data-content="overview"]')
      .classList.remove("active");
    document
      .querySelector('.content-button[data-content="devOps"]')
      .classList.remove("active");
    updateContent(dataScienceContent, 1); // Set default Week 1 content for Guidance & Mentorship
  } else if (contentType === "devOps") {
    document
      .querySelector('.content-button[data-content="devOps"]')
      .classList.add("active");
    document
      .querySelector('.content-button[data-content="overview"]')
      .classList.remove("active");
    document
      .querySelector('.content-button[data-content="dataScience"]')
      .classList.remove("active");
    updateContent(devOpsContent, 1); // Set default Week 1 content for Projects
  }
}

weeks.forEach((week) => {
  week.addEventListener("click", () => {
    // Remove active class from all weeks
    weeks.forEach((w) => w.classList.remove("active"));

    // Add active class to clicked week
    week.classList.add("active");

    // Get the week number
    const weekNumber = week.getAttribute("data-week");

    // Check which content type is currently active and update accordingly
    const activeButton = document.querySelector(".content-button.active");
    if (activeButton) {
      const contentType = activeButton.getAttribute("data-content");
      if (contentType === "overview") {
        updateContent(weekContent, weekNumber); // Update Program Overview
      } else if (contentType === "dataScience") {
        updateContent(dataScienceContent, weekNumber); // Update Guidance & Mentorship
      } else if (contentType === "devOps") {
        updateContent(devOpsContent, weekNumber); // Update Projects
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  setDefaultContent("overview"); // Default content is Program Overview (Week 1)
});

const contentButtons = document.querySelectorAll(".content-button");

contentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const contentType = button.getAttribute("data-content");

    // Set default content for the selected type
    setDefaultContent(contentType);

    // Set the default week (Week 1) when changing between sections
    const firstWeek = document.querySelector('.week[data-week="1"]');
    if (firstWeek) {
      firstWeek.click();
    }
  });
});

// Select all the links inside the dropdown
const dropdownLinks = document.querySelectorAll(".dropdown-menu li a");
const contentContainer = document.querySelector(
  ".program-curriculum-container"
); // The target section to navigate to

dropdownLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Prevent default link behavior
    event.preventDefault();

    // Get the content type from the clicked link
    const contentType =
      link.getAttribute("data-content") ||
      link.getAttribute("href").substring(1); // For links like #dataScience

    // Find the corresponding content button and add the active class to it
    const contentButton = document.querySelector(
      `.content-button[data-content="${contentType}"]`
    );
    if (contentButton) {
      // Remove active class from all buttons
      document
        .querySelectorAll(".content-button")
        .forEach((btn) => btn.classList.remove("active"));

      // Add active class to the clicked button
      contentButton.classList.add("active");

      // Add the fade-out class to current content and fade-in the new content
      const currentContent = document.querySelector(".content");
      currentContent.classList.add("fade-out");

      setTimeout(() => {
        // Set the default content for the selected content type
        setDefaultContent(contentType);

        // Remove fade-out class and trigger fade-in
        currentContent.classList.remove("fade-out");
        currentContent.classList.add("fade-in");
      }, 300); // Allow time for fade-out to complete before changing content

      // Set the default week (Week 1) when changing between sections
      const firstWeek = document.querySelector('.week[data-week="1"]');
      if (firstWeek) {
        firstWeek.click();
      }
    }

    // Smoothly scroll to the content section
    contentContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sideMenu = document.querySelector(".side-menu");
  const dropdownLinks = document.querySelectorAll(".dropdown-link");
  const menuItem = document.querySelector(".item");

  // Function to check if screen size is responsive
  const isResponsive = () => window.innerWidth <= 768;

  // Toggle side menu only in responsive view
  menuItem.addEventListener("click", (e) => {
    if (isResponsive()) {
      e.preventDefault();
      sideMenu.classList.toggle("open");
    }
  });

  // Close the side menu when a dropdown link is clicked
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isResponsive()) {
        sideMenu.classList.remove("open");
      }
    });
  });

  // Ensure the side menu closes if resized to a larger screen
  window.addEventListener("resize", () => {
    if (!isResponsive()) {
      sideMenu.classList.remove("open");
    }
  });
});

//week content-End

// slider-start
document.addEventListener("DOMContentLoaded", function () {
  const sliderItems = document.querySelectorAll(".slider-item");

  // Define the colors for the box-shadow and text color dynamically
  const shadowColors = [
    "rgba(255, 150, 150, 0.5)", // Light red shadow for the first item
    "rgba(150, 255, 150, 0.5)", // Light green shadow for the second item
    "rgba(204, 255, 204, 0.5)", // Very light green shadow for the third item
    "rgba(255, 255, 150, 0.5)", // Light yellow shadow for the fourth item
    "rgba(150, 150, 255, 0.5)", // Light blue shadow for the fifth item
    "rgba(255, 205, 140, 0.5)", // Light orange shadow for the sixth item
    "rgba(140, 120, 255, 0.5)", // Light indigo shadow for the seventh item
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

// slider-Ends

// testimonials---------------------
const testimonials = [
  {
    name: "- Sravya",
    // position: 'CEO, Company A',
    image: "./assets/img/source1.jpeg",
    quote:
      '"Algograd\'s Data Science program gave me real-world skills and the confidence to succeed. Thanks to their expert training and placement support, I’m now a Data Analyst. Highly recommended!"',
  },
  {
    name: "- Sruti",
    // position: 'Founder, Company B',
    image: "./assets/img/source2.jpeg",
    quote:
      '"The structured curriculum and hands-on projects at Algograd made learning easy and exciting. Today, I’m proud to be a Data Scientist. Thank you, Algograd!"',
  },
  {
    name: "- Shivani",
    // position: 'CTO, Company C',
    image: "./assets/img/source3.jpeg",
    quote:
      '"Switching careers felt easy with Algograd’s personalized training and placement help. Now, I’m living my dream as a Data Scientist!"',
  },
  {
    name: "- Divya",
    // position: 'CTO, Company C',
    image: "./assets/img/source4.jpeg",
    quote:
      '"The offline learning and real-world projects at Algograd prepared me perfectly for the industry. I’m now a successful Data Engineer—thank you, Algograd!"',
  },
  {
    name: "- Sriram Krishna",
    // position: 'CTO, Company C',
    image: "./assets/img/source5.jpg",
    quote:
      '"The personalized guidance and career support at Algograd helped me secure a great job in IT. Thank you, team!"',
  },
  {
    name: "- Harsha Vardhan",
    // position: 'CTO, Company C',
    image: "./assets/img/source6.jpg",
    quote:
      '"The practical training and real-world projects at Algograd prepared me perfectly for the industry. Highly recommended!"',
  },
  {
    name: "- Chaitanya Prasad",
    // position: 'CTO, Company C',
    image: "./assets/img/source7.jpg",
    quote:
      '"Algograd gave me the skills and confidence to excel in Data Science. I’m now working in IT and loving my journey!"',
  }
];

// Function to render the testimonials dynamically
function renderTestimonials() {
  const indicatorsContainer = document.getElementById("carouselIndicators");
  const itemsContainer = document.getElementById("carouselItems");

  // Clear existing content
  indicatorsContainer.innerHTML = "";
  itemsContainer.innerHTML = "";

  // Loop through the testimonials and generate the markup
  testimonials.forEach((testimonial, index) => {
    // Carousel Indicators (Navigation Dots)
    const indicator = document.createElement("button");
    indicator.type = "button";
    indicator.setAttribute("data-bs-target", "#testimonialCarousel");
    indicator.setAttribute("data-bs-slide-to", index);
    if (index === 0) indicator.classList.add("active");
    indicator.setAttribute("aria-label", `Slide ${index + 1}`);
    indicatorsContainer.appendChild(indicator);

    // Carousel Item
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    item.innerHTML = `
            <div class="testimonial-item d-flex align-items-center">
                <div class="testimonial-image-container text-center">
                    <img src="${testimonial.image}" alt="Client ${
      index + 1
    }" class="rounded-circle mb-3">  
                     <div class="author">${
                       testimonial.name
                     }</div>                
                </div>
                <div class="testimonial-content ml-4">
                    <p class="lead">${testimonial.quote}</p>
                </div>
            </div>
        `;
    itemsContainer.appendChild(item);
  });
}

// Call the function to render the testimonials
renderTestimonials();
// testimonials---------------------

// <!-- callback-modal -->
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("callback-modal");
  const closeModal = document.querySelector(".callback-close-modal");
  const form = document.getElementById("callback-form");

  // Check if form was already submitted (using localStorage)
  if (localStorage.getItem("formSubmitted") === "true") {
    modal.style.display = "none"; // Hide modal if form already submitted
  } else {
    modal.style.display = "flex"; // Show modal if form is not yet submitted
  }

  // Close modal when clicking close button
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    let isValid = true;

    // Get field values
    const name = document.getElementById("callback-name");
    const phone = document.getElementById("callback-phone");
    const email = document.getElementById("callback-email");
    const program = document.getElementById("callback-program");

    // Get error fields
    const nameError = document.getElementById("callback-name-error");
    const phoneError = document.getElementById("callback-phone-error");
    const emailError = document.getElementById("callback-email-error");
    const programError = document.getElementById("callback-program-error");

    // Reset previous errors
    resetErrors(
      [name, phone, email, program],
      [nameError, phoneError, emailError, programError]
    );

    // Name Validation
    if (name.value.trim() === "") {
      showError(name, nameError, "Name is required.");
      isValid = false;
    }

    // Phone Validation (only numbers, 10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.value.match(phoneRegex)) {
      showError(phone, phoneError, "Enter a valid 10-digit phone number.");
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.match(emailRegex)) {
      showError(email, emailError, "Enter a valid email address.");
      isValid = false;
    }

    // Program Selection Validation
    if (program.value === "") {
      showError(program, programError, "Please select a program.");
      isValid = false;
    }

    // If form is valid, submit
    if (isValid) {
      form.submit();
      form.reset();
      modal.style.display = "none"; // Hide modal after submission

      // Store the flag in localStorage to prevent modal from opening on refresh or revisit
      localStorage.setItem("formSubmitted", "true");
    }
  });

  // Function to show errors
  function showError(input, errorField, message) {
    input.classList.add("callback-input-error");
    errorField.textContent = message;
    errorField.style.display = "block";
  }

  // Function to reset errors
  function resetErrors(inputs, errors) {
    inputs.forEach((input) => input.classList.remove("callback-input-error"));
    errors.forEach((error) => {
      error.textContent = "";
      error.style.display = "none";
    });
  }
});
// <!-- callback-modal -->
