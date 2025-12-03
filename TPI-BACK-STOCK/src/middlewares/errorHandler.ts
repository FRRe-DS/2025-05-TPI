import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Valores por defecto
  let statusCode = 500;
  let responseData = {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Error inesperado en el servidor',
    details: null as string | null
  };

  // Si es un error que nosotros creamos (AppError)
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    responseData = {
      code: err.code,
      message: err.message,
      details: err.details || null
    };
  } else {
    // Si es un error de código (ej. variable no definida), lo mostramos en consola
    console.error('ERROR DESCONOCIDO:', err);
  }

  // Enviamos la respuesta con el formato exacto del YAML
  res.status(statusCode).json(responseData);
};