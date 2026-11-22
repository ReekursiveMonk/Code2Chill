<div align="center">

# Code2Chill

**Code together. Build boldly. Chill while you ship.**

The official website of Code2Chill, a university developer community for programmers, software developers and AI enthusiasts.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

[Repository](https://github.com/CodeWithPrinceX/Code2Chill) · [Report a Bug](https://github.com/CodeWithPrinceX/Code2Chill/issues) · [Request a Feature](https://github.com/CodeWithPrinceX/Code2Chill/issues)

</div>

<!-- Add a live demo link here once the site is deployed, e.g.:
**Live site:** https://code2chill.example.com
-->

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

**Code2Chill** is a university developer community that brings together programmers, software developers and AI enthusiasts. Its members collaborate, explore new technologies and build real projects beyond the classroom.

This repository contains the club's official website. The site exists to:

- **Represent the club** by showing who Code2Chill is, what it stands for and what it does.
- **Showcase student work** by highlighting projects built by members.
- **Introduce the people** behind the community through its core team.
- **Lower the barrier to joining** by giving students a simple way to explore the club and express interest in becoming members.

### Who it's for

| Audience | What they get |
| --- | --- |
| **Prospective members** | A clear picture of the club, its activities and how to join |
| **Current members** | A place to see events, projects and the team |
| **Faculty and university staff** | An overview of the club's work and impact |
| **Collaborators and sponsors** | Insight into the community's projects and people |

---

## Key Features

> **Project status: early development.** The repository has been set up and the front-end is being built. The features below are **planned for the first release** and will be marked ✅ as they ship.
>
> **Status legend:** ✅ Implemented · 🚧 In progress · 📋 Planned

| Feature | Description | Status |
| --- | --- | --- |
| **Homepage** | Introduces the club, its mission and calls to action | 📋 |
| **Events and activities** | Displays the club's events, workshops and activities | 📋 |
| **Project showcase** | Highlights projects built by student members | 📋 |
| **Core team directory** | Profiles of the club's core team members | 📋 |
| **Membership application** | A form for students to apply to join (front-end interface only, see note below) | 📋 |
| **Client-side routing** | Page navigation with React Router, without full page reloads | 📋 |
| **Responsive navigation** | Navbar that collapses into a mobile menu on small screens | 📋 |
| **Mobile-friendly layout** | Responsive design built with Tailwind CSS utility classes | 📋 |

> [!NOTE]
> **The first version of the membership application will be front-end only.** Until a backend is added, form submissions will **not be stored or sent anywhere**. See the [Roadmap](#roadmap) for planned backend integration.

---

## Technology Stack

The site is being built as a fully client-side single-page application with the following stack.

| Technology | Role |
| --- | --- |
| **[React](https://react.dev/)** | Component-based UI library used to build every page and section |
| **[Vite](https://vitejs.dev/)** | Development server with hot module replacement, plus a fast production bundler |
| **JavaScript (ES6+)** | Language for all application logic and components (JSX) |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS framework used for styling and responsive layouts |
| **[React Router DOM](https://reactrouter.com/)** | Client-side routing between pages |
| **[Lucide React](https://lucide.dev/)** | Lightweight, consistent SVG icon set |

> **Backend:** none planned for the first release. The site will have no server, database or authentication, and all content will live in the front-end code.

---

## Project Structure

The front-end lives in the `Frontend/` folder. The tree below shows its **planned layout**, which will be updated as the code is added.

```text
Code2Chill/
├── Frontend/
│   ├── public/                  # Static assets served as-is (favicon, images)
│   ├── src/
│   │   ├── assets/              # Images, logos and other imported media
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx       # Responsive navigation bar with mobile menu
│   │   │   └── Footer.jsx       # Site-wide footer
│   │   ├── pages/               # Route-level page components
│   │   │   ├── Home.jsx         # Landing page and club introduction
│   │   │   ├── Events.jsx       # Events and activities
│   │   │   ├── Projects.jsx     # Student project showcase
│   │   │   ├── Team.jsx         # Core team directory
│   │   │   └── Join.jsx         # Membership application form
│   │   ├── App.jsx              # Root component and route definitions
│   │   ├── main.jsx             # Application entry point
│   │   └── index.css            # Global styles and Tailwind directives
│   ├── index.html               # HTML template used by Vite
│   ├── package.json             # Dependencies and npm scripts
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind configuration (if using Tailwind v3)
│   └── postcss.config.js        # PostCSS configuration (if using Tailwind v3)
└── README.md                    # Project documentation
```

### How it will fit together

- **`main.jsx`** mounts the React app and wraps it in the router.
- **`App.jsx`** defines the routes and maps each URL to a component in `pages/`.
- **`pages/`** holds one component per route. Each page is built from smaller pieces in `components/`.
- **`components/`** holds shared UI, such as the navbar and footer, that appears across pages.
- **Styling** is done almost entirely with Tailwind utility classes. Global styles and Tailwind imports live in `index.css`.

---

## Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/)** 18 or later (LTS recommended)
- **npm** (comes with Node.js)
- **Git**

### Installation

> The application code has not been added to the repository yet. These steps will work once the Vite project is in `Frontend/`.

1. **Clone the repository**

   ```bash
   git clone https://github.com/CodeWithPrinceX/Code2Chill.git
   cd Code2Chill/Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open the site.** Visit **http://localhost:5173** in your browser. Vite reloads the page automatically when you save changes.

### Building for production

```bash
npm run build     # Outputs an optimised build to dist/
npm run preview   # Serves the production build locally for testing
```

> **Deploying:** the `dist/` folder is a static site and can be hosted on Vercel, Netlify, GitHub Pages or any static host. Because the site uses client-side routing, set up a rewrite so that every path serves `index.html`. Otherwise, refreshing a page such as `/team` returns a 404.

---

## Available Scripts

These are the standard Vite scripts the project will use.

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot reload |
| `npm run build` | Builds the app for production into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint on the project (if configured) |

---

## Roadmap

Beyond the first release, these features are planned.

- [ ] **Backend integration** to store membership applications (e.g. Node.js/Express, Firebase or Supabase)
- [ ] **Application confirmation emails** for new applicants
- [ ] **Event registration** so students can RSVP for events
- [ ] **Admin dashboard** for the core team to manage events, projects and applications
- [ ] **Dynamic content** that loads events, projects and team data from a database instead of hard-coded files
- [ ] **Member authentication** with login for club members
- [ ] **Blog and announcements** for club news and technical write-ups
- [ ] **Public deployment** with a custom domain

Have an idea? [Open an issue](https://github.com/CodeWithPrinceX/Code2Chill/issues) to suggest it.

---

## Contributing

Contributions from club members and the wider community are welcome.

1. **Fork** the repository.
2. **Create a branch** for your change:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and test them locally with `npm run dev` (from the `Frontend/` folder).
4. **Commit** with a clear message:
   ```bash
   git commit -m "feat: add event filtering by category"
   ```
5. **Push** your branch and **open a pull request** that describes what you changed and why.

### Guidelines

- Keep components small and reusable, and put shared UI in `Frontend/src/components/`.
- Use Tailwind utility classes for styling instead of new CSS files where possible.
- Check that your changes look right on both mobile and desktop.
- Use [Conventional Commits](https://www.conventionalcommits.org/) prefixes (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`).

---

## License

A license has not been chosen yet. Until one is added, all rights are reserved by the project maintainers.

---

## Contact

**Code2Chill**, the university coding club

- **GitHub:** [@CodeWithPrinceX](https://github.com/CodeWithPrinceX)
- **Issues and suggestions:** [GitHub Issues](https://github.com/CodeWithPrinceX/Code2Chill/issues)

<!-- Add the club email, Instagram, LinkedIn or Discord invite here. -->

<div align="center">

**Built with ☕ and curiosity by the Code2Chill community.**

</div>
