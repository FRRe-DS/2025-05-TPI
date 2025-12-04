import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth/auth.context";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  element: ReactNode;
}

export default function ProtectedRoute( { element }: ProtectedRouteProps) {
  const { authenticated, initialized, login } = useAuth();

  const location = useLocation();

  const targetPath = location.state?.from || '/admin/productos';
  const redirectUri = window.location.origin + targetPath;

  if (!initialized) {
    return (
      <div className="flex items-center justify-center p-12 text-gray-500">
        Verificando estado de la sesión...
      </div>
    );
  }
  
  if (!authenticated) {
    return null; // o un spinner
  }

  if (initialized && !authenticated) {
    // Esta llamada inicia la redirección HTTP externa
    console.log("Iniciando redirección a Keycloak con destino:", redirectUri);
    login(redirectUri); 
  }

  return <>{element}</>;
};