import { Routes, Route} from "react-router-dom";
import Home from "../pages/public/home";
import KeycloakAuthProvider from "../context/auth/auth.provider";
import AuthRouter from "./auth.routes";


export default function AppRouter(){
  return(
    <Routes>
      {/* RUTA PÚBLICA (Home) - NO ENvUELTA EN KeycloakAuthProvider */}
      <Route path="/" element={<Home />} />
      
<<<<<<< HEAD
      {/* RUTA CATCH-ALL PARA /auth Y /admin - ENvUELTA EN KeycloakAuthProvider */}
      <Route path="/*" element={
        <KeycloakAuthProvider>
          <AuthRouter />
        </KeycloakAuthProvider>
      } />
=======
      {/* Ruta alternativa para reservas */}
      <Route path="/reservations" element={<ReservationsPage />} />

>>>>>>> 184bfc816db00eb9ccfdb74a372abc946bcb8e2a
    </Routes>
  );
}