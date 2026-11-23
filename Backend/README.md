# Code2Chill Backend

REST API for the Code2Chill website: **Node.js, Express, MongoDB (Mongoose), JWT and bcrypt**.

It provides user accounts (signup, login, current user), the Join Us application API with admin review, and read-only APIs for events, projects and the team. The React frontend in `../Frontend` uses all of them.

---

## Requirements

- Node.js **20 or later** (`node -v`)
- A MongoDB database: a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or MongoDB installed locally

## Setup (Windows PowerShell)

```powershell
cd D:\Code2Chill\Backend
npm install
Copy-Item .env.example .env
```

Then open `.env` and fill in:

- `MONGODB_URI`: your MongoDB connection string
- `JWT_SECRET`: a long random string. Generate one with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
  ```

## Run

| Command | What it does |
| --- | --- |
| `npm run dev` | Start with auto-restart on file changes (`node --watch`) |
| `npm start` | Start normally (production) |
| `npm run seed` | Load the team, projects and sample events into MongoDB (safe to re-run) |
| `npm run seed -- --no-samples` | Load only the team and real projects |
| `npm run seed -- --remove-samples` | Delete all records marked `isSample` |
| `npm run make-admin -- <email>` | Give an existing account the admin role (`-- <email> member` to undo) |

### First run

1. `npm run seed` loads the real team, the projects and the sample events. Without it, the Events, Projects and Team pages are empty.
2. Sign up on the website, then run `npm run make-admin -- your@email.com` to make yourself an admin. Admin rights can **only** be granted this way, never through the API.

On success the console shows:

```text
[db] Connected to MongoDB at <host> (database: <name>).
[server] Code2Chill API running on http://localhost:5000 (development)
```

If `.env` is incomplete or MongoDB can't be reached, the server prints the reason and exits instead of running half-broken.

---

## Environment variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `MONGODB_URI` | **Yes** | none | MongoDB connection string |
| `JWT_SECRET` | **Yes** | none | Secret for signing tokens, **at least 32 characters** |
| `PORT` | No | `5000` | Port the API listens on |
| `NODE_ENV` | No | `development` | `production` hides error stack traces |
| `JWT_EXPIRES_IN` | No | `7d` | Token lifetime (`1h`, `7d`, …) |
| `CLIENT_ORIGIN` | No | `http://localhost:5173,http://localhost:4173` | Frontend origin(s) allowed by CORS, comma-separated, no trailing slash (add your Vercel URL in production) |

`.env` is git-ignored. Only `.env.example` (no secrets) is committed.

---

## Folder structure

```text
Backend/
├── server.js                 # Entry point: load config → connect DB → listen
├── app.js                    # Express app: CORS, JSON parsing, routes, error handling
├── config/
│   ├── env.js                # Loads .env and validates required variables
│   └── db.js                 # MongoDB connect / disconnect / status helpers
├── models/
│   ├── User.js               # Accounts: password hashing, safe public fields
│   ├── JoinApplication.js    # Join Us applications + allowed form options
│   ├── Event.js              # Events (isSample marks placeholder content)
│   ├── Project.js            # Projects (isSample marks placeholder content)
│   └── TeamMember.js         # Team page members
├── controllers/
│   ├── authController.js     # signup, login, me
│   ├── joinController.js     # submit, list (admin), update status (admin)
│   ├── contentController.js  # events, projects, team
│   └── healthController.js   # health check
├── routes/
│   ├── authRoutes.js         # /api/auth/*
│   ├── joinRoutes.js         # /api/join*
│   ├── contentRoutes.js      # /api/events*, /api/projects*, /api/team
│   └── healthRoutes.js       # /api/health
├── middleware/
│   ├── auth.js               # requireAuth: verifies the Bearer token
│   ├── requireRole.js        # requireRole('admin'): 403 for other roles
│   └── errorHandler.js       # 404 + central JSON error responses
├── utils/
│   ├── ApiError.js           # Error with an HTTP status code
│   ├── asyncHandler.js       # Forwards async errors to the error handler
│   ├── token.js              # Sign / verify JWTs (HS256)
│   ├── validation.js         # Signup/login validation (same rules as the frontend)
│   └── joinValidation.js     # Join form validation (same fields as the frontend)
├── data/
│   └── seedData.js           # Real team, projects, sample events (used by npm run seed)
├── scripts/
│   ├── seed.js               # npm run seed
│   └── makeAdmin.js          # npm run make-admin
├── .env.example
└── package.json
```

---

## API

Base URL (local): `http://localhost:5000`
All request and response bodies are JSON.

### Response format

**Success**: endpoint-specific (see below).

**Error**: always this shape:

```json
{
  "message": "Please fix the highlighted fields.",
  "errors": { "email": "Enter a valid email address, e.g. exampleXXXX@chitkara.edu.in." }
}
```

`errors` (field → message) is only present for field-level problems, so the frontend can show each message under its input.

