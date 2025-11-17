import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import {z} from "zod"
import { InputForm } from "../common/ui/inputForm";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripcion es obligatoria"),
  price: z.number({ error: "El precio es obligatorio" })
    .min(0.00, "La cantidad mínima es 0"),
  availableStock: z.number({ error: "El precio es obligatorio" })
    .min(0, "La cantidad mínima es 0"),
  
  categoryIds: z.string().min(1, "Debe seleccionar o ingresar las categorías"), 
});

type FormValues = z.infer<typeof schema>

export default function AddProductForm(){

  const {control, handleSubmit, formState:{errors}} = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues:{
      name: "",
      description: "",
      price: 0.0,
      availableStock: 1,
      categoryIds: "",
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log (data);
  }

  return(
    <div className="w-full ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center "> 
        <InputForm<FormValues> name="name" control={control} label="Nombre" error={errors.name} />
        <InputForm<FormValues> name="description" control={control} label="Descripcion" error={errors.description} />
        <InputForm<FormValues> name="price" control={control} label="Precio"  error={errors.price} />
        <InputForm<FormValues> name="availableStock" control={control} label="Stock"  error={errors.availableStock} />
        <InputForm<FormValues> name="categoryIds" control={control} label="categorias"  error={errors.categoryIds} />

        <button type="submit" className="mx-auto flex items-center border mt-3 py-2 px-4 rounded-full hover:cursor-pointer">
          {
            <div className="animate-spin w-5 h-5 rounded-full me-2 border-gray-600 border-2 border-s-3"></div>
          }
          continuar 
        </button>
      </form>
    </div>
  );
}