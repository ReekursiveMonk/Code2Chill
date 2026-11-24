/**
 * Seed data loaded by `npm run seed` (scripts/seed.js).
 *
 * TEAM_MEMBERS is the club's real team: leadership, core team and members.
 *
 * SAMPLE_EVENTS and the projects marked `isSample: true` are placeholder
 * content copied from the original frontend. They are stored with
 * `isSample: true` so the website labels them and they can be removed with
 * `npm run seed -- --remove-samples` once real content exists.
 * "Code2Chill Website" is a real project; its GitHub stats are left empty
 * because the old numbers were invented.
 */

export const TEAM_MEMBERS = [
  {
    name: 'Lakshay',
    role: 'President',
    group: 'leads',
    order: 0
  },
  {
    name: 'Jiya',
    role: 'Vice President',
    group: 'leads',
    order: 1
  },
  {
    name: 'Samanyu',
    role: 'Tech Head',
    group: 'core',
    order: 0
  },
  {
    name: 'Prince Pratik',
    role: 'Member',
    github: 'https://github.com/ReekursiveMonk',
    group: 'core',
    order: 1
  },
  // Members (added 2026-11-24). Only name, roll number, department and email.
  {
    name: 'Pratyush Kumar',
    role: 'Member',
    rollNumber: '2610990326',
    department: 'CSE Core',
    email: 'pratyush0326.becse26@chitkara.edu.in',
    group: 'core',
    order: 2
  },
  {
    name: 'Pranav Pushya',
    role: 'Member',
    rollNumber: '2510993126',
    department: 'CSE AIML',
    email: 'pranav3126.beai25@chitkara.edu.in',
    group: 'core',
    order: 3
  },
  {
    name: 'Harsheen Kaur',
    role: 'Member',
    rollNumber: '2610992394',
    department: 'CSE AIML',
    email: 'harsheen2394.beaiml26@chitkara.edu.in',
    group: 'core',
    order: 4
  },
  {
    name: 'Aastha',
    role: 'Member',
    rollNumber: '2610990630',
    department: 'CSE Core',
    email: 'aastha0630.becse26@chitkara.edu.in',
    group: 'core',
    order: 5
  },
  {
    name: 'Ishant Bansal',
    role: 'Member',
    rollNumber: '2610992937',
    department: 'CSE AIML',
    email: 'ishant2937.beaiml26@chitkara.edu.in',
    group: 'core',
    order: 6
  },
  {
    name: 'Sagarjit Singh Batish',
    role: 'Member',
    rollNumber: '2610992174',
    department: 'CSE AIML',
    email: 'sagarjit2174.beaiml26@chitkara.edu.in',
    group: 'core',
    order: 7
  },
  {
    name: 'Prikshit Goel',
    role: 'Member',
    rollNumber: '2610990383',
    department: 'CSE Core',
    email: 'prikshit0383.becse26@chitkara.edu.in',
    group: 'core',
    order: 8
  },
  {
    name: 'Manpreet Kaur',
    role: 'Member',
    rollNumber: '2510991049',
    department: 'CSE Core',
    email: 'manpreet1049.becse25@chitkara.edu.in',
    group: 'core',
    order: 9
  },
  {
    name: 'Rasik Puri',
    role: 'Member',
    rollNumber: '2610991000',
    department: 'CSE Core',
    email: 'rasik1000.becse26@chitkara.edu.in',
    group: 'core',
    order: 10
  },
  {
    name: 'Ishan',
    role: 'Member',
    rollNumber: '2610990480',
    department: 'CSE Core',
    email: 'ishan0480.becse26@chitkara.edu.in',
    group: 'core',
    order: 11
  },
  {
    name: 'Taranpreet Kaur',
    role: 'Member',
    rollNumber: '2510993252',
    department: 'CSE AIML',
    email: 'taranpreet3252.beai25@chitkara.edu.in',
    group: 'core',
    order: 12
  },
  {
    name: 'Zia Khan',
    role: 'Member',
    rollNumber: '2610992704',
    department: 'CSE AIML',
    email: 'zia2704.beaiml26@chitkara.edu.in',
    group: 'core',
    order: 13
  },
  {
    name: 'Harshdeep Singh',
    role: 'Member',
    rollNumber: '2510993025',
    department: 'CSE AIML',
    email: 'harshdeep3025.beai25@chitkara.edu.in',
    group: 'core',
    order: 14
  },
  {
    name: 'Tushar',
    role: 'Member',
    rollNumber: '2510993128',
    department: 'CSE AIML',
    email: 'tushar3128.beai25@chitkara.edu.in',
    group: 'core',
    order: 15
  },
  {
    name: 'Tanvi Garg',
    role: 'Member',
    rollNumber: '2610990964',
    department: 'CSE Core',
    email: 'tanvi0964.becse26@chitkara.edu.in',
    group: 'core',
    order: 16
  }
];

