export interface IReservation {
  idReserva: number;
  idCompra: string;
  usuarioId: number;
  estado: 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO' | 'EXPIRADO';
  fechaCreacion: string;
  fechaActualizacion: string;
  expiraEn: string;
  items: IReservationItem[];
}

export interface IReservationItem {
  id: number;
  productoId: number;
  nombre: string;
  cantidad: number;
  precioUnitario: string;
  producto: IReservationProductDetail;
}

export interface IReservationProductDetail {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  stockDisponible: number;
  pesoKg: string;
  dimensiones: {
    largoCm: string;
    anchoCm: string;
    altoCm: string;
  };
  ubicacion: {
    calle: string;
    ciudad: string;
    provincia: string;
    codigoPostal: string;
    pais: string;
  };
}

export interface IReservaInput {
  idCompra: string;
  usuarioId: number;
  productos: {
    productoId: number;
    cantidad: number;
  }[];
}

export interface IReservaOutput {
  idReserva: number;
  idCompra: string;
  estado: string;
  fechaCreacion: string;
  expiraEn: string;
}