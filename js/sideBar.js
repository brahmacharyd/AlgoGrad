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
