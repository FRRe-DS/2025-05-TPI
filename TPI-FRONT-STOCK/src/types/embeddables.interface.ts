
export interface IDimension {
    lengthCm: number;
    widthCm: number;
    heightCm: number;
}

export interface IWarehouseLocation {
    warehouseId: number;
    aisle: string;
    shelf: string;
    level: number;
}

export interface IErrorResponse {
    code: string;
    message: string;
    details: string | null;
}
