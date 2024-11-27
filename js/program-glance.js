document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.program-at-a-glance .main-content .left-container .items .item');
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
