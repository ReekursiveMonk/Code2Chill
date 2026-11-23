<div align="center">

# &lt;Code2Chill/&gt;

**The website of Code2Chill, the student-led developer community at Chitkara University.**

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

---

## Overview

Code2Chill brings together programmers, software developers and AI enthusiasts at Chitkara University to collaborate, take part in events, showcase projects and grow beyond the classroom.

This repository contains the **frontend**: a single-page React application covering the club's homepage, events, projects, team, membership application and a prototype account area.

> [!IMPORTANT]
> **Frontend only.** There is no backend yet. Login, signup and the Join Us form run entirely in the browser. See [Current limitations](#current-limitations) before deploying.

---

## Features

- **Home:** hero with Chitkara University branding, a developer-workspace illustration, club statistics (the member count is calculated from the team data), About, What We Do and a call to action.
- **Events:** event cards with category and status filters. Whether an event is *upcoming* or *past* is calculated from its date, so it never goes stale.
- **Projects:** project cards with a category filter, tech tags and GitHub/live links (placeholder links are hidden automatically).
- **Team:** Leadership and Core Team sections built from `src/data/team.js`.
- **Join Us:** membership application form with validation, a success screen, club information and FAQs.
- **Login, Signup and Profile:** a clearly labelled **frontend prototype** of accounts (see limitations below), with a profile menu in the navbar.
- **404 page** for unknown URLs.
- **Responsive design:** a floating navbar with a mobile menu, and layouts for desktop, tablet and phone.
- **Page transitions:** short fade-up entrances on every page, with staggered cards. Fully disabled when the visitor has **Reduce motion** turned on.
- **Accessibility:** labelled form fields, keyboard focus rings, `aria-current` on the active link, Esc closes menus, and a reduced-motion rule.

---

## Tech Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| [React](https://react.dev/) | ^19.1.0 | UI components |
| [Vite](https://vitejs.dev/) | ^6.3.0 | Dev server and production build |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.3.5 | Styling, via the `@tailwindcss/vite` plugin |
| [React Router DOM](https://reactrouter.com/) | ^7.18.6 | Client-side routing |
| [Lucide React](https://lucide.dev/) | ^1.77.0 | Interface icons |

- Written in **JavaScript (JSX)**. No TypeScript.
- **Tailwind v4 is configured in CSS**: theme colours, fonts and custom utilities live in `src/index.css`. There is no `tailwind.config.js`.
- Lucide v1 has no brand logos, so GitHub, LinkedIn, Instagram and X icons are local SVGs in `src/components/BrandIcons.jsx`.
- No animation libraries: all motion is plain CSS.

### Design tokens

Defined in `src/index.css` and used as Tailwind classes (e.g. `bg-bg-card`, `text-accent`, `border-border`):

| Token | Value | Use |
| --- | --- | --- |
| `bg-primary` | `#0B0B0B` | Page background |
| `bg-secondary` | `#121212` | Navbar surface |
| `bg-card` | `#171512` | Cards |
| `border` / `border-light` | `#302A20` / `#3A3328` | Borders |
| `accent` | `#F2A900` (amber) | Primary accent: buttons, links, highlights |
| `accent-2` | `#FF7A18` (orange) | Secondary accent: small markers only |
| `text-primary` / `text-secondary` / `text-muted` | `#F5F1E8` / `#A6A098` / `#8C867D` | Text |

Fonts: Inter (body), Space Grotesk (headings) and JetBrains Mono (code-style labels), loaded from Google Fonts in `index.html`.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later (LTS recommended), with npm
- Git

### Install and run

```bash
git clone https://github.com/CodeWithPrinceX/Code2Chill.git
cd Code2Chill/Frontend
npm install
npm run dev
```

The dev server opens **http://localhost:5173** and reloads as you save.

### Commands

Run from the `Frontend/` folder.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build in `Frontend/dist/` |
| `npm run preview` | Serve the production build locally for a final check |

---

## Routes

| Path | Page | Notes |
| --- | --- | --- |
| `/` | Home | |
| `/events` | Events | Category and status filters |
| `/projects` | Projects | Category filter |
| `/team` | Team | |
| `/join` | Join Us | Frontend-only application form |
| `/login` | Log in | Redirects to `/profile` if already signed in |
| `/signup` | Sign up | Redirects to `/profile` if already signed in |
| `/profile` | Profile | Redirects to `/login` if not signed in, then returns here |
| `*` | 404 | Any unknown URL |

---

## Project Structure

```text
Code2Chill/
├── README.md
└── Frontend/
    ├── index.html                 # HTML entry; loads Google Fonts
    ├── vercel.json                # SPA rewrite so routes survive page refreshes
    ├── package.json
    ├── vite.config.js             # React + Tailwind plugins, dev port 5173
    ├── public/
    │   └── favicon.svg
    └── src/
        ├── main.jsx               # Router + AuthProvider + App
        ├── App.jsx                # Layout and routes (keyed page wrapper for transitions)
        ├── index.css              # Theme tokens, utilities, animations, reduced-motion rule
        ├── components/
        │   ├── Navbar.jsx         # Floating navbar, mobile menu, login / profile entry
        │   ├── ProfileMenu.jsx    # Desktop profile dropdown
        │   ├── Footer.jsx         # Links, GitHub and Instagram
        │   ├── Logo.jsx
        │   ├── SectionHeading.jsx # Label + heading used on every page
        │   ├── HeroCanvas.jsx     # Static SVG workspace illustration (Home hero)
        │   ├── Reveal.jsx         # Fade-up on scroll (Home sections)
        │   ├── BackgroundFX.jsx   # Fixed, static page background
        │   ├── BrandIcons.jsx     # GitHub / LinkedIn / Instagram / X icons
        │   ├── AuthLayout.jsx     # Shared shell for Login and Signup
        │   ├── FormField.jsx      # Labelled input with error message
        │   ├── PrototypeNotice.jsx
        │   └── ScrollToTop.jsx    # Scrolls to top on navigation
        ├── context/
        │   └── AuthContext.jsx    # Prototype session (name + email only)
        ├── data/
        │   ├── team.js            # Real team members
        │   ├── stats.js           # Home statistics (member count is computed)
        │   ├── events.js          # SAMPLE DATA
        │   └── projects.js        # SAMPLE DATA
        ├── pages/                 # One component per route
        │   ├── Home.jsx  Events.jsx  Projects.jsx  Team.jsx  Join.jsx
        │   └── Login.jsx  Signup.jsx  Profile.jsx  NotFound.jsx
        └── utils/
            ├── validation.js      # Name, email and password checks
            └── initials.js        # Avatar initials
```

---

## Data

All page content lives in `Frontend/src/data/`. Edit these files to update the site; no page code changes are needed.

### Team (`team.js`): real data

```js
export const TEAM_DATA = {
  leads: [
    { name: 'Lakshay', role: 'President' },
    { name: 'Jiya', role: 'Vice President' },
  ],
  core: [
    { name: 'Samanyu', role: 'Tech Head' },
    { name: 'Prince Pratik', role: 'Member', github: 'https://github.com/ReekursiveMonk' },
  ],
};
```

- Optional fields: `bio`, `github`, `linkedin`, `twitter` (X) and `avatar`. Anything left out is simply not shown, so don't add placeholders.
- `TEAM_MEMBERS` (all groups combined) is exported too. **The Home "Members" statistic is `TEAM_MEMBERS.length`**, so adding or removing a member updates it automatically.

### Stats (`stats.js`)

- **Members**: calculated from `team.js` (currently 4).
- **Projects, Events, Workshops**: unverified sample values (`10+`, `15+`, `5+`). Each has `sample: true`, which shows a small "Sample figure" label under the number on the Home page. When you replace a value with a real, verified figure, delete its `sample: true`.

### Events and Projects (`events.js`, `projects.js`): sample data

Both files are marked **SAMPLE DATA** and must be replaced with real club information before launch.

- **Events** need `startDate` (and optionally `endDate`) in `YYYY-MM-DD` format. The page uses them to decide *upcoming* vs *past*. `date` and `time` are the text shown on the card. All six sample events are dated 2025, so they currently all show as *Past* and the *Upcoming* filter is empty.
- **Projects**: set `github` / `live` to a full URL, or leave them as `'#'` / `null` to hide the link. Star, fork and contributor counts are currently placeholders.

### Social links

- GitHub repository: `https://github.com/CodeWithPrinceX/Code2Chill` (footer and Projects page)
- Instagram: [`@code2chill.osl`](https://www.instagram.com/code2chill.osl/) (footer)
- LinkedIn has no URL yet and stays hidden until one is added in `Footer.jsx`.

---

## Current Limitations

### Authentication is a frontend prototype

Login, signup and profile **do not create or verify real accounts**:

- Any email and password are accepted. Passwords are only used for form validation and are **never stored or sent anywhere**.
- Only the **name and email** are kept, in `sessionStorage` (key `code2chill:prototype-session`). They survive a page refresh and are cleared on logout or when the tab closes.
- Logging in doesn't ask for a name, so the profile shows "Not provided" in that case.
- The login, signup and profile pages all show a "Prototype only" notice.

`src/context/AuthContext.jsx` is structured so that only the bodies of `signup`, `login` and `logout` need to change when a real backend (planned: Node.js, Express and MongoDB) is added. Pages use `useAuth()` and won't need changes.

### The Join Us form doesn't submit anywhere

It validates the required fields (name, email, branch) and shows a confirmation screen saying the application was **recorded on this page only**. Nothing is sent or saved.

### Other

- Events, projects and three of the Home statistics are sample data (see [Data](#data)).
- There is no automated test suite or lint configuration yet.

---

## Deployment (Vercel)

The site deploys to [Vercel](https://vercel.com) from the GitHub repository `CodeWithPrinceX/Code2Chill`.

| Vercel project setting | Value |
| --- | --- |
| Root Directory | `Frontend` |
| Framework Preset | Vite |
| Build Command | `npm run build` (default) |
| Output Directory | `dist` (default) |
| Production Branch | `main` |

**Page refreshes on routes like `/team`:** `Frontend/vercel.json` rewrites every path to `index.html`, so React Router can handle direct visits and refreshes instead of Vercel returning its own 404. Unknown paths then show the site's 404 page. Static files in `dist/` (scripts, styles, `favicon.svg`) are served before the rewrite applies.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

No environment variables are needed. Pushing to `main` triggers a production deployment, and other branches get preview deployments.

**Before a public launch:** replace the sample events, projects and statistics (see [Data](#data)), and decide how membership applications and accounts will really be handled (see [Current limitations](#current-limitations)).

---

## Roadmap

- [ ] Backend (Node.js, Express, MongoDB) for accounts and membership applications
- [ ] Replace sample events, projects and statistics with real club data
- [ ] Official LinkedIn link and contact details
- [ ] Linting and automated tests
- [ ] Public deployment

---

## Contributing

1. Create a branch: `git checkout -b feature/your-change`
2. Make your change in `Frontend/` and check it with `npm run dev`.
3. Make sure `npm run build` succeeds.
4. Open a pull request describing what changed and why.

Please use the theme tokens (`bg-bg-card`, `text-accent`, `border-border` …), reuse the shared components, and check your change on mobile and desktop.

---

## License

No license has been chosen yet. Until one is added, all rights are reserved by the project maintainers.
