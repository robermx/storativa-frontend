import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const useDebounce = (delay = 500) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get('q') || '';
  const [search, setSearch] = useState(querySearch);

  useEffect(() => {
    setSearch(querySearch);
  }, [querySearch]);

  useEffect(() => {
    if (search === querySearch) return;

    const timeoutId = window.setTimeout(() => {
      const nextSearchParams = new URLSearchParams(searchParams);
      const normalizedSearch = search.trim();

      if (normalizedSearch) {
        nextSearchParams.set('q', normalizedSearch);
      } else {
        nextSearchParams.delete('q');
      }
      nextSearchParams.delete('page');
      setSearchParams(nextSearchParams, { replace: true });
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [querySearch, search, searchParams, setSearchParams]);

  return { search, setSearch };
};

export default useDebounce;
