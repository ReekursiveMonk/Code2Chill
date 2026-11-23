<div align="center">

# &lt;Code2Chill/&gt;

**The website of Code2Chill, the student-led developer community at Chitkara University.**

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)

</div>

---

## Overview

Code2Chill brings together programmers, software developers and AI enthusiasts at Chitkara University to collaborate, take part in events, showcase projects and grow beyond the classroom.

This repository contains:

| Folder | What it is |
| --- | --- |
| [`Frontend/`](Frontend) | React single-page app: homepage, events, projects, team, Join Us, accounts |
| [`Backend/`](Backend) | Node.js + Express + MongoDB REST API: accounts (JWT), Join Us applications, events, projects, team. Full API reference in [`Backend/README.md`](Backend/README.md) |

---

## Features

- **Home:** hero with Chitkara University branding, a developer-workspace illustration, club statistics (the member count comes live from the team API), About, What We Do and a call to action.
- **Events:** loaded from the API, with category and upcoming/past filters. Upcoming or past is calculated from each event's date.
- **Projects:** loaded from the API, with a category filter, tech tags and GitHub/live links (missing links and stats are hidden).
- **Team:** Leadership and Core Team loaded from the API.
- **Join Us:** application form that submits to the backend (validated on both sides, one open application per email), plus club information and FAQs.
- **Accounts:** real signup, login, profile and logout. Passwords are hashed with bcrypt and sessions use JWTs. There's a profile menu in the navbar.
- **Admin:** admins can list Join applications and change their status through the API. There's no admin screen yet.
- **Loading, error and empty states** for everything loaded from the API.
- **404 page**, a responsive layout, a floating navbar with a mobile menu, subtle page-entrance animations (off when **Reduce motion** is on), and accessible forms and navigation.

---

## Tech Stack

