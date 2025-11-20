import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom'; 


export function useUrlFilter(paramName: string, defaultValue: string = ""): [
  string, 
  (newValue: string) => void, 
  () => void
] {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Lectura del valor: Lee el valor del parámetro, usando el default si no existe.
  const value = useMemo(() => {
    return searchParams.get(paramName) || defaultValue;
  }, [searchParams, paramName, defaultValue]);

  // 2. Escritura del valor: Actualiza el valor en la URL.
  const setValue = useCallback((newValue: string) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      
      // Si el nuevo valor es vacío o igual al default, lo eliminamos para tener una URL limpia.
      if (newValue === "" || newValue === defaultValue) {
        newParams.delete(paramName);
      } else {
        newParams.set(paramName, newValue);
      }
      
      return newParams;
    }, { replace: true }); // Usamos 'replace' para no llenar el historial con cada pulsación de tecla
  }, [setSearchParams, paramName, defaultValue]);

  // 3. Resetear: Elimina el parámetro de la URL.
  const resetValue = useCallback(() => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete(paramName);
      return newParams;
    }, { replace: true });
  }, [setSearchParams, paramName]);

  return [value, setValue, resetValue];
}