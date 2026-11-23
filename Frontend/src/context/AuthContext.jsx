import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * FRONTEND PROTOTYPE: there is no real authentication yet.
 *
 * - No account is created and no password is checked. Login and signup simply
 *   start a "session" in this browser tab.
 * - Only the user's name and email are kept, in sessionStorage, so the profile
 *   survives a page refresh and is cleared when the tab is closed.
 * - Passwords never reach this file and are never stored anywhere.
 *
 * When the backend (Node.js, Express, MongoDB) is added, replace the bodies of
 * `signup`, `login` and `logout` with API calls. The rest of the app only uses
 * `useAuth()`, so pages and the navbar will not need to change.
 */

const STORAGE_KEY = 'code2chill:prototype-session';

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.email === 'string' && parsed.email) {
      return {
        name: typeof parsed.name === 'string' ? parsed.name : '',
        email: parsed.email,
      };
    }
  } catch {
    // Storage unavailable (e.g. privacy mode) or corrupted: start signed out.
  }
  return null;
}

function writeStoredUser(user) {
  try {
    if (user) {
      // Store ONLY name and email. Never add passwords or tokens here.
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name: user.name, email: user.email })
      );
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors; the session still works until refresh.
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const startSession = useCallback(({ name = '', email }) => {
    const sessionUser = { name: name.trim(), email: email.trim() };
    writeStoredUser(sessionUser);
    setUser(sessionUser);
    return sessionUser;
  }, []);

  // Backend later: POST /api/auth/signup with { name, email, password }.
  const signup = useCallback(
    async ({ name, email }) => startSession({ name, email }),
    [startSession]
  );

  // Backend later: POST /api/auth/login with { email, password } and use the
  // name returned by the server. The prototype has no way to look up a name.
  const login = useCallback(
    async ({ email }) => startSession({ email }),
    [startSession]
  );

  const logout = useCallback(() => {
    writeStoredUser(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isPrototype: true, signup, login, logout }),
    [user, signup, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>.');
  }
  return context;
}
