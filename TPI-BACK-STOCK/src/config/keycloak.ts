import session from "express-session";
import Keycloak from "keycloak-connect";

process.env.KEYCLOAK_DEBUG = 'true'; 

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak(
    { store: memoryStore },
    {
        realm: "ds-2025-05-realm",
        "auth-server-url": "http://localhost:8080/",
        "bearer-only": true, 
        "ssl-required": "none",
        "confidential-port": 0,
        
    } as any
);

export { keycloak, memoryStore };