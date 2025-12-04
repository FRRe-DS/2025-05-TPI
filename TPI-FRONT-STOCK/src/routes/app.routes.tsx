import { Routes, Route} from "react-router-dom";
import Home from "../pages/public/home";
import KeycloakAuthProvider from "../context/auth/auth.provider";
import AuthRouter from "./auth.routes";

export default function AppRouter(){
  return(
    <Routes>
      {/* RUTA PÚBLICA (Home) - NO ENvUELTA EN KeycloakAuthProvider */}
      <Route path="/" element={<Home />} />
      
      {/* RUTA CATCH-ALL PARA /auth Y /admin - ENvUELTA EN KeycloakAuthProvider */}
      <Route path="/*" element={
        <KeycloakAuthProvider>
          <AuthRouter />
        </KeycloakAuthProvider>
      } />
    </Routes>
  );
}