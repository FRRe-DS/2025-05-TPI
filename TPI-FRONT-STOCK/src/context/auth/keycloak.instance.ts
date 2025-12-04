import type Keycloak from "keycloak-js";

let keycloakInstance: Keycloak | null = null;

export function setKeycloakInstance(instance: Keycloak) {
  keycloakInstance = instance;
}

export function getKeycloakInstance() {
  return keycloakInstance;
}
