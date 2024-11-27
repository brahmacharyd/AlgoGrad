// Select all week divs
const weeks = document.querySelectorAll('.week');

// Select content sections
const contentHeading = document.getElementById('content-heading');
const contentPoints = document.getElementById('content-points');

// Define content for each week (you can replace with actual content)
const weekContent = {
    1: {
        heading: 'Offline Orientation',
        points: [
            'Product Teardown',
            'Fireside Chat',
            'Team Bonding Activities',
            'Panel Discussion with Mentors'
        ]
    },
    2: {
        heading: 'Introduction to Programming',
        points: [
            'Basics of Python',
            'Hands-on Exercises',
            'Understanding Variables and Loops'
        ]
    },
    3: {
        heading: 'Web Development Fundamentals',
        points: [
            'HTML & CSS',
            'JavaScript Basics',
            'Responsive Design'
        ]
    },
    // Add content for other weeks here
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
                return `<div class="point"><img src="./img/download_check.svg" alt="tick"> ${point}</div>`;
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
