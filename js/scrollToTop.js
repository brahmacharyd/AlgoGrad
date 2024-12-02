
    // Function to scroll to the top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Function to show/hide the scroll to top button based on scroll position
    window.onscroll = function() {
        const scrollToTopBtn = document.querySelector('.scroll-to-top-container');
        if (document.body.scrollTop > window.innerHeight / 1 || document.documentElement.scrollTop > window.innerHeight / 1) {
            scrollToTopBtn.style.display = 'flex'; // Show button
        } else {
            scrollToTopBtn.style.display = 'none'; // Hide button
        }
    };