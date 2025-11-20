export interface IClient {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: 'ACTIVE' | 'INACTIVE';
    lastPurchase?: string; // Fecha de última compra opcional
}