**Frontend:** React 19, Vite 6, Tailwind CSS 4 (configured in `src/index.css`, so there's no `tailwind.config.js`), React Router 7 and Lucide icons. JavaScript (JSX) only, and no animation libraries.

**Backend:** Node.js 20+, Express 5, MongoDB with Mongoose 8, JSON Web Tokens, bcrypt, dotenv and cors.

### Design tokens

Defined in `Frontend/src/index.css` and used as Tailwind classes (e.g. `bg-bg-card`, `text-accent`, `border-border`):

| Token | Value | Use |
| --- | --- | --- |
| `bg-primary` | `#0B0B0B` | Page background |
| `bg-secondary` | `#121212` | Navbar surface |
| `bg-card` | `#171512` | Cards |
| `border` / `border-light` | `#302A20` / `#3A3328` | Borders |
| `accent` | `#F2A900` (amber) | Primary accent: buttons, links, highlights |
| `accent-2` | `#FF7A18` (orange) | Secondary accent: small markers only |
| `text-primary` / `text-secondary` / `text-muted` | `#F5F1E8` / `#A6A098` / `#8C867D` | Text |

---

## Local Setup (Windows PowerShell)

**You'll need:** [Node.js](https://nodejs.org/) 20 or later, and a MongoDB database (a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or a local MongoDB).

### 1. Backend

```powershell
cd D:\Code2Chill\Backend
npm install
Copy-Item .env.example .env
notepad .env
```

**Fill in `.env`:**
- `MONGODB_URI`: your MongoDB connection string
- `JWT_SECRET`: at least 32 random characters. Generate one with:
  ```powershell
  node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
  ```
- `CLIENT_ORIGIN`: keep `http://localhost:5173,http://localhost:4173` for local use

**Then load the content and start the API:**

```powershell
npm run seed      # loads the team, projects and sample events (safe to re-run)
npm run dev       # API on http://localhost:5000
```

Check it's working at `http://localhost:5000/api/health`. It should show `"status": "ok"` and `"database": "connected"`.

### 2. Frontend (in a second PowerShell window)

```powershell
cd D:\Code2Chill\Frontend
npm install
Copy-Item .env.example .env      # contains VITE_API_URL=http://localhost:5000
npm run dev                      # site on http://localhost:5173
```

### 3. Make yourself an admin (optional)

Sign up on the website first, then run:

```powershell
cd D:\Code2Chill\Backend
npm run make-admin -- your@email.com
```

### Commands

| Folder | Command | What it does |
| --- | --- | --- |
| `Backend` | `npm run dev` / `npm start` | Start the API (with or without auto-restart) |
| `Backend` | `npm run seed` | Load the team, projects and sample events |
| `Backend` | `npm run seed -- --remove-samples` | Delete all sample events and projects |
| `Backend` | `npm run make-admin -- <email>` | Give an existing account the admin role |
| `Frontend` | `npm run dev` | Start the site with hot reload |
| `Frontend` | `npm run build` | Production build into `Frontend/dist/` |
| `Frontend` | `npm run preview` | Serve the production build on port 4173 |

---

## Environment Variables

| Where | Variable | Required | Purpose |
| --- | --- | --- | --- |
| `Backend/.env` | `MONGODB_URI` | Yes | MongoDB connection string |
| `Backend/.env` | `JWT_SECRET` | Yes | Token signing secret, at least 32 characters |
| `Backend/.env` | `JWT_EXPIRES_IN` | No (`7d`) | Login token lifetime |
| `Backend/.env` | `CLIENT_ORIGIN` | No (localhost 5173 + 4173) | Comma-separated frontend URLs allowed by CORS |
| `Backend/.env` | `PORT`, `NODE_ENV` | No (`5000`, `development`) | Port and environment |
| `Frontend/.env` | `VITE_API_URL` | Yes in production | Backend URL (defaults to `http://localhost:5000` in development) |

`.env` files are git-ignored. Only the `.env.example` templates, which contain no secrets, are committed. `VITE_API_URL` is public by design: it's built into the browser code, so never put secrets in `VITE_` variables.

---

## Routes

### Website

| Path | Page | Notes |
| --- | --- | --- |
| `/` | Home | |
| `/events` | Events | |
| `/projects` | Projects | |
| `/team` | Team | |
| `/join` | Join Us | Submits to `POST /api/join` |
| `/login` | Log in | Redirects to `/profile` if already signed in |
| `/signup` | Sign up | Redirects to `/profile` if already signed in |
| `/profile` | Profile | Redirects to `/login` if not signed in, then returns here |
| `*` | 404 | Any unknown URL |

### API

| Method | Path | Access |
| --- | --- | --- |
| GET | `/api/health` | Public |
| POST | `/api/auth/signup` · `/api/auth/login` | Public |
| GET | `/api/auth/me` | Logged in |
| POST | `/api/join` | Public |
| GET | `/api/join` | Admin |
| PATCH | `/api/join/:id/status` | Admin |
| GET | `/api/events` · `/api/events/:id` | Public |
| GET | `/api/projects` · `/api/projects/:id` | Public |
| GET | `/api/team` | Public |

Request and response formats are in [`Backend/README.md`](Backend/README.md).

---

## Project Structure

```text
Code2Chill/
├── README.md
├── Backend/                     # see Backend/README.md for the full tree
│   ├── server.js · app.js
│   ├── config/  models/  controllers/  routes/  middleware/  utils/
│   ├── data/seedData.js         # real team, projects, sample events
│   └── scripts/                 # seed.js, makeAdmin.js
└── Frontend/
    ├── index.html · vite.config.js · vercel.json · .env.example
    └── src/
        ├── main.jsx · App.jsx · index.css
        ├── services/api.js      # every backend call goes through here
        ├── hooks/useApiData.js  # load data with loading / error / retry
        ├── context/AuthContext.jsx
        ├── components/          # Navbar, Footer, DataState (loading/error/empty), …
        ├── data/stats.js        # the three sample Home statistics
        ├── pages/               # one component per route
        └── utils/               # form validation, avatar initials
```

---

## Data

- **Team, events and projects live in MongoDB** and are loaded with `npm run seed` from `Backend/data/seedData.js`.
  - **Team (real):** Lakshay (President), Jiya (Vice President), Samanyu (Tech Head), Prince Pratik (Member, GitHub `ReekursiveMonk`). The Home "Members" figure is the team count from the API.
  - **Events:** all six are placeholders, stored with `isSample: true` and shown with a "Sample" label. They're dated 2025, so they appear as *Past*.
  - **Projects:** "Code2Chill Website" is real (its GitHub stats are left empty). The other five are samples with a "Sample" label.
  - **Remove the samples** with `npm run seed -- --remove-samples`, then add real records in MongoDB (Atlas or Compass) or in `seedData.js`.
- **Home statistics:** Projects `10+`, Events `15+` and Workshops `5+` in `Frontend/src/data/stats.js` are unverified, and each shows a "Sample figure" label. Replace each value and delete its `sample: true` once it's real.

---

## Security and Limitations

**What's in place:**
- Passwords are hashed with bcrypt (12 rounds) and never returned by the API.
- Login tokens are HS256 JWTs.
- The frontend stores **only the token**, in `sessionStorage`. It's cleared when the tab closes, and removed if the server rejects it.
- Signup can never create an admin. Admin rights are granted only with `npm run make-admin` on the server.
- Inputs are validated on both the frontend and the backend.
- CORS is restricted to `CLIENT_ORIGIN`.

**Not yet included:**
- rate limiting
- email verification and password reset
- an admin screen for reviewing applications (use the API for now)

**Token storage trade-off:** a token in `sessionStorage` is readable by scripts on the page. The site doesn't render user-supplied HTML, which limits that risk. HTTP-only cookies would be stronger, but they need same-site hosting or extra CSRF protection.

---

## Deployment

### Frontend (Vercel)

| Setting | Value |
| --- | --- |
| Repository | `CodeWithPrinceX/Code2Chill` |
| Root Directory | `Frontend` |
| Framework | Vite |
| Production branch | `main` |
| Environment variable | `VITE_API_URL` = your deployed backend URL (no trailing slash) |

`Frontend/vercel.json` rewrites every path to `index.html`, so direct visits and refreshes on routes like `/team` work.

### Backend

The backend is a standard long-running Node.js server. Deploy `Backend/` to a Node host such as Render or Railway (start command `npm start`), with a MongoDB Atlas database. Then:

1. Set `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production` and `CLIENT_ORIGIN=https://<your-vercel-domain>` on the host.
2. Run `npm run seed` once against the production database.
3. Put the backend's public URL into Vercel's `VITE_API_URL` and redeploy the frontend.

---

## Contributing

1. Create a branch: `git checkout -b feature/your-change`
2. Run the backend and frontend locally (see [Local Setup](#local-setup-windows-powershell)) and check your change.
3. Make sure `npm run build` succeeds in `Frontend/`.
4. Open a pull request describing what changed and why.

## License

No license has been chosen yet. Until one is added, all rights are reserved by the project maintainers.
