# Code2Chill Backend

REST API for the Code2Chill website: **Node.js, Express, MongoDB (Mongoose), JWT and bcrypt**.

Phase 1 provides the server setup, the database connection and user authentication (signup, login, current user). The frontend is **not connected yet**. That's Phase 2.

---

## Requirements

- Node.js **20 or later** (`node -v`)
- A MongoDB database: a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or MongoDB installed locally

## Setup

```bash
cd D:\Code2Chill\Backend
npm install
copy .env.example .env        # macOS/Linux: cp .env.example .env
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
| `CLIENT_ORIGIN` | No | `http://localhost:5173` | Frontend origin(s) allowed by CORS, comma-separated (add your Vercel URL in production) |

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
│   └── User.js               # User schema, password hashing, safe public fields
├── controllers/
│   ├── authController.js     # signup, login, me
│   └── healthController.js   # health check
├── routes/
│   ├── authRoutes.js         # /api/auth/*
│   └── healthRoutes.js       # /api/health
├── middleware/
│   ├── auth.js               # requireAuth: verifies the Bearer token
│   └── errorHandler.js       # 404 + central JSON error responses
├── utils/
│   ├── ApiError.js           # Error with an HTTP status code
│   ├── asyncHandler.js       # Forwards async errors to the error handler
│   ├── token.js              # Sign / verify JWTs (HS256)
│   └── validation.js         # Signup/login validation (same rules as the frontend)
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
| 404 | Unknown route |
| 409 | Email already registered |
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

### Quick test with curl

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
- **Not yet included:** rate limiting on login and signup, email verification and password reset. Consider them before a public launch.

---

## Frontend integration notes (Phase 2)

The frontend's prototype (`Frontend/src/context/AuthContext.jsx`) already calls `signup({ name, email, password })` and `login({ email, password })`, and its comments point to these exact endpoints. Phase 2 will:

1. Add `VITE_API_URL` (e.g. `http://localhost:5000`) to the frontend.
2. Replace the bodies of `signup` / `login` in `AuthContext.jsx` with `fetch` calls to `/api/auth/signup` and `/api/auth/login`, and store the returned `token`.
3. On page load, call `GET /api/auth/me` with the stored token to restore the session, and clear it on 401.
4. Show `errors.<field>` from 400/409 responses under the matching form fields, and `message` for 401.
5. Remove the "Prototype only" notices once real accounts work.

The login form doesn't ask for a name. `user.name` from the API now fills that in.
