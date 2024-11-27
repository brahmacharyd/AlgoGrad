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
        heading: 'Fundamentals of product management',
        points: [
            'What makes for a great PM',
            'Day to day work of PMs in tech companies',
            'Communicating with stakeholders',
        ]
    },
    3: {
        heading: 'Problem discovery, market and user research',
        points: [
            'Define customer segments and personas',
            'Types of user research',
            'Understanding customer pain points',
            'Extract key insights from user research'
        ]
    },
    4: {
        heading: 'Problem framing and prioritization',
        points: [
            'Define the right problem statement',
            'Generate multiple possible ideas to solve the problem'
        ]
    },
    5: {
        heading: 'UX Design',
        points: [
            'What great UX looks like',
            'Share ideas using wireframes',
            'Give effective feedback to designers',
            'Validate the right solution with users'
        ]
    },
    6: {
        heading: 'Analytics and metrics',
        points: [
            'Understanding different types of metrics',
            'Define success metrics for your product',
            'Funnel analysis',
            'Cohort analysis'
        ]
    },
    7: {
        heading: 'Effective communication as a PM',
        points: [
            'Working with designers, engineers and business teams',
            'Communicating via documentation'
        ]
    },
    8: {
        heading: 'Tech 101 & System Design',
        points: [
            'SQL, Database, APIs and app architectures',
            'System design'
        ]
    },
    9: {
        heading: 'Product launch & adoption',
        points: [
            'Product launch checklist',
            'Launching in phases',
            'A/B testing',
            'Product adoption'


        ]
    },
    10: {
        heading: 'Capstone project, Interview preparation & Demo Day',
        points: [
            'Work on your capstone project',
            'Get feedback from mentors',
            'Mock interviews with peers and mentors',
            'Demo Day presentation'
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
