window.addEventListener('scroll', function() {
    var stickyCourseInfoContainer = document.getElementById('stickyCourseInfo');
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    var pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Check if the scroll position is halfway or more
    if (scrollPosition > pageHeight / 6) {
        stickyCourseInfoContainer.classList.add('sticky');
    } else {
        stickyCourseInfoContainer.classList.remove('sticky');
    }
});
