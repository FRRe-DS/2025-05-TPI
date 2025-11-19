import { useMemo } from "react";
// Importamos el nuevo hook basado en URL
import { useUrlFilter } from "./useUrlFilter"; 

// Nombre del parámetro en la URL
const URL_PARAM_NAME = "id";

export function useIdFilter(initialValue = "") {
  const [id, setId, reset] = useUrlFilter(URL_PARAM_NAME, initialValue);

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