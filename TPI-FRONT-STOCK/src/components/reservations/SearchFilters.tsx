import { useReservationFilters, type FilterStatus } from "../../context/ReservationFilterContext";
import { GenericFilter, type FilterConfig } from "../common/filters/GenericFilter";

export function SearchFilters() {
  const { filterId, filterStatus, filterUserId, setFilterId, setFilterStatus, setFilterUserId, reset } = useReservationFilters();

  const filters: FilterConfig[] = [
    {
      id: "filterId",
      label: "Buscar por ID de Reserva",
      type: "number",
      value: filterId,
      onChange: (val) => setFilterId(val as string),
      placeholder: "Ingrese ID de reserva...",
      min: 1
    },
    {
      id: "filterStatus",
      label: "Filtrar por Estado",
      type: "select",
      value: filterStatus,
      onChange: (val) => setFilterStatus(val as FilterStatus),
      options: [
        { value: "ALL", label: "Todos los estados" },
        { value: "PENDIENTE", label: "Pendiente" },
        { value: "CONFIRMADO", label: "Confirmado" },
        { value: "CANCELADO", label: "Cancelado" }
      ]
    },
    {
      id: "filterUserId",
      label: "Buscar por ID de Usuario",
      type: "number",
      value: filterUserId,
      onChange: (val) => setFilterUserId(val as string),
      placeholder: "Ingrese ID de usuario...",
      min: 1
    }
  ];

  return (
    <GenericFilter
      title="Filtros de Búsqueda"
      onReset={reset}
      filters={filters}
    />
  );
}