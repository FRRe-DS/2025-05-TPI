import { useQuery, type QueryFunction, type QueryKey } from '@tanstack/react-query';

type GenericQueryFn<TData> = (name: string) => Promise<TData[]>;

export const useGenericQueryByName = <TData>(
    query: string,
    queryFn: GenericQueryFn<TData>,
    queryKeyBase: QueryKey
) => {
    // 1. Construir la clave de consulta única: [base, término]
    const queryKey = [...queryKeyBase, query];

    // 2. Definir la función de fetching. Se castea a QueryFunction para mayor seguridad.
    const fetcher: QueryFunction<TData[], QueryKey> = () => queryFn(query);

    return useQuery<TData[], Error>({
        queryKey: queryKey,
        queryFn: fetcher,
        staleTime: 1000 * 60 * 5, // 5 minutos
        
        // CRUCIAL: Solo se ejecuta la query si el término de búsqueda no está vacío (truthy).
        enabled: !!query, 
    });
};