| Status | Meaning |
| --- | --- |
| 200 / 201 | Success / created |
| 400 | Invalid input, or malformed JSON |
| 401 | Not logged in, wrong credentials, or invalid/expired token |
| 403 | Logged in, but not an admin |
| 404 | Unknown route or record |
| 409 | Email already registered, or an open application already exists |
| 413 | Request body too large (limit 10 KB) |
| 500 | Unexpected server error |
| 503 | Health check: database not connected |

### The user object

Returned by signup, login and `/me`. **It never includes the password or its hash.**

```json
{
  "id": "6741f0c2a1b2c3d4e5f60718",
  "name": "Prince Pratik",
  "email": "a1234@chitkara.edu.in",
  "role": "member",
  "createdAt": "2026-11-23T17:05:12.345Z"
}
```

---

### `GET /api/health`

```json
// 200 OK
{ "status": "ok", "database": "connected", "uptimeSeconds": 42, "timestamp": "2026-11-23T17:05:12.345Z" }

// 503 Service Unavailable (database connection lost)
{ "status": "degraded", "database": "disconnected", "uptimeSeconds": 42, "timestamp": "..." }
```

### `POST /api/auth/signup`

Request:

```json
{ "name": "Prince Pratik", "email": "a1234@chitkara.edu.in", "password": "at-least-8-chars" }
```

Rules (same as the frontend form):

- `name`: 2–50 characters (trimmed)
- `email`: valid format, any domain (stored trimmed and lowercase)
- `password`: 8+ characters, max 72 bytes

New accounts always get `role: "member"`. A `role` in the request is ignored.

```json
// 201 Created
{ "message": "Account created.", "token": "<JWT>", "user": { ...user object } }

// 400 Bad Request
{ "message": "Please fix the highlighted fields.",
  "errors": { "name": "Please enter your name.", "password": "Password must be at least 8 characters." } }

// 409 Conflict
{ "message": "An account with this email already exists.",
  "errors": { "email": "An account with this email already exists." } }
```

### `POST /api/auth/login`

Request:

```json
{ "email": "a1234@chitkara.edu.in", "password": "at-least-8-chars" }
```

```json
// 200 OK
{ "message": "Logged in.", "token": "<JWT>", "user": { ...user object } }

// 400 Bad Request
{ "message": "Please fix the highlighted fields.", "errors": { "password": "Please enter your password." } }

// 401 Unauthorized (same message whether the email or the password is wrong)
{ "message": "Invalid email or password." }
```

### `GET /api/auth/me` (protected)

Header:

```text
Authorization: Bearer <JWT>
```

```json
// 200 OK
{ "user": { ...user object } }

// 401 Unauthorized: one of
{ "message": "Please log in to continue." }
{ "message": "Your session has expired. Please log in again." }
{ "message": "Invalid login token. Please log in again." }
{ "message": "This account no longer exists. Please log in again." }
```

### Endpoint list

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/api/health` | Public | API and database status |
| POST | `/api/auth/signup` | Public | Create an account |
| POST | `/api/auth/login` | Public | Log in |
| GET | `/api/auth/me` | Logged in | Current user |
| POST | `/api/join` | Public | Submit a Join Us application |
| GET | `/api/join` | **Admin** | List applications (`?status=pending` etc.) |
| PATCH | `/api/join/:id/status` | **Admin** | Change an application's status |
| GET | `/api/events` | Public | All events, newest first |
| GET | `/api/events/:id` | Public | One event |
| GET | `/api/projects` | Public | All projects, real ones first |
| GET | `/api/projects/:id` | Public | One project |
| GET | `/api/team` | Public | Team grouped into leads and core, plus `count` |

### `POST /api/join`

Fields match the Join Us form. **Required:** `fullName`, `email`, `branch`.

```json
{
  "fullName": "Jiya", "email": "a1234@chitkara.edu.in",
  "year": "2nd Year", "branch": "CSE",
  "interests": ["Web Development", "Open Source"],
  "experience": "Beginner",
  "github": "https://github.com/username",
  "reason": "I want to build projects with others."
}
```

- `year`: `1st Year` · `2nd Year` · `3rd Year` · `4th Year` · `Postgraduate` (default `1st Year`)
- `experience`: `Beginner` · `Intermediate` · `Advanced` (default `Beginner`)
- `interests`: any of `Web Development`, `Mobile Apps`, `AI & Machine Learning`, `Cloud & DevOps`, `Competitive Programming`, `Cybersecurity`, `UI/UX Design`, `Open Source`
- `github`: optional, must start with `http://` or `https://`. `reason`: optional, max 1000 characters.

```json
// 201 Created
{ "message": "Application submitted.", "application": { "id": "...", "status": "pending", "createdAt": "..." } }

// 409 Conflict (this email already has a pending or reviewed application)
{ "message": "An application with this email is already being reviewed.", "errors": { "email": "..." } }
```

