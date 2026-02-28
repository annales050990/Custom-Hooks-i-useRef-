import { useState, useEffect, useCallback } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useCallback zapobiega nieskończonej pętli, gdybyśmy użyli refetch w useEffect
  const fetchData = useCallback(async (abortController) => {
    setLoading(true);
    try {
      const response = await fetch(url, { signal: abortController?.signal });
      if (!response.ok) throw new Error('Błąd połączenia z serwerem');
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);

    // Cleanup: anulowanie zapytania, jeśli komponent zostanie odmontowany
    return () => controller.abort();
  }, [fetchData]);

  return { data, loading, error, refetch: () => fetchData() };
}

export default useFetch;