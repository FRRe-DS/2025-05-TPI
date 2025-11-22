import { useState } from 'react';
import { ClientTableRow } from "../components/clients/ClientTableRow";
import type { IClient } from "../types/client.interface";

// 1. Mock Data (Datos falsos para visualizar)
const MOCK_CLIENTS: IClient[] = [
    { id: 123, firstName: "Juan", lastName: "Pérez", email: "juan.perez@email.com", phone: "+54 11 1234-5678", status: "ACTIVE", lastPurchase: "10/11/2025" },
    { id: 12345, firstName: "María", lastName: "Gómez", email: "maria.gomez@email.com", phone: "+54 11 8765-4321", status: "ACTIVE", lastPurchase: "12/11/2025" },
    { id: 3, firstName: "Silver", lastName: "López", email: "carlos.lopez@email.com", phone: "+54 11 1111-2222", status: "INACTIVE" },
    { id: 4, firstName: "Ana", lastName: "Martínez", email: "ana.martinez@email.com", phone: "+54 11 3333-4444", status: "ACTIVE", lastPurchase: "05/11/2025" },
    { id: 5, firstName: "Roberto", lastName: "Díaz", email: "roberto.diaz@email.com", phone: "+54 11 5555-6666", status: "INACTIVE", lastPurchase: "20/10/2025" },
];

export default function ClientsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    // Filtro simple en cliente
    const filteredClients = MOCK_CLIENTS.filter(client => 
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Encabezado */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Clientes</h1>
                        <p className="text-gray-600 text-lg">Listado de usuarios registrados</p>
                    </div>
                    
                    {/* Buscador */}
                    <div className="w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Buscar por nombre o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                    </div>
                </div>

                {/* Tabla de Clientes */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contacto</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Última Compra</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredClients.map((client) => (
                                <ClientTableRow
                                    key={client.id}
                                    client={client}
                                    // Ya no es necesario pasar onEdit, el botón lo maneja internamente
                                />
                            ))}
                        </tbody>
                    </table>
                    
                    {filteredClients.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No se encontraron clientes.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}