### `GET /api/join` (admin) and `PATCH /api/join/:id/status` (admin)

Both need `Authorization: Bearer <token>` from an **admin** account. Members get `403`.

```json
// GET /api/join?status=pending → 200
{ "count": 1, "applications": [ { "id": "...", "fullName": "...", "email": "...", "year": "...", "branch": "...",
  "interests": [], "experience": "...", "github": "", "reason": "", "status": "pending", "createdAt": "...", "updatedAt": "..." } ] }

// PATCH /api/join/:id/status   body: { "status": "accepted" }   (pending | reviewed | accepted | rejected)
{ "message": "Status updated.", "application": { ...same fields } }
```

### `GET /api/events`, `GET /api/events/:id`

```json
{ "count": 6, "events": [ { "id": "...", "title": "...", "description": "...", "date": "Dec 15, 2025", "time": "9:00 AM – 9:00 AM",
  "location": "...", "category": "Hackathon", "startDate": "2025-12-15", "endDate": "2025-12-16", "attendees": 120, "isSample": true } ] }
// /api/events/:id → { "event": { ... } }   invalid id → 400, unknown → 404
```

### `GET /api/projects`, `GET /api/projects/:id`

```json
{ "count": 6, "projects": [ { "id": "...", "title": "Code2Chill Website", "description": "...", "tech": ["React"], "category": "Web",
  "github": "https://github.com/CodeWithPrinceX/Code2Chill", "live": null, "stars": null, "forks": null, "contributors": null, "isSample": false } ] }
// /api/projects/:id → { "project": { ... } }
```

`stars`, `forks`, `contributors`, `github` and `live` are `null` when unknown. The frontend hides them.

### `GET /api/team`

```json
{ "count": 4,
  "leads": [ { "id": "...", "name": "Lakshay", "role": "President", "bio": null, "github": null, "linkedin": null, "twitter": null, "avatar": null },
             { "id": "...", "name": "Jiya", "role": "Vice President", ... } ],
  "core":  [ { "name": "Samanyu", "role": "Tech Head", ... },
             { "name": "Prince Pratik", "role": "Member", "github": "https://github.com/ReekursiveMonk", ... } ] }
```

`count` is always the number of team members in the database.

### Sample data

Events and every project except **Code2Chill Website** are placeholder content copied from the original frontend. They're stored with `isSample: true`, shown with a "Sample" label on the website, and removed with `npm run seed -- --remove-samples`. To publish real content, add or edit records in MongoDB (e.g. with MongoDB Atlas or Compass) or update `data/seedData.js` and re-run the seed.

### Quick test (PowerShell)

```powershell
Invoke-RestMethod http://localhost:5000/api/health
Invoke-RestMethod http://localhost:5000/api/team

$body = @{ name = 'Test User'; email = 'test@example.com'; password = 'password123' } | ConvertTo-Json
$res  = Invoke-RestMethod -Method Post http://localhost:5000/api/auth/signup -ContentType 'application/json' -Body $body
Invoke-RestMethod http://localhost:5000/api/auth/me -Headers @{ Authorization = "Bearer $($res.token)" }
```

### Quick test with curl (Windows `cmd`)

```bash
curl http://localhost:5000/api/health

curl -X POST http://localhost:5000/api/auth/signup -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"

curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"

curl http://localhost:5000/api/auth/me -H "Authorization: Bearer <paste token here>"
```

(These are written for Windows `cmd`. In PowerShell, use `curl.exe` instead of `curl`.)

---

## Security notes

- Passwords are hashed with **bcrypt (12 rounds)** in the model's pre-save hook and are excluded from queries by default (`select: false`).
- Tokens are **HS256 JWTs** containing only the user id (`sub`) and role. The algorithm is pinned when verifying. Expiry is set by `JWT_EXPIRES_IN`.
- `/me` reloads the user from the database on every request, so deleted accounts stop working immediately.
- Login returns the same error for unknown emails and wrong passwords, and takes similar time in both cases.
- Inputs must be strings, which blocks NoSQL operator injection like `{ "$ne": null }`.
- CORS allows only `CLIENT_ORIGIN`. JSON bodies are capped at 10 KB.
- Only one open (pending/reviewed) Join application per email.
- **Not yet included:** rate limiting on login/signup/join, email verification, password reset and an admin screen. Consider them before a public launch.

---

## Frontend integration

The frontend talks to this API through `Frontend/src/services/api.js`, using the `VITE_API_URL` environment variable (default `http://localhost:5000` in development).

- **Auth:** `Frontend/src/context/AuthContext.jsx` calls signup and login, stores only the JWT in `sessionStorage` (cleared when the tab closes), and restores the session with `GET /api/auth/me`. A rejected token is removed.
- **Join Us** posts to `/api/join`. **Events, Projects, Team** and the Home member count load from the API, with loading, error and empty states.
- There is no admin screen in the frontend yet. Admins use the `/api/join` endpoints directly (PowerShell, Postman or similar).
