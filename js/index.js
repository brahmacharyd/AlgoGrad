document.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();
});

function navigate(event, route) {
  event.preventDefault();
  history.pushState({ page: route }, "", `/${route}`);
  loadContent(route);
}

// Remove "index.html" from the URL
if (location.pathname.endsWith("index.html")) {
  history.replaceState(null, "", location.origin + "/");
}

// Function to load content and scroll smoothly
function loadContent() {
  const route = location.hash.substring(1) || "home"; // Get hash, default to home

  // Hide all pages
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');

  // Show the selected page
  const section = document.getElementById(route);
  if (section) {
      section.style.display = 'block';

      // Smooth scroll to the section
      window.scrollTo({
          top: section.offsetTop - 50, // Adjust this value if needed
          behavior: 'smooth'
      });
  }
}

// Listen for hash changes and page load
window.addEventListener("hashchange", loadContent);
window.addEventListener("load", loadContent);
window.onpopstate = function (event) {
  loadContent(event.state?.page || "home");
};

// Load content on first visit
loadContent(location.pathname.substring(1) || "home");

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

const bootcampContent = {
  1: {
      heading: "Foundations of Web Development",
      points: [
          "HTML & CSS: Learn how to structure and style websites.",
          "JavaScript Basics: Make web pages interactive with JS fundamentals.",
          "Responsive Design: Create mobile-friendly, adaptive layouts.",
          "Version Control (Git & GitHub): Collaborate & manage code efficiently.",
      ],
  },
  2: {
      heading: "Advanced Concepts & Live Deployment",
      points: [
          "React Basics: Build dynamic, interactive web applications.",
          "API Integration: Connect your website with real-world data.",
          "Debugging & Optimization: Improve performance and fix issues.",
          "Deployment & Hosting (GitHub & AWS): Make your site live!",
      ],
  },
};


// Function to update content based on week number and content type
function updateContent(contentData, weekNumber) {
  const content = contentData[weekNumber];
  if (content) {
    contentHeading.textContent = content.heading;
    contentPoints.innerHTML = content.points
      .map((point) => `<div class="point"><img src="./assets/img/download_check.svg" alt="tick"> ${point}</div>`)
      .join("");
  }
}

