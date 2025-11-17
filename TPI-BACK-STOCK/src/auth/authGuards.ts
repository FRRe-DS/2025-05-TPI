import { Request } from 'express';

// Interfaces ajustadas para reflejar la estructura de tu token (roles en la raíz)
interface KeycloakTokenContent {
    // La propiedad 'roles' que encontraste en el payload del JWT
    roles?: string[]; 
    
    // Dejamos las otras propiedades para compatibilidad, aunque no se usen
    realm_access?: { roles: string[] }; 
    resource_access?: Record<string, { roles: string[] }>;
}

interface KeycloakToken {
    // El objeto 'is' que contiene el estado 'active'
    is: { active: boolean; }; 
    content: KeycloakTokenContent;
}

/**
 * Función de Guardia (GuardFn) corregida para buscar roles en la propiedad 'roles' raíz.
 * Permite el acceso si el token contiene el rol 'logistica-be' O el rol 'stock-be'.
 */
export const logisticaOStockGuard = (token: KeycloakToken, req: Request): boolean => {

  console.log("ENTRO A LA FUNCION DE LOGISTICAGUARD")
    
    // 1. Verificación básica: Token activo
    if (!token || !token.is?.active) {
        console.log("Acceso denegado: Token ausente o inactivo.");
        return false;
    }

    // 2. Extraer los roles de la PROPIEDAD RAÍZ 'roles' del contenido del token
    // Utilizamos '|| []' para asegurar que siempre sea un array.
    const rolesToken: string[] = token.content.roles || []; 
    
    const rolesRequeridos: string[] = ["logistica-be", "stock-be"];

    console.log(`AUTH GUARD: Roles encontrados en el token: [${rolesToken.join(', ')}]`);
    console.log(`AUTH GUARD: Roles requeridos: [${rolesRequeridos.join(' o ')}]`);


    // 3. Implementar la lógica "OR": ¿El token tiene AL MENOS UN rol requerido?
    const tienePermiso = rolesRequeridos.some(requiredRole => 
        rolesToken.includes(requiredRole)
    );

    if (tienePermiso) {
        console.log("✅ ACCESO PERMITIDO.");
    } else {
        console.log("❌ ACCESO DENEGADO. El token no contiene ninguno de los roles necesarios.");
    }

    return tienePermiso;
};