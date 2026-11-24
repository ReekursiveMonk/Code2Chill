import { useCallback, useEffect, useState } from 'react';

/**
 * Loads data from the API when a component mounts.
 *
 *   const { data, loading, waking, error, retry } = useApiData(getEvents);
 *
 * `fetcher` must be a stable function (e.g. imported from services/api.js).
 * The request is cancelled if the component unmounts first.
 *
 * Temporary failures are retried automatically. The backend runs on Render's
 * free plan, which sleeps when idle and takes up to about a minute to wake.
 * While it wakes, requests can fail as network errors (code 'NETWORK') or
 * 502/503/504 responses (code 'UNAVAILABLE'). Instead of showing an error
 * straight away, the hook waits and tries again, and sets `waking` so the
 * page can explain the delay. Only after the last retry is `error` shown.
 */
const RETRY_DELAYS_MS = [3000, 6000, 10000, 15000, 20000];
const TEMPORARY_ERRORS = ['NETWORK', 'UNAVAILABLE'];

export function useApiData(fetcher) {
  const [state, setState] = useState({ data: null, loading: true, waking: false, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let timer;
    let retries = 0;

    setState((previous) => ({ ...previous, loading: true, waking: false, error: null }));

    const load = () => {
      fetcher({ signal: controller.signal })
        .then((data) => setState({ data, loading: false, waking: false, error: null }))
        .catch((error) => {
          if (error.name === 'AbortError' || controller.signal.aborted) return;

          if (TEMPORARY_ERRORS.includes(error.code) && retries < RETRY_DELAYS_MS.length) {
            setState((previous) => ({ ...previous, loading: true, waking: true }));
            timer = setTimeout(load, RETRY_DELAYS_MS[retries]);
            retries += 1;
            return;
          }

          setState({ data: null, loading: false, waking: false, error });
        });
    };

    load();

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [fetcher, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  return { ...state, retry };
}

/** Loading text that explains a slow first load (see `waking` above). */
export const WAKING_LABEL = 'Waking up the server — this can take up to a minute on the first visit…';
