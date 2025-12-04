import { Routes, Route} from "react-router-dom";
import Home from "../pages/public/home";
import KeycloakAuthProvider from "../context/auth/auth.provider";
import AuthRouter from "./auth.routes";


export default function AppRouter(){
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/*" element={
        <KeycloakAuthProvider>
          <AuthRouter />
        </KeycloakAuthProvider>
      } />
    </Routes>
  );
}