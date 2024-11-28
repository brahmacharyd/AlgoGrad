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
document.querySelectorAll('[data-modal]').forEach(function(button) {
    button.addEventListener('click', openModal); // Add click event for all elements with data-modal attribute
});

// Close modal when close button is clicked
const closeBtns = document.querySelectorAll('.close-btn');
closeBtns.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', closeModal); // Add event listener for each close button
});

// Close modal if user clicks outside of modal content
window.addEventListener('click', function(event) {
    const modal = document.querySelector('.modal[style="display: flex;"]'); // Get the currently visible modal
    if (modal && event.target === modal) {
        modal.style.display = 'none'; // Hide the modal
        document.body.classList.remove('no-scroll'); // Enable body scrolling
    }
});
