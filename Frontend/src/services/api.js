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
 */

const API_URL = (
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '')
).replace(/\/+$/, '');

export class ApiError extends Error {
  constructor(message, { status = 0, errors = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

async function request(path, { method = 'GET', body, token, signal } = {}) {
  if (!API_URL) {
    throw new ApiError('The website is not connected to its server yet. Please try again later.');
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
    throw new ApiError("Can't reach the Code2Chill server. Check your connection and try again.");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(data?.message || `Request failed (${response.status}).`, {
      status: response.status,
      errors: data?.errors || null,
    });
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
