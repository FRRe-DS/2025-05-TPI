import { useUrlFilter } from "./useUrlFilter"; 
import { useCallback } from 'react';


export function useSelectFilter<T extends string>(
  paramName: string, 
  initialValue: T,
  allValue: T
) {
  
  const [selectedString, setValue, reset] = useUrlFilter(paramName, initialValue);

  const selected = selectedString as T; 

  const setSelected = useCallback((newValue: T) => {
    setValue(newValue);
  }, [setValue]);

  const isAll = selected === allValue;

  return {
    selected, // Valor seleccionado (tipo T)
    setSelected, // Función para establecer el valor (acepta tipo T)
    isAll, // Booleano si está seleccionado el valor "todo"
    reset, // Función para eliminar el filtro de la URL
  };
}