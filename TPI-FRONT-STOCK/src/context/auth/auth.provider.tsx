
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { keycloakConfig, type KeycloakState } from "../../client";
import Keycloak from "keycloak-js";
import { KeycloakAuthContext } from "./auth.context";
import { setKeycloakInstance } from "./keycloak.instance";
import axios from "axios";


interface KeycloakAuthProviderProps{
  children: ReactNode;
}

export default function KeycloakAuthProvider({ children }: KeycloakAuthProviderProps) {

  //cache variables
  const storageToken = localStorage.getItem("kc_token");
  const storageRefresh = localStorage.getItem("kc_refresh");
  
  // Estado interno basado en la interfaz KeycloakState
  const [kcState, setKcState] = useState<KeycloakState>({
      keycloak: null,
      authenticated: false,
      initialized: false,
  });


  // Lógica de inicialización (el corazón del Contexto)
  useEffect(() => {
      const keycloakInstance = new Keycloak(keycloakConfig);
      setKeycloakInstance(keycloakInstance);

      keycloakInstance
      .init({
          onLoad: "login-required",
          pkceMethod: "S256",
          checkLoginIframe: false,
          responseMode: "query",
          token: storageToken || undefined,
          refreshToken: storageRefresh || undefined,
      })
      .then((authenticated) => {
          setKcState({
              keycloak: keycloakInstance,
              authenticated,
              initialized: true,
          });

          if (authenticated) {
              localStorage.setItem("kc_token", keycloakInstance.token!);
              localStorage.setItem("kc_refresh", keycloakInstance.refreshToken!);

              console.log("🔐 LOGGED IN" );
              console.log("KEYCLOAK:", keycloakInstance)
          }
      })
      .catch((err) => {
          console.error("Error inicializando Keycloak:", err);
          setKcState({ keycloak: null, authenticated: false, initialized: true });
      });
  }, []);

  useEffect(() => {
    if (!kcState.keycloak) return;

    const refreshInterval = setInterval(async () => {
        
      if (kcState.keycloak == null) return;

      try {
        if (kcState.keycloak.isTokenExpired(30)) {
          console.log("♻ Token cerca de expirar → intentando refrescar…");

          const refreshed = await kcState.keycloak.updateToken(60);

          if (refreshed) {
            console.log("🟢 Token refrescado correctamente");
            localStorage.setItem("kc_token", kcState.keycloak.token!);
            localStorage.setItem("kc_refresh", kcState.keycloak.refreshToken!);
          }
        }
      } catch (err) {
        console.error("❌ Error refrescando token:", err);
        kcState.keycloak.login(); 
      }
    }, 20000);

    return () => clearInterval(refreshInterval);
  }, [kcState.keycloak]);


  useEffect(() => {
    if (!kcState.keycloak) return;

    const interceptor = axios.interceptors.request.use(async (config) => {
      
      if (!kcState.keycloak) return config;
      
      if (kcState.keycloak.isTokenExpired(10)) {
        await kcState.keycloak.updateToken(60);
        localStorage.setItem("kc_token", kcState.keycloak.token!);
        localStorage.setItem("kc_refresh", kcState.keycloak.refreshToken!);
      }

      config.headers.Authorization = `Bearer ${kcState.keycloak.token}`;
      return config;
    });

    return () => axios.interceptors.request.eject(interceptor);
  }, [kcState.keycloak]);


  // 🛑 Implementación de funciones que llaman a los métodos reales de Keycloak
  const login = (redirectUri: string) => {
    if (kcState.keycloak) {
      kcState.keycloak.login({ redirectUri });
    }
  };
  
  const logout = (redirectUri?: string) => {
    if (!kcState.keycloak) return;

    localStorage.removeItem("kc_token");
    localStorage.removeItem("kc_refresh");

    kcState.keycloak.logout({ 
        redirectUri: redirectUri || window.location.origin 
    });
  };
  
  // Valores derivados (memoizados para optimización)
  const contextValue = useMemo(() => {
    // Extracción segura de token y username si está autenticado
    const token = kcState.keycloak?.token || null;
    const parsed = kcState.keycloak?.tokenParsed || null;
          
    return {
      keycloak: kcState.keycloak,
      authenticated: kcState.authenticated,
      initialized: kcState.initialized,
      token,
      parsed,
      username: parsed?.preferred_username ?? null,
      login,
      logout,
      
    };
  }, [kcState.keycloak, kcState.authenticated, kcState.initialized]);

  // Renderiza un estado de carga mientras Keycloak se inicializa
  if (!kcState.initialized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mb-4"></div>
        <div className="text-xl font-semibold text-blue-600">Cargando servicio de autenticación...</div>
      </div>
    );
  }

  return (
    <KeycloakAuthContext.Provider value={contextValue}>
      {children}
    </KeycloakAuthContext.Provider>
  );
};