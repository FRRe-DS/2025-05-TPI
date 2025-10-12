import { Product } from "./components/seccion1"
import { Base } from "./components/title"

function App() {

  return (
    <>
      <Base>
        <h3> Title example </h3>
         
        <Product name="nombre Producto 1" price={500} stock={30}/>
      </Base>
    </>
  )
}

export default App
