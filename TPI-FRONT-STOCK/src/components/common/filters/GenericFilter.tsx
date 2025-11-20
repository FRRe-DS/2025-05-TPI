import { FilterContainer } from './FilterContainer';
import { FilterInput } from './FilterInput';
import { FilterSelect, type FilterOption } from './FilterSelect';

export type FilterType = 'text' | 'number' | 'select';

// Solo necesita de los primeros 5 campos, los demas son opcionales segun el tipo de filtro
export interface FilterConfig {
  id: string;
  label: string;
  type: FilterType;
  value: unknown;
  onChange: (value: unknown) => void;
  placeholder?: string;
  options?: FilterOption[];
  min?: string | number;
}

interface GenericFilterProps {
  title?: string;
  onReset: () => void;
  filters: FilterConfig[];
}

export function GenericFilter({ title = "Filtros de Búsqueda", onReset, filters }: GenericFilterProps) {
  return (
    <FilterContainer title={title} onReset={onReset}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filters.map((filter) => {
          if (filter.type === 'select') {
            return (
              <FilterSelect
                key={filter.id}
                id={filter.id}
                label={filter.label}
                value={filter.value as string}
                onChange={filter.onChange}
                options={filter.options || []}
              />
            );
          }
          return (
            <FilterInput
              key={filter.id}
              id={filter.id}
              label={filter.label}
              value={filter.value as string | number}
              onChange={filter.onChange}
              type={filter.type as 'text' | 'number'}
              placeholder={filter.placeholder}
              min={filter.min}
            />
          );
        })}
      </div>
    </FilterContainer>
  );
}
