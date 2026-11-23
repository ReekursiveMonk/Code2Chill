import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../services/api';

/**
 * Real authentication backed by the Code2Chill API.
 *
 * - Signup and login send credentials to the backend, which checks them,
 *   hashes passwords and returns a signed token (JWT) plus the user.
 * - Only the token is stored, in sessionStorage, so it is cleared when the
 *   tab closes. Passwords and user details are never stored in the browser.
 * - On page load the stored token is checked with GET /api/auth/me. If the
 *   server rejects it (expired, invalid, account deleted), it is removed.
 */

const TOKEN_KEY = 'code2chill:token';

const AuthContext = createContext(null);

function readToken() {
  try {
    return window.sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function writeToken(token) {
  try {
    if (token) window.sessionStorage.setItem(TOKEN_KEY, token);
    else window.sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // Storage unavailable (e.g. privacy mode): the session lasts until refresh.
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(readToken);
  const [user, setUser] = useState(null);
  // True while a stored token is being checked on page load.
  const [isLoading, setIsLoading] = useState(() => Boolean(readToken()));

  const clearSession = useCallback(() => {
    writeToken(null);
    setToken(null);
    setUser(null);
  }, []);

  // Restore the session once, when the app first loads.
  useEffect(() => {
    const storedToken = readToken();
    if (!storedToken) {
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    api
      .getMe(storedToken, { signal: controller.signal })
      .then((data) => setUser(data.user))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        // Only a rejected token logs the user out; a network problem keeps it
        // so the session can be restored on the next visit.
        if (error.status === 401) clearSession();
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [clearSession]);

  const startSession = useCallback((data) => {
    writeToken(data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  // Both throw an ApiError on failure (message + optional field errors).
  const signup = useCallback(
    async ({ name, email, password }) => startSession(await api.signup({ name, email, password })),
    [startSession]
  );

  const login = useCallback(
    async ({ email, password }) => startSession(await api.login({ email, password })),
    [startSession]
  );

  const value = useMemo(
    () => ({ user, token, isLoading, signup, login, logout: clearSession }),
    [user, token, isLoading, signup, login, clearSession]
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
