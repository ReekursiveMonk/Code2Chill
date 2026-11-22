/**
 * SAMPLE DATA: replace with real club information before launch.
 *
 * Placeholder events: titles, dates, times, venues and attendee counts are invented.
 *
 * `date` and `time` are the text shown on the card.
 * `startDate` (and optional `endDate` for multi-day events) are ISO dates
 * (YYYY-MM-DD). Events.jsx uses them to decide whether an event is upcoming
 * or past, so there is no hard-coded status to go out of date.
 * None of it describes real people, events or numbers.
 */

export const EVENTS_DATA = [
  {
    id: 1,
    title: 'Hackathon: Code Sprint 2025',
    description:
      'A 24-hour hackathon where teams build innovative solutions to real-world problems. Open to all skill levels.',
    date: 'Dec 15, 2025',
    time: '9:00 AM – 9:00 AM',
    location: 'Main Auditorium',
    category: 'Hackathon',
    startDate: '2025-12-15',
    endDate: '2025-12-16',
    attendees: 120,
  },
  {
    id: 2,
    title: 'Workshop: React from Scratch',
    description:
      'Learn how to build modern web applications with React. Covers components, hooks, routing and state management.',
    date: 'Dec 8, 2025',
    time: '2:00 PM – 5:00 PM',
    location: 'Lab 204',
    category: 'Workshop',
    startDate: '2025-12-08',
    attendees: 45,
  },
  {
    id: 3,
    title: 'Tech Talk: Introduction to AI/ML',
    description:
      'An introductory session on artificial intelligence and machine learning, covering key concepts and practical applications.',
    date: 'Nov 28, 2025',
    time: '4:00 PM – 5:30 PM',
    location: 'Seminar Hall B',
    category: 'Tech Talk',
    startDate: '2025-11-28',
    attendees: 60,
  },
  {
    id: 4,
    title: 'Git & GitHub Bootcamp',
    description:
      'Hands-on session on version control with Git and GitHub. Learn branching, merging, pull requests and collaborative workflows.',
    date: 'Nov 20, 2025',
    time: '3:00 PM – 5:00 PM',
    location: 'Lab 102',
    category: 'Workshop',
    startDate: '2025-11-20',
    attendees: 38,
  },
  {
    id: 5,
    title: 'Code & Coffee Meetup',
    description:
      'An informal gathering to work on personal projects, share ideas and connect with fellow developers over coffee.',
    date: 'Nov 15, 2025',
    time: '10:00 AM – 12:00 PM',
    location: 'Cafeteria',
    category: 'Meetup',
    startDate: '2025-11-15',
    attendees: 25,
  },
  {
    id: 6,
    title: 'DSA Challenge Week',
    description:
      'A week-long data structures and algorithms challenge. Solve daily problems and compete on the leaderboard.',
    date: 'Nov 1 – Nov 7, 2025',
    time: 'All Day',
    location: 'Online',
    category: 'Competition',
    startDate: '2025-11-01',
    endDate: '2025-11-07',
    attendees: 85,
  },
];
