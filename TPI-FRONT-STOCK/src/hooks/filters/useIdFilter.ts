import { useMemo } from "react";
// Importamos el nuevo hook basado en URL
import { useUrlFilter } from "./generics/useUrlFilter"; 

export function useIdFilter(paramName: string = "id", initialValue: string = "") {
  const [id, setId, reset] = useUrlFilter(paramName, initialValue);

  const parsedId = useMemo(() => {
    const trimmed = id.trim();
    if (!trimmed) return null;
    const num = parseInt(trimmed);
    // Solo consideramos IDs válidos (> 0)
    return !isNaN(num) && num > 0 ? num : null;
  }, [id]);

  return {
    id,
    setId,
    parsedId,
    reset,
  };
}