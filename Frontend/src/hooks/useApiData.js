import { useCallback, useEffect, useState } from 'react';

/**
 * Loads data from the API when a component mounts.
 *
 *   const { data, loading, error, retry } = useApiData(getEvents);
 *
 * `fetcher` must be a stable function (e.g. imported from services/api.js).
 * The request is cancelled if the component unmounts first.
 */
export function useApiData(fetcher) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((previous) => ({ ...previous, loading: true, error: null }));

    fetcher({ signal: controller.signal })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ data: null, loading: false, error });
      });

    return () => controller.abort();
  }, [fetcher, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  return { ...state, retry };
}
