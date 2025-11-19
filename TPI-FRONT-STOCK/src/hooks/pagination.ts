import { useSearchParams } from 'react-router-dom'; 
import { useCallback } from 'react';

export function useUrlPagination(defaultPage = 1) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || defaultPage;

  const setPage = useCallback((newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(newPage));
    setSearchParams(newParams);
    
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, [searchParams, setSearchParams]);

  return { page, setPage };
}