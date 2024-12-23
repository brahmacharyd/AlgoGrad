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
