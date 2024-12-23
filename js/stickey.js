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
