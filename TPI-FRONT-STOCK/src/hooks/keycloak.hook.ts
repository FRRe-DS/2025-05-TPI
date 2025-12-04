import Keycloak from "keycloak-js";
import { useEffect, useState } from 'react';

export const keycloakConfig = {
  url: 'http://localhost:8080', 
  realm: 'ds-2025-05-realm', 
  clientId: 'grupo-05', 
};

export interface KeycloakState {
  keycloak: Keycloak | null;
  authenticated: boolean;
  initialized: boolean;
}

export const useKeycloak = () => {
    const [kcState, setKcState] = useState<KeycloakState>({
      keycloak: null,
      authenticated: false,
      initialized: false,
    });

    useEffect(() => {
      if (!Keycloak) {
        console.error("Keycloak no está disponible globalmente.");
        setKcState(prev => ({ ...prev, initialized: true }));
        return;
      }
      
      const keycloakInstance = new Keycloak(keycloakConfig);

      keycloakInstance.init({
        onLoad: 'check-sso', 
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      })
      .then((authenticated: boolean) => {
        setKcState({
          keycloak: keycloakInstance,
          authenticated: authenticated,
          initialized: true,
        });
        console.log("Keycloak inicializado. Autenticado:", authenticated);
      })
      .catch((error) => {
        console.error('Error al inicializar Keycloak:', error);
        setKcState((prev) => ({ ...prev, initialized: true }));
      });
  }, []);

  // ✅ Función de logout CORREGIDA
  const logout = async () => {
    console.log("🔴 Intentando cerrar sesión...");
    console.log("🔴 Estado de Keycloak:", kcState.keycloak);
    console.log("🔴 Autenticado:", kcState.authenticated);
    
    if (kcState.keycloak && kcState.authenticated) {
      try {
        console.log("🔴 Ejecutando logout de Keycloak...");
        
        // ✅ IMPORTANTE: Usar la URL completa del frontend
        const logoutUrl = `${window.location.protocol}//${window.location.host}/`;
        
        console.log("🔴 Redirect URI:", logoutUrl);
        
        // Ejecutar logout de Keycloak
        await kcState.keycloak.logout({ 
          redirectUri: logoutUrl
        });
        
        console.log("✅ Logout exitoso - Redirigiendo...");
        
      } catch (error) {
        console.error("❌ Error en logout:", error);
        
        // Fallback: Limpiar todo manualmente
        if (kcState.keycloak) {
          kcState.keycloak.clearToken();
        }
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
      }
    } else {
      console.warn("⚠️ Keycloak no está inicializado o no hay sesión activa");
      
      // Fallback: redirigir manualmente
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }
  };

  // ✅ Función de login
  const login = () => {
    if (kcState.keycloak) {
      kcState.keycloak.login();
    }
  };

  // ✅ Obtener información del usuario
  const getUserInfo = () => {
    if (kcState.keycloak?.tokenParsed) {
      return {
        username: kcState.keycloak.tokenParsed.preferred_username,
        email: kcState.keycloak.tokenParsed.email,
        name: kcState.keycloak.tokenParsed.name,
        roles: kcState.keycloak.tokenParsed.realm_access?.roles || [],
      };
    }
    return null;
  };

  return {
    ...kcState,
    logout,
    login,
    user: getUserInfo(),
  };
};