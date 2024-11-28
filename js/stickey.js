window.addEventListener('scroll', function() {
    var stickyCourseInfoContainer = document.getElementById('stickyCourseInfo');
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    var pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    // If the user is at the bottom of the page, remove the 'sticky' class
    if (scrollPosition >= pageHeight) {
        stickyCourseInfoContainer.classList.remove('sticky');
        stickyCourseInfoContainer.style.display = 'none'; // Hide the sticky element at the bottom
    } else if (scrollPosition > pageHeight / 6) {
        // If scrolled more than 1/6th of the page height, make the sticky element visible
        stickyCourseInfoContainer.classList.add('sticky');
        stickyCourseInfoContainer.style.display = 'block'; // Ensure it stays visible
    } else {
        // If scroll position is less than 1/6th of the page height, hide the sticky element
        stickyCourseInfoContainer.classList.remove('sticky');
        stickyCourseInfoContainer.style.display = 'none'; // Hide the sticky element
    }
});
