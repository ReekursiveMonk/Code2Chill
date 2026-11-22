<div align="center">

# &lt;Code2Chill/&gt;

**A student-led developer community. Code together, build boldly, grow beyond the classroom.**

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

---

## About

**Code2Chill** is a student-led developer community at our university. It brings together programmers, software developers and AI enthusiasts to collaborate, take part in events, showcase projects and learn from each other outside the classroom.

This repository contains the community's **website frontend**. It gives students one place to find out what the club does, see what members are building, meet the core team and apply to join.

> [!IMPORTANT]
> **The site currently shows sample content.** Events, team members, projects and the homepage statistics are placeholder data. They must be replaced with verified club information before the site is launched. See [Replacing sample content](#replacing-sample-content).

---

## Pages

| Page | Route | What it contains |
| --- | --- | --- |
| **Home** | `/` | Hero with call-to-action buttons and club statistics, About (mission and vision), What We Do, Tech We Love, and a closing call-to-action |
| **Events** | `/events` | Event cards with date, time, venue and attendance, plus filters by category and by **Upcoming / Past**. Upcoming or past is worked out automatically from each event's date |
| **Projects** | `/projects` | Student project cards with tech tags and GitHub stats, a category filter, and a link to propose a project on GitHub |
| **Team** | `/team` | Club Lead and Core Team member cards, plus a "Join the Team" call-to-action |
| **Join Us** | `/join` | Membership application form, reasons to join, code of conduct, and FAQs |

Unknown URLs show a **404 Not Found** page with a link back home.

**On every page:**
- A responsive navbar that collapses into a mobile menu on small screens.
- A shared footer.
- The page scrolls back to the top when you move to another page.
- A consistent dark theme with green accents.

> [!NOTE]
> **The Join Us form is frontend-only.** It checks the required fields (name, email and branch) and shows a confirmation screen, but it **does not send or store applications anywhere**. There is no backend yet.

---

## Tech Stack

All of these are listed in [`Frontend/package.json`](Frontend/package.json).

| Technology | Version | Used for |
| --- | --- | --- |
| [React](https://react.dev/) | ^19.1.0 | Building the UI from components |
| [Vite](https://vitejs.dev/) | ^6.3.0 | Dev server with hot reload, and production builds |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.3.5 | Styling with utility classes, loaded through the `@tailwindcss/vite` plugin |
| [React Router DOM](https://reactrouter.com/) | ^7.18.6 | Moving between pages without full page reloads |
| [Lucide React](https://lucide.dev/) | ^1.77.0 | Interface icons |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | ^4.5.2 | React support in Vite |

The project is written in **JavaScript (JSX)**, not TypeScript.

**Notes:**
- **Tailwind v4 is configured in CSS, not JavaScript.** The theme colours and fonts are defined with `@theme` in `src/index.css`, so there is no `tailwind.config.js`.
- **Brand logos are drawn by the project itself.** Lucide v1 no longer includes them, so the GitHub, LinkedIn, Instagram and X icons live in `src/components/BrandIcons.jsx`.
- **No backend, database or authentication** is part of this project yet.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later (an LTS version is recommended)
- npm, which comes with Node.js
- Git

### Run locally

```bash
# 1. Clone the repository
git clone https://github.com/CodeWithPrinceX/Code2Chill.git

# 2. Move into the frontend folder
cd Code2Chill/Frontend

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Vite starts the site at **http://localhost:5173** and opens it in your browser. Changes you save appear immediately.

### Available scripts

Run these from the `Frontend/` folder.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates an optimised production build in `Frontend/dist/` |
| `npm run preview` | Serves the production build locally so you can test it |

> [!TIP]
> **Deploying:** `dist/` is a static site. Because the app handles page routing in the browser, set your host to serve `index.html` for every path. Otherwise refreshing a page such as `/team` returns a 404 from the server.

---

## Project Structure

```text
Code2Chill/
├── README.md
└── Frontend/
    ├── index.html               # HTML entry point; loads the Google Fonts
    ├── package.json             # Dependencies and npm scripts
    ├── vite.config.js           # Vite config with the React and Tailwind plugins
    ├── public/
    │   └── favicon.svg
    └── src/
        ├── main.jsx             # Mounts the app inside the router
        ├── App.jsx              # Page layout and route definitions
        ├── index.css            # Tailwind import, theme colours and fonts, global styles
        ├── assets/              # Images and media (currently empty)
        ├── components/          # Shared pieces used across pages
        │   ├── Navbar.jsx       # Responsive navigation with mobile menu
        │   ├── Footer.jsx       # Site footer with links
        │   ├── Logo.jsx         # <Code2Chill/> logo
        │   ├── SectionHeading.jsx   # Badge, title and description block
        │   ├── ScrollToTop.jsx  # Scrolls to the top when the page changes
        │   └── BrandIcons.jsx   # GitHub, LinkedIn, Instagram and X icons
        ├── data/                # Page content (SAMPLE DATA, see below)
        │   ├── events.js
        │   ├── projects.js
        │   ├── stats.js
        │   └── team.js
        └── pages/               # One component per route
            ├── Home.jsx
            ├── Events.jsx
            ├── Projects.jsx
            ├── Team.jsx
            ├── Join.jsx
            └── NotFound.jsx     # 404 page
```

**How the pieces fit together:**
1. `main.jsx` wraps the app in React Router.
2. `App.jsx` renders the navbar and footer around whichever page matches the current URL.
3. Each page builds its layout from shared components, and reads its cards from `src/data/` where it has any.

---

## Replacing Sample Content

Everything in `Frontend/src/data/` is **sample data** and is marked as such at the top of each file. Replace it with verified club information before launch.

| File | What to replace |
| --- | --- |
| `team.js` | Team names, roles, bios, profile links and photos (`avatar`). Only the lead's GitHub link is real |
| `events.js` | Every event's title, description, date, time, venue, category and attendee count. Set `startDate`, and `endDate` for multi-day events, in `YYYY-MM-DD` format so Upcoming and Past stay correct |
| `projects.js` | Project details, tech tags, GitHub and live links, and the star, fork and contributor counts. "Code2Chill Website" is real, but its numbers are placeholders |
| `stats.js` | The four statistics in the Home page hero |

**Placeholder links stay hidden.** A link set to `'#'` (or `null` on Team and Projects) doesn't appear on the page, so you can add real URLs one at a time. The footer's LinkedIn and Instagram links are also `'#'` for now, in `src/components/Footer.jsx`.

---

## Roadmap

These are **planned and not yet built**:

- [ ] A backend (Node.js, Express and MongoDB) to receive and store Join Us applications
- [ ] Real club content in place of the sample data
- [ ] Official contact details and social media links
- [ ] Public deployment

---

## Contributing

1. Fork the repository and create a branch: `git checkout -b feature/your-change`
2. Make your change inside `Frontend/` and test it with `npm run dev`.
3. Make sure `npm run build` succeeds.
4. Commit with a clear message, for example `fix: correct event date`, and open a pull request.

**Please follow the existing style:**
- Use the theme colour classes, such as `bg-bg-card`, `text-green-primary` and `border-border`.
- Reuse the shared components.
- Check your change on both mobile and desktop.

---

## License

No license has been chosen yet. Until one is added, all rights are reserved by the project maintainers.

---

<div align="center">

Built by the Code2Chill community · [GitHub](https://github.com/CodeWithPrinceX/Code2Chill)

</div>