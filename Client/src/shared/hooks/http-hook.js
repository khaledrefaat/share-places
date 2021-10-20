import { useState, useCallback, useEffect, useRef } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpError = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpError.current.push(httpAbortCtrl);
      try {
        const res = await fetch(url, {
          method,
          body,
          headers,
        });

        const data = await res.json();
        // console.log(data);
        setIsLoading(false);

        activeHttpError.current = activeHttpError.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );

        if (!res.ok) {
          setError(data.message);
          throw new Error(data.message);
        }
        return data;
      } catch (err) {
        setIsLoading(false);
        setError(
          err.message || 'Something went wrong, Please try again later.'
        );
        throw new Error(err.message);
      }
    },
    []
  );

  const clearError = () => setError(null);

  useEffect(() => {
    return () => {
      activeHttpError.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
