import { useState, useMemo } from 'react';
import { ClientTableRow } from "../../components/clients/ClientTableRow";
import { useClients } from "../../hooks/clients.hook";
import { useUrlPagination } from "../../hooks/pagination.hook";
import Pagination from "../../components/common/ui/pagination";

export default function ClientsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    
    // Obtener datos reales
    const { data: clients, isLoading, isError } = useClients();

    // Filtro por ID
    const filteredClients = useMemo(() => {
        if (!clients) return [];
        
        if (!searchTerm) return clients;
        
        const searchNumber = parseInt(searchTerm);
        if (isNaN(searchNumber)) return clients;
        
        return clients.filter(client => 
            client.id.toString().includes(searchTerm)
        );
    }, [clients, searchTerm]);

    // Paginación
    const { 
        paginatedData, 
        pagination: { 
            currentPage, 
            totalPages, 
            totalItems, 
            itemsPerPage, 
            goToPage 
        } 
    } = useUrlPagination(filteredClients, { itemsPerPage: 10 });

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Encabezado */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Clientes</h1>
                        <p className="text-gray-600 text-lg">Usuarios con reservas registradas</p>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-sm text-gray-500">Total de clientes:</span>
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 font-semibold rounded-full text-sm">
                                {totalItems || 0}
                            </span>
                        </div>
                    </div>
                    
                    {/* Buscador por ID */}
                    <div className="w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Buscar por ID de cliente..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                    </div>
                </div>

                {isLoading && (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
                        <p className="text-gray-600 font-medium">Cargando clientes...</p>
                    </div>
                )}

                {isError && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-6">
                        Error al cargar los clientes. Verifica la conexión con el backend.
                    </div>
                )}

                {/* Tabla de Clientes */}
                {!isLoading && !isError && paginatedData.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Última Compra</th>
                                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedData.map((client) => (
                                    <ClientTableRow
                                        key={client.id}
                                        client={client}
                                    />
                                ))}
                            </tbody>
                        </table>
                        
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            onPageChange={goToPage}
                        />
                    </div>
                )}
                
                {!isLoading && !isError && filteredClients.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
                        <p className="text-gray-500 text-lg">No se encontraron clientes.</p>
                    </div>
                )}
            </div>
        </div>
    );
}