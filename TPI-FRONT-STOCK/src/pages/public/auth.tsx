import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth/auth.context";
import { useEffect, useMemo } from "react";

export default function AuthPage() {
  const { initialized, authenticated, login } = useAuth();
  const location = useLocation();

  const isProcessingCallback = useMemo(() => {
    // 1. Verificar Parámetros de Búsqueda (URL ?...)
    const searchParams = new URLSearchParams(location.search);
    const hasSearchParams = searchParams.has('code') || searchParams.has('session_state') || searchParams.has('error') || searchParams.has('state');

    if (hasSearchParams) {
        return true;
    }

    // 2. Verificar Fragmento de URL (URL #...)
    const hash = location.hash;
    // La URL de ejemplo del usuario usa el hash. Verificamos si contiene los tokens clave.
    const hasHashParams = hash.includes('code=') || hash.includes('session_state=') || hash.includes('error=') || hash.includes('state=');

    return hasHashParams;
  }, [location.search, location.hash]); // Depende de ambos: 'search' y 'hash'


  const redirectUri = window.location.origin + '/auth';
  const targetPath = '/admin/productos';
  
  useEffect(() => {

    if (initialized && !authenticated && !isProcessingCallback) {
      console.log("Iniciando redirección a Keycloak con destino:", redirectUri);
      login(redirectUri); 
    } else if (isProcessingCallback) {
      console.log("Detectado callback de Keycloak en la URL. Esperando a que el Provider resuelva la autenticación.");
    }
  }, [initialized, authenticated, login, redirectUri, isProcessingCallback]);

  if (initialized && authenticated) {
    return <Navigate to={targetPath} replace />;
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 text-xl font-semibold text-blue-600">
        {isProcessingCallback 
          ? "Procesando respuesta del servidor de autenticación..." 
          : "Preparando el proceso de autenticación..."
        }
      </div>
    </div>
  );
}
