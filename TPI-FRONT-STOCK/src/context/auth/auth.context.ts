import { createContext, useContext } from 'react';
import Keycloak, { type KeycloakTokenParsed } from 'keycloak-js';

interface AuthContextType {
    keycloak: Keycloak | null; 
    authenticated: boolean; 
    initialized: boolean;   
    login: (redirectUri: string) => void;
    logout: (redirectUri?: string) => void;
    token: string | null;
    parsed: KeycloakTokenParsed | null;
    username: string | null;
}

export const KeycloakAuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(KeycloakAuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un KeycloakAuthProvider");
    }
    return context;
};
