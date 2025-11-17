
import AddProductForm from "../../components/products/addProductForm";

export default function Tickets(){


  return(
    <div className="w-full" >
      <h1> Agregar producto </h1>
      <p className="text-center text-lg text-[white] my-3 "> 
        A continuacion ingrese la informacion del prodcuto a agregar <br />
      </p>
      <div className="w-[70%] mx-auto">
        <AddProductForm />
      </div>
    </div>
  )
}