/**
 * Dimensiones del producto, anidadas en IProducto.
 */
export interface IDimension {
    largoCm: number;
    anchoCm: number;
    altoCm: number;
}

/**
 * Ubicación física del producto en el almacén, anidada en IProducto.
 */
export interface IWarehouseLocation {
    almacenId: number;
    pasillo: string;
    estanteria: string;
    nivel: number;
}

/**
 * Estructura de error estandar
 */
export interface IErrorResponse {
    code: string;
    message: string;
    details: string | null;
}
