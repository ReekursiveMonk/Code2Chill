/**
 * Single place for talking to the Code2Chill backend.
 *
 * The backend URL comes from the VITE_API_URL environment variable
 * (Frontend/.env locally, Vercel project settings in production).
 * In local development it falls back to http://localhost:5000.
 *
 * Every function returns the parsed JSON body, or throws an ApiError with:
 *   message  human-readable text from the server (safe to show)
 *   status   HTTP status (0 when the server couldn't be reached)
 *   errors   optional { field: message } for form validation errors
 *   code     'NETWORK'         the server couldn't be reached (offline, asleep, CORS)
 *            'UNAVAILABLE'     the server answered 502/503/504 (usually still starting)
 *            'NOT_CONFIGURED'  VITE_API_URL is missing in a production build
 *            'LOCAL_UNREACHABLE' local dev with no VITE_API_URL and no backend on :5000
 *            null              any other error
 *
 * NETWORK and UNAVAILABLE are temporary, so hooks/useApiData.js retries them.
 */

const LOCAL_API_URL = 'http://localhost:5000';
const USING_LOCAL_FALLBACK = !import.meta.env.VITE_API_URL && import.meta.env.DEV;

const API_URL = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? LOCAL_API_URL : '')).replace(
  /\/+$/,
  ''
);

const UNAVAILABLE_STATUSES = [502, 503, 504];

export class ApiError extends Error {
  constructor(message, { status = 0, errors = null, code = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
    this.code = code;
  }
}

async function request(path, { method = 'GET', body, token, signal } = {}) {
  if (!API_URL) {
    throw new ApiError('The website is not connected to its server yet. Please try again later.', {
      code: 'NOT_CONFIGURED',
    });
  }

  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    // In local development without VITE_API_URL, say exactly what's missing.
    const message = USING_LOCAL_FALLBACK
      ? `Can't reach the local backend at ${LOCAL_API_URL}. Start it with "npm run dev" in the Backend folder, or set VITE_API_URL in Frontend/.env.`
      : "Can't reach the Code2Chill server. Check your connection and try again.";
    // A local backend that isn't running won't start by itself, so it isn't retried.
    throw new ApiError(message, { code: USING_LOCAL_FALLBACK ? 'LOCAL_UNREACHABLE' : 'NETWORK' });
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const unavailable = UNAVAILABLE_STATUSES.includes(response.status);
    throw new ApiError(
      data?.message ||
        (unavailable
          ? 'The Code2Chill server is starting up. Please try again in a moment.'
          : `Request failed (${response.status}).`),
      {
        status: response.status,
        errors: data?.errors || null,
        code: unavailable ? 'UNAVAILABLE' : null,
      }
    );
  }

  return data;
}

/* ───── Auth ───── */
export const signup = ({ name, email, password }) =>
  request('/api/auth/signup', { method: 'POST', body: { name, email, password } });

export const login = ({ email, password }) =>
  request('/api/auth/login', { method: 'POST', body: { email, password } });

export const getMe = (token, options) => request('/api/auth/me', { ...options, token });

/* ───── Join Us ───── */
export const submitJoinApplication = (application) =>
  request('/api/join', { method: 'POST', body: application });

/* ───── Club content (public) ───── */
export const getEvents = (options) => request('/api/events', options);
export const getProjects = (options) => request('/api/projects', options);
export const getTeam = (options) => request('/api/team', options);
