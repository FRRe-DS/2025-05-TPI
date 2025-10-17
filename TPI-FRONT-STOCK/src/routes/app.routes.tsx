import { Route} from "react-router-dom";
import ErrorRouter from "./error.routes";
import Home from "../pages/home";

export default function AppRouter(){
  return(
    <ErrorRouter>
      <Route path="/" element={<Home/>} />
    </ErrorRouter>
  );
}