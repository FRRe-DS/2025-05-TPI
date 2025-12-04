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

  return kcState;
};