// Set the default content for Program Overview or Guidance & Mentorship
function setDefaultContent(contentType) {
  document.querySelectorAll(".content-button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.content-button[data-content="${contentType}"]`).classList.add("active");

  if (contentType === "overview") {
      updateContent(weekContent, 1);
  } else if (contentType === "dataScience") {
      updateContent(dataScienceContent, 1);
  } else if (contentType === "devOps") {
      updateContent(devOpsContent, 1);
  } else if (contentType === "bootcamp") {
      updateContent(bootcampContent, 1); // Set default Bootcamp Day 1 content
  }

  // Show or hide weeks based on the selected content
  document.querySelectorAll(".week").forEach(week => {
      if (contentType === "bootcamp") {
          week.style.display = week.hasAttribute("data-bootcamp") ? "block" : "none";
      } else {
          week.style.display = week.hasAttribute("data-bootcamp") ? "none" : "block";
      }
  });

  // Default to the first "week" (or Day 1 for Bootcamp)
  const firstWeek = document.querySelector(`.week[data-week="1"]`);
  if (firstWeek) {
      firstWeek.click();
  }
}



weeks.forEach((week) => {
  week.addEventListener("click", () => {
      weeks.forEach((w) => w.classList.remove("active"));
      week.classList.add("active");

      const weekNumber = week.getAttribute("data-week");
      const activeButton = document.querySelector(".content-button.active");
      if (activeButton) {
          const contentType = activeButton.getAttribute("data-content");
          if (contentType === "overview") {
              updateContent(weekContent, weekNumber);
          } else if (contentType === "dataScience") {
              updateContent(dataScienceContent, weekNumber);
          } else if (contentType === "devOps") {
              updateContent(devOpsContent, weekNumber);
          } else if (contentType === "bootcamp") {
              updateContent(bootcampContent, weekNumber);
          }
      }
  });
});

document.querySelector('[data-content="bootcamp"]').addEventListener("click", () => {
  setDefaultContent("bootcamp");
});
document.addEventListener("DOMContentLoaded", () => {
  setDefaultContent("overview"); // Default content is Program Overview (Week 1)
});

document.querySelectorAll(".content-button").forEach((button) => {
  button.addEventListener("click", () => {
      const contentType = button.getAttribute("data-content");
      setDefaultContent(contentType);

      // Remove active class from all weeks before applying new selection
      document.querySelectorAll(".week").forEach(week => {
          week.classList.remove("active");
      });

      // Show or hide weeks based on the selected content
      document.querySelectorAll(".week").forEach(week => {
          if (contentType === "bootcamp") {
              week.style.display = week.hasAttribute("data-bootcamp") ? "block" : "none";
          } else {
              week.style.display = week.hasAttribute("data-bootcamp") ? "none" : "block";
          }
      });

      let firstElementToClick;
      if (contentType === "bootcamp") {
          firstElementToClick = document.querySelector('.week[data-week="1"][data-bootcamp]');
      } else {
          firstElementToClick = document.querySelector('.week[data-week="1"]:not([data-bootcamp])');
      }

      // Default to the first "week" (or Day 1 for Bootcamp)
      if (firstElementToClick) {
          firstElementToClick.classList.add("active"); // Highlight the selected item
          firstElementToClick.click();
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
      document.querySelectorAll(".content-button").forEach((btn) => btn.classList.remove("active"));
      contentButton.classList.add("active");
  
      // Set the default content for the selected content type
      setDefaultContent(contentType);
  
      // Set the default week (Week 1 or Day 1 for Bootcamp)
      let firstElementToClick;
      if (contentType === "bootcamp") {
          firstElementToClick = document.querySelector('.week[data-week="1"][data-bootcamp]');
      } else {
          firstElementToClick = document.querySelector('.week[data-week="1"]:not([data-bootcamp])');
      }
  
      if (firstElementToClick) {
          firstElementToClick.classList.add("active"); // Highlight the selected item
          firstElementToClick.click();
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
// call back modelpopUp
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("callback-modal");
  const closeModal = document.querySelector(".callback-close-modal");
  const form = document.getElementById("callback-form");

  // Initially hide the modal
  modal.classList.remove("show");

  // Check if form was already submitted (using localStorage)
  if (localStorage.getItem("formSubmitted") === "true") {
    modal.classList.remove("show"); // Hide modal if form already submitted
  } else {
    // Delay modal display by 10 seconds
    setTimeout(function() {
      modal.classList.add("show"); // Show modal with smooth transition after 7 seconds
    }, 7000);
  }

  // Close modal when clicking close button
  closeModal.addEventListener("click", function () {
    modal.classList.remove("show"); // Hide with transition
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
      modal.classList.remove("show"); // Hide with transition after submission

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
// call back modelpopUp

// privacyPolicyData
const privacyPolicyData = {
  title: "Privacy Policy",
  lastUpdated: "<strong>Last Updated:</strong> 3rd February, 2025",
  introContent: "Welcome to <strong>Algograd LLP</strong> (referred to as \"Algograd,\" \"Company,\" \"we,\" \"us,\" or \"our\"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully to understand our practices regarding your data.",
  sections: [
      {
          heading: "Purpose of This Privacy Policy",
          content: "This Privacy Policy applies to personal data collected through:",
          listItems: [
            "Our website and applications managed by Algograd.",
            "Online and offline interactions, including emails, phone calls, and social media platforms.",
            "Participation in Algograd’s events, programs, and services."
        ],
        ExtraContent: "By accessing or using our services, you agree to the collection and use of information in accordance with this policy.",
      },
      {
          heading: "What Personal Data We Collect",
          content: "We collect the following types of personal data:",
          listItems: [
              "<strong>Identity Data:</strong> Full name, date of birth, gender, and photograph.",
              "<strong>Contact Data:</strong> Email address, phone number, and mailing address.",
              "<strong>Profile Data:</strong> Educational background, employment details, interests, feedback, and communication preferences.",
              "<strong>Financial Data:</strong> Payment information, if you make transactions with us.",
              "<strong>Technical Data:</strong> IP address, browser type, operating system, and usage data.",
              "<strong>Usage Data:</strong> Information about how you interact with our website and services."
          ]
      },
      {
          heading: "How We Collect Your Data",
          content: "We collect data directly from you, automatically through cookies, and from third parties.",
          listItems: [
            "<strong>Directly from You:</strong> When you register, apply for programs, participate in events, or communicate with us.",
            "<strong>Automatically:</strong> Through cookies, server logs, and similar technologies.",
            "<strong>From Third Parties:</strong>  Business partners, service providers, and publicly available sources."
        ]
      },
      {
          heading: "How We Use Your Personal Data",
          content: "We process your personal data for the following purposes:",
          listItems: [
            "To provide, operate, and maintain our services.",
            "To communicate with you about updates, promotions, and offers.",
            "To process transactions and manage payments.",
            "To improve our website, products, and customer experience.",
            "To comply with legal obligations."
        ]
      },
      {
          heading: "Legal Basis for Processing Data",
          content: "We process your data based on:",
          listItems: [
            "Your <strong>consent.</strong>",
            "The necessity to <strong>perform a contract.</strong>",
            "<strong>Legal obligations</strong> we must comply with.",
            "<strong>Legitimate interests</strong> that do not override your data protection rights."
          ]
      },
      {
          heading: "Sharing of Your Data",
          content: "We do <strong>NOT</strong> sell your personal data. However, we may share it with:",
          listItems: [
            "<strong>Service Providers:</strong>  For hosting, IT support, and payment processing.",
            "<strong>Business Partners:</strong> For events or collaborations, with your consent.",
            "<strong>Legal Authorities:</strong>   To comply with legal obligations or protect our rights."
        ]
      },
      {
          heading: "Data Security",
          content: "We implement strong security measures to protect your data, including:",
          listItems: [
            "Encryption of sensitive information.",
            "Access controls to restrict data to authorized personnel only.",
            "Regular security audits and monitoring."
        ],
        ExtraContent:"However, no system is 100% secure. Please contact us immediately if you believe your data has been compromised."
      },
      {
          heading: "Data Retention",
          content: "We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy or as required by law."
      },
      {
          heading: "Your Rights",
          content: "You have the right to:",
          listItems: [
            "<strong>Access</strong> your data.",
            "<strong>Correct</strong> inaccurate data.",
            "<strong>Delete</strong> your data under certain conditions.",
            "<strong>Object</strong> to or restrict processing.",
            "<strong>Withdraw consent</strong> at any time.",
        ],
        ExtraContent: "To exercise these rights, please contact us at <strong>info@algograd.com.</strong>"
      },
      {
          heading: "Children’s Privacy",
          content: "Our services are <strong>not intended for children under the age of 18.</strong> We do not knowingly collect data from minors without parental consent."
      },
      {
          heading: "Cookies and Tracking Technologies",
          content: "We use cookies to enhance user experience. You can control cookie preferences through your browser settings.",
            },
      {
          heading: "Changes to This Policy",
          content: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically."
      },
      {
          heading: "Contact Us",
          content: "For any questions or concerns about this Privacy Policy, please contact:<br><strong>Algograd LLP</strong><br>Email:<strong>info@algograd.com</strong>"
      }
  ]
};

function loadPrivacyPolicy(data) {
  // Title and last updated date
  document.getElementById('policy-title').textContent = data.title;
  document.getElementById('last-updated').innerHTML = data.lastUpdated;
  document.getElementById('intro-content').innerHTML = data.introContent;

  // Policy content sections
  const policyContent = document.getElementById('policy-content');
  data.sections.forEach((section, index) => {
      const sectionElement = document.createElement('div');
      sectionElement.classList.add('section');

      const heading = document.createElement('div');
      heading.classList.add('heading');
      
      // Prepend number to heading
      heading.textContent = `${index + 1}. ${section.heading}`;

      const content = document.createElement('div');
      content.classList.add('content');
      content.innerHTML = section.content;

      // Append list items if available
      if (section.listItems && section.listItems.length > 0) {
          const ul = document.createElement('ul');
          section.listItems.forEach(item => {
              const li = document.createElement('li');
              li.innerHTML = item;
              ul.appendChild(li);
          });
          content.appendChild(ul);
      }

      sectionElement.appendChild(heading);
      sectionElement.appendChild(content);

      // Append ExtraContent only if it exists
      if (section.ExtraContent) {
          const extraContent = document.createElement('div');
          extraContent.classList.add('ExtraContent');
          extraContent.innerHTML = section.ExtraContent;
          sectionElement.appendChild(extraContent);
      }

      policyContent.appendChild(sectionElement);
  });
}


// Load the policy on page load
document.addEventListener("DOMContentLoaded", function() {
  loadPrivacyPolicy(privacyPolicyData);
});
// privacyPolicyData



// --------------------------------------------------------------------

// Testimonials data
const testimonials = [
  {
        name: "- Sravya",
        // designation: 'CEO, Company A',
        image: "./assets/img/source1.jpg",
        description:
          '"Algograd\'s Data Science program gave me real-world skills and the confidence to succeed. Thanks to their expert training and placement support, I’m now a Data Analyst. Highly recommended!"',
      },
      {
        name: "- Sruti",
        // designation: 'Founder, Company B',
        image: "./assets/img/source2.jpeg",
        description:
          '"The structured curriculum and hands-on projects at Algograd made learning easy and exciting. Today, I’m proud to be a Data Scientist. Thank you, Algograd!"',
      },
      {
        name: "- Shivani",
        // designation: 'CTO, Company C',
        image: "./assets/img/source3.jpeg",
        description:
          '"Switching careers felt easy with Algograd’s personalized training and placement help. Now, I’m living my dream as a Data Scientist!"',
      },
      {
        name: "- Divya",
        // designation: 'CTO, Company C',
        image: "./assets/img/source4.jpeg",
        description:
          '"The offline learning and real-world projects at Algograd prepared me perfectly for the industry. I’m now a successful Data Engineer—thank you, Algograd!"',
      },
      {
        name: "- Sriram Krishna",
        // designation: 'CTO, Company C',
        image: "./assets/img/source5.jpg",
        description:
          '"The personalized guidance and career support at Algograd helped me secure a great job in IT. Thank you, team!"',
      },
      {
        name: "- Harsha Vardhan",
        // designation: 'CTO, Company C',
        image: "./assets/img/source6.jpg",
        description:
          '"The practical training and real-world projects at Algograd prepared me perfectly for the industry. Highly recommended!"',
      },
      {
        name: "- Chaitanya Prasad",
        // designation: 'CTO, Company C',
        image: "./assets/img/source7.jpg",
        description:
          '"Algograd gave me the skills and confidence to excel in Data Science. I’m now working in IT and loving my journey!"',
      }
];
      // Group testimonials into sets based on screen size
function groupTestimonials(testimonials) {
  let groups = [];
  let testimonialsPerGroup = window.innerWidth <= 516 ? 1 : 3;

  for (let i = 0; i < testimonials.length; i += testimonialsPerGroup) {
      groups.push(testimonials.slice(i, i + testimonialsPerGroup));
  }
  return groups;
}

// Create Carousel Items
function createCarouselItems() {
  const testimonialGroups = groupTestimonials(testimonials);
  const container = document.getElementById('TestimonialsContent');
  const indicators = document.getElementById('TestimonialsIndicators');

  testimonialGroups.forEach((group, groupIndex) => {
      const carouselItem = document.createElement('div');
      carouselItem.className = `carousel-item ${groupIndex === 0 ? 'active' : ''}`;

      const testimonialGrid = document.createElement('div');
      testimonialGrid.className = 'testimonial-grid';

      group.forEach(testimonial => {
          const card = document.createElement('div');
          card.className = 'testimonial-card position-relative';
          card.innerHTML = `
              <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image"/>
              <div class="testimonial-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <p class="testimonial-text">${testimonial.description}</p>
              </div>
              <div class="testimonial-content">
                  <h3 class="testimonial-name">${testimonial.name}</h3>                  
              </div>
          `;
          testimonialGrid.appendChild(card);
      });

      carouselItem.appendChild(testimonialGrid);
      container.appendChild(carouselItem);

      const indicator = document.createElement('button');
      indicator.type = 'button';
      indicator.setAttribute('data-bs-target', '#TestimonialsContainer');
      indicator.setAttribute('data-bs-slide-to', groupIndex.toString());
      if (groupIndex === 0) {
          indicator.classList.add('active');
      }
      indicators.appendChild(indicator);
  });
}

// Recreate carousel items on window resize
window.addEventListener('resize', () => {
  const container = document.getElementById('TestimonialsContent');
  const indicators = document.getElementById('TestimonialsIndicators');
  container.innerHTML = '';
  indicators.innerHTML = '';
  createCarouselItems();
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  createCarouselItems();
  lucide.createIcons();
  new bootstrap.Carousel(document.getElementById('TestimonialsContainer'));
});
// Testimonials Data

//About-Us Content
const aboutUsData = {
  intro: {
      title: "About Us",
      description: "At Algograd, we don’t just teach—we transform. In a world where competition is fierce and opportunities favor the bold, we believe that success is built on more than just education. It’s about <strong>mindset, confidence, and relentless growth<strong>."
  },
  mission: {
      title: "Our Mission",
      description: "We are on a mission to shape individuals into confident, highly motivated professionals who don’t just adapt to change—they drive it. At Algograd, we empower learners with the right skills, the right mindset, and the fire to take on any challenge."
  },
  offerings: {
      title: "What We Offer",
      list: [
          "Industry-Focused Learning – Practical, real-world skills that matter.",
          "Expert Mentorship – Learn from top professionals who’ve walked the path.",
          "Hands-on Training – Experience-based learning that builds confidence.",
          "Career Acceleration – Land opportunities, break barriers, and achieve greatness."
      ],
      potential: "At Algograd, we believe that your potential is limitless—and we’re here to help you unlock it.",
      cta: "Are you ready to take control of your future? Let’s build your success story together."
  },
  programs: {
      title: "Our Programs",
      description: "We offer a variety of programs focused on skill development, mentorship, and hands-on projects."
  },
  team: {
      title: "Meet Our Team",
      members: [
          { imgSrc: "./assets/img/team1.jpg", altText: "Team Member 1" },
          { imgSrc: "./assets/img/team2.jpg", altText: "Team Member 2" },
          { imgSrc: "./assets/img/team3.jpg", altText: "Team Member 2" },
          { imgSrc: "./assets/img/team4.jpg", altText: "Team Member 2" },
          { imgSrc: "./assets/img/team5.jpg", altText: "Team Member 2" },
      ]
  },
  location: {
      title: "Our Location",
      description: "We are located in the heart of the city, easily accessible to everyone.",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5824141500248!2d78.37086467516593!3d17.431816583462936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93004eab50c9%3A0x79462ff4bd5b0eb3!2sAlgoGrad!5e0!3m2!1sen!2sin!4v1739604652067!5m2!1sen!2sin"
  },
  contact: {
      title: "Contact Us",
      description: "Feel free to reach out to us for any queries or collaborations.",
      email: "Email: info@algograd.com",
      website: 'Website: <a href="https://www.algograd.com" target="_blank">www.algograd.com</a>',
  }
};
// Function to inject content dynamically
function loadAboutUsContent() {
  document.querySelector(".aboutus-intro-title").innerHTML = aboutUsData.intro.title;
  document.querySelector(".aboutus-intro-description").innerHTML = aboutUsData.intro.description;

  document.querySelector(".aboutus-mission-title").innerHTML = aboutUsData.mission.title;
  document.querySelector(".aboutus-mission-description").innerHTML = aboutUsData.mission.description;

  document.querySelector(".aboutus-offerings-title").innerHTML = aboutUsData.offerings.title;
  const offeringsList = document.querySelector(".aboutus-offerings-list");
  aboutUsData.offerings.list.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = item;
      offeringsList.appendChild(li);
  });
  document.querySelector(".aboutus-potential").innerHTML = aboutUsData.offerings.potential;
  document.querySelector(".aboutus-cta").innerHTML = aboutUsData.offerings.cta;
  document.querySelector(".aboutus-team-title").innerHTML = aboutUsData.team.title;
  const teamContainer = document.querySelector(".aboutus-team-container");
  aboutUsData.team.members.forEach(member => {
      const img = document.createElement("img");
      img.src = member.imgSrc;
      img.alt = member.altText;
      img.classList.add("aboutus-team-image");
      const div = document.createElement("div");
      div.classList.add("aboutus-team-member");
      div.appendChild(img);
      teamContainer.appendChild(div);
  });

  document.querySelector(".aboutus-location-title").innerHTML = aboutUsData.location.title;
  document.querySelector(".aboutus-location-description").innerHTML = aboutUsData.location.description;
  document.querySelector(".aboutus-location-map").src = aboutUsData.location.mapSrc;

  document.querySelector(".aboutus-contactus-title").innerHTML = aboutUsData.contact.title;
  document.querySelector(".aboutus-contactus-description").innerHTML = aboutUsData.contact.description;
  document.querySelector(".aboutus-contactus-email").innerHTML = aboutUsData.contact.email;
  document.querySelector(".aboutus-contactus-website").innerHTML = aboutUsData.contact.website;
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", loadAboutUsContent);
//About-Us Content

// Ensure gtag is initialized at the very start
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-LKWQ9955X2');  // Replace with your actual GA tracking ID

// Track Modal Open Event for Sign-Up Modal
document.getElementById('open-modal')?.addEventListener('click', function() {
    console.log('Sign Up Modal Opened');
    gtag('event', 'modal_open', {
        'event_category': 'modal',
        'event_label': 'Sign Up Modal',
        'value': 1
    });
    console.log('Sign-Up Modal Open event sent to GA');
});

// Track Close Button Click for Sign-Up Modal
document.getElementById('close-btn')?.addEventListener('click', function() {
    console.log('Sign-Up Modal Close Button Clicked');
    gtag('event', 'modal_close_button', {
        'event_category': 'modal',
        'event_label': 'Sign Up Modal Close Button',
        'value': 1
    });
    console.log('Sign-Up Modal Close Button event sent to GA');
});

// Track Modal Close Event for Sign-Up Modal
document.getElementById('close-btn')?.addEventListener('click', function() {
    console.log('Sign-Up Modal Close Event');
    gtag('event', 'modal_close', {
        'event_category': 'modal',
        'event_label': 'Sign Up Modal Close',
        'value': 1
    });
    console.log('Sign-Up Modal Close event sent to GA');
});

// Track Callback Modal Close Button Click
document.querySelector('.callback-close-modal')?.addEventListener('click', function() {
    console.log('Callback Modal Close Button Clicked');
    gtag('event', 'modal_close_button', {
        'event_category': 'callback_modal',
        'event_label': 'Callback Modal Close Button',
        'value': 1
    });
    console.log('Callback Modal Close Button event sent to GA');
});

// Track Modal Close Event for Callback Modal
document.querySelector('.callback-close-modal')?.addEventListener('click', function() {
    console.log('Callback Modal Close Event');
    gtag('event', 'modal_close', {
        'event_category': 'callback_modal',
        'event_label': 'Callback Modal Close',
        'value': 1
    });
    console.log('Callback Modal Close event sent to GA');
});
