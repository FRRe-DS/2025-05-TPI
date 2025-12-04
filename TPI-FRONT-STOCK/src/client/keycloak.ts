import Keycloak from 'keycloak-js';

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