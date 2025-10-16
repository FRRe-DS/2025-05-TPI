export interface IReservationProduct {
  idProducto: number;
  cantidad: number;
}

export interface IReservationProductDetail extends IReservationProduct {
  nombre?: string;
  precioUnitario?: number;
}
