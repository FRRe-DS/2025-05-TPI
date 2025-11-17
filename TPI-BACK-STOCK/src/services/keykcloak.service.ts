import axios from 'axios';
import dotenv from 'dotenv';
import qs from 'querystring';

dotenv.config();

const MAX_RETRIES = 15;
const RETRY_DELAY_MS = 5000;

let currentAccessToken: string | null = null;
let tokenExpiryTime: number = 0; 

const KEYCLOAK_TOKEN_URL = process.env.KEYCLOAK_TOKEN_URL; 
const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID; 
const CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET; 

const solicitarToken = async (): Promise<string> => {
    if (!KEYCLOAK_TOKEN_URL || !CLIENT_ID || !CLIENT_SECRET) {
        console.error("❌ M2M Auth Error: Falta configurar variables de entorno (URL, CLIENT_ID, o CLIENT_SECRET).");
        throw new Error("M2M credentials missing.");
    }
    
    // --- NUEVO CÓDIGO CON FETCH ---
    // 1. Preparamos el cuerpo de la petición en formato application/x-www-form-urlencoded
    const body = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    });

    try {
        const response = await fetch("http://keycloak:8080/realms/ds-2025-realm/protocol/openid-connect/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body.toString()
        });

        if (!response.ok) {
            // Manejamos errores HTTP (4xx, 5xx) que fetch NO lanza automáticamente
            const errorText = await response.text();
            let errorData: any = {};
            try {
                errorData = JSON.parse(errorText);
            } catch (e) {
                 // No es JSON, usamos el texto plano
            }
            
            const httpError = errorData.error_description || errorData.error || `HTTP Error ${response.status}`;
            throw new Error(`Fallo en la petición HTTP: ${httpError}`);
        }

        const data = await response.json();
        // --- FIN NUEVO CÓDIGO ---

        currentAccessToken = data.access_token;
        tokenExpiryTime = Date.now() + (data.expires_in * 1000) - (5000); 

        if (!currentAccessToken) throw new Error("Invalid access token for keycloak");

        console.log("TOKEN SERVICE: ", currentAccessToken)
        
        return currentAccessToken;

    } catch (error) {
        let errorMessage = error instanceof Error ? error.message : String(error);

        console.error(`❌ M2M Token Request Failed: ${errorMessage}`);
        throw new Error(`Fallo en la autenticación M2M: ${errorMessage}`);
    }
};

/**
 * Se llama al inicio de la aplicación para obtener el primer token.
 */
export const initAuthM2M = async () => {
    console.log(`⏱️ Iniciando autenticación M2M. Reintentos max: ${MAX_RETRIES} veces.`);
    let retries = 0;
    
    while (retries < MAX_RETRIES) {
        try {
            await solicitarToken();
            console.log("✅ Autenticación M2M (Token de servicio) lista y disponible.");
            return; 
        } catch (e) {
            retries++;
            const errorMessage = e instanceof Error ? e.message : String(e);
            
            // Si superamos el límite, lanzamos un error crítico y terminamos la aplicación
            if (retries >= MAX_RETRIES) {
                console.error(`❌ Fallo crítico de autenticación M2M después de ${MAX_RETRIES} reintentos.`);
                console.error(errorMessage);
                // Lanzamos la excepción para que initApp la capture y finalice el proceso.
                throw new Error("No se pudo conectar y autenticar con Keycloak M2M. Abortando inicio.");
            }
            
            // Logueamos el error y esperamos antes de reintentar
            console.warn(`⚠️ Intento fallido (${retries}/${MAX_RETRIES}). Causa: ${errorMessage}. Reintentando en ${RETRY_DELAY_MS / 1000}s...`);
            // Función de espera
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        }
    }
};

/**
 * Devuelve el token actual, solicitando uno nuevo si está expirado o cerca de expirar.
 * Debe ser llamado ANTES de cualquier llamada saliente a otra API.
 */
export const getValidToken = async (): Promise<string> => {
    // Si el token expiró (o está cerca de expirar, gracias al margen de 5s)
    if (Date.now() >= tokenExpiryTime || !currentAccessToken) {
      console.log("⏱️ Token M2M expirado/no disponible. Solicitando nuevo token...");
      await solicitarToken(); 
    }
    
    // Si la solicitud falló, currentAccessToken podría ser null, por lo que lanzamos un error si aún lo es.
    if (!currentAccessToken) {
      throw new Error("No se pudo obtener un token válido para llamadas M2M.");
    }

    return currentAccessToken;
};
