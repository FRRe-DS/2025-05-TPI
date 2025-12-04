
export interface IDimension {
    largoCm: number;
    anchoCm: number;
    altoCm: number;
}

export interface IWarehouseLocation {
    calle: string;
    ciudad: string;
    provincia: string;
    codigoPostal: string;
    pais: string;
}

export interface IErrorResponse {
    code: string;
    message: string;
    details: string | null;
}
