import session from "express-session";
import Keycloak from "keycloak-connect";

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak(
    { store: memoryStore },
    {
        realm: "ds-2025-realm",
        "auth-server-url": "http://localhost:8080/",
        "ssl-required": "external",
        resource: "grupo-5",
        "confidential-port": 0,
        credentials: {
            secret: process.env.KEYCLOAK_SECRET as string,
        },
        
    } as any
);

export { keycloak, memoryStore };