export const SAMPLE_EVENTS = [
  {
    title: 'Hackathon: Code Sprint 2025',
    description: 'A 24-hour hackathon where teams build innovative solutions to real-world problems. Open to all skill levels.',
    date: 'Dec 15, 2025',
    time: '9:00 AM – 9:00 AM',
    location: 'Main Auditorium',
    category: 'Hackathon',
    startDate: '2025-12-15',
    endDate: '2025-12-16',
    attendees: 120,
    isSample: true
  },
  {
    title: 'Workshop: React from Scratch',
    description: 'Learn how to build modern web applications with React. Covers components, hooks, routing and state management.',
    date: 'Dec 8, 2025',
    time: '2:00 PM – 5:00 PM',
    location: 'Lab 204',
    category: 'Workshop',
    startDate: '2025-12-08',
    attendees: 45,
    isSample: true
  },
  {
    title: 'Tech Talk: Introduction to AI/ML',
    description: 'An introductory session on artificial intelligence and machine learning, covering key concepts and practical applications.',
    date: 'Nov 28, 2025',
    time: '4:00 PM – 5:30 PM',
    location: 'Seminar Hall B',
    category: 'Tech Talk',
    startDate: '2025-11-28',
    attendees: 60,
    isSample: true
  },
  {
    title: 'Git & GitHub Bootcamp',
    description: 'Hands-on session on version control with Git and GitHub. Learn branching, merging, pull requests and collaborative workflows.',
    date: 'Nov 20, 2025',
    time: '3:00 PM – 5:00 PM',
    location: 'Lab 102',
    category: 'Workshop',
    startDate: '2025-11-20',
    attendees: 38,
    isSample: true
  },
  {
    title: 'Code & Coffee Meetup',
    description: 'An informal gathering to work on personal projects, share ideas and connect with fellow developers over coffee.',
    date: 'Nov 15, 2025',
    time: '10:00 AM – 12:00 PM',
    location: 'Cafeteria',
    category: 'Meetup',
    startDate: '2025-11-15',
    attendees: 25,
    isSample: true
  },
  {
    title: 'DSA Challenge Week',
    description: 'A week-long data structures and algorithms challenge. Solve daily problems and compete on the leaderboard.',
    date: 'Nov 1 – Nov 7, 2025',
    time: 'All Day',
    location: 'Online',
    category: 'Competition',
    startDate: '2025-11-01',
    endDate: '2025-11-07',
    attendees: 85,
    isSample: true
  }
];

export const PROJECTS = [
  {
    title: 'Code2Chill Website',
    description: 'The official website of our coding club, built with React, Vite and Tailwind CSS. A clean, developer-inspired community platform.',
    tech: [
      'React',
      'Tailwind CSS',
      'Vite'
    ],
    category: 'Web',
    github: 'https://github.com/CodeWithPrinceX/Code2Chill',
    live: '',
    isSample: false
  },
  {
    title: 'StudySync',
    description: 'A collaborative study planner for students. Create study groups, share notes and track progress on shared goals.',
    tech: [
      'React',
      'Node.js',
      'MongoDB'
    ],
    category: 'Web',
    github: '',
    live: '',
    stars: 8,
    forks: 3,
    contributors: 3,
    isSample: true
  },
  {
    title: 'Campus Nav',
    description: 'An interactive campus map and navigation tool. Find classrooms, labs and events happening around you in real time.',
    tech: [
      'React Native',
      'Firebase',
      'Maps API'
    ],
    category: 'Mobile',
    github: '',
    live: '',
    stars: 15,
    forks: 7,
    contributors: 5,
    isSample: true
  },
  {
    title: 'Sentiment Analyzer',
    description: 'A machine learning tool that analyses text sentiment using natural language processing. Trained on social media datasets.',
    tech: [
      'Python',
      'TensorFlow',
      'Flask'
    ],
    category: 'AI/ML',
    github: '',
    live: '',
    stars: 22,
    forks: 10,
    contributors: 3,
    isSample: true
  },
  {
    title: 'DevQuiz CLI',
    description: 'A command-line quiz game to test your programming knowledge. Supports multiple languages and difficulty levels.',
    tech: [
      'Node.js',
      'Chalk',
      'Inquirer'
    ],
    category: 'CLI Tool',
    github: '',
    live: '',
    stars: 6,
    forks: 2,
    contributors: 2,
    isSample: true
  },
  {
    title: 'Portfolio Generator',
    description: 'A tool that generates a clean developer portfolio from a JSON config file. Customisable themes and deploy-ready output.',
    tech: [
      'JavaScript',
      'HTML',
      'CSS'
    ],
    category: 'Web',
    github: '',
    live: '',
    stars: 18,
    forks: 8,
    contributors: 4,
    isSample: true
  }
];
