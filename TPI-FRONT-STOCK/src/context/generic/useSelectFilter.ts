import { useUrlFilter } from "./useUrlFilter"; 

export function useSelectFilter<T extends string>(
  paramName: string, // <-- Agregamos el nombre del parámetro de la URL
  initialValue: T,
  allValue: T
) {
  // 1. 🛑 CAMBIO CLAVE: Usamos 'as unknown as' para resolver el error de tipado
  const [selected, setSelected, reset] = useUrlFilter(paramName, initialValue) as unknown as [
    T,
    (newValue: T) => void,
    () => void
  ];

  const isAll = selected === allValue;

  return {
    selected,
    setSelected,
    isAll,
    reset,
  };
}