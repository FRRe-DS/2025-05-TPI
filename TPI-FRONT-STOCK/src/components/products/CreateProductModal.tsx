import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { IProductInput } from "../../types/product.interface"; 

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableCategories?: { id: number; nombre: string }[];
  onCreate: (data: IProductInput) => void; 
}

const productSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  precio: z.coerce.number().min(0.01, "El precio debe ser mayor a 0"),
  stock: z.coerce.number().int().min(0, "El stock no puede ser negativo"),
  descripcion: z.string().optional(),
  weightKg: z.coerce.number().min(0).optional(),
  
  dimensions: z.object({
    heightCm: z.coerce.number().nonnegative().optional(),
    widthCm: z.coerce.number().nonnegative().optional(),
    lengthCm: z.coerce.number().nonnegative().optional(),
  }).optional(),

  location: z.object({
    warehouseId: z.coerce.number().optional(),
    aisle: z.string().optional(),
    shelf: z.string().optional(),
    level: z.coerce.number().optional(),
  }).optional(),

  categoryIds: z.array(z.coerce.number()).optional(),
});

export function CreateProductModal({ isOpen, onClose, onCreate, availableCategories = [] }: CreateProductModalProps) {
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nombre: "",
      precio: 0,
      stock: 0,
      descripcion: "",
      weightKg: 0,
      dimensions: { heightCm: 0, widthCm: 0, lengthCm: 0 },
      location: { aisle: "", shelf: "" },
      categoryIds: []
    }
  });

  const onSubmit = (data: any) => {
    onCreate(data as IProductInput);
    
    reset(); 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose}></div>

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
            <h2 className="text-xl font-bold text-gray-800">Nuevo Producto</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input {...register("nombre")} className="w-full rounded-lg border-gray-300 border p-2" />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message as string}</p>}
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                <input {...register("precio")} type="number" step="0.01" className="w-full rounded-lg border-gray-300 border p-2" />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input {...register("stock")} type="number" className="w-full rounded-lg border-gray-300 border p-2" />
              </div>
               <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría Principal</label>
                <select {...register("categoryIds.0")} className="w-full rounded-lg border-gray-300 border p-2 bg-white">
                  <option value="">Seleccione...</option>
                  {availableCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
              </div>
               <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea {...register("descripcion")} rows={3} className="w-full rounded-lg border-gray-300 border p-2"></textarea>
              </div>
            </div>
            
            <hr className="border-gray-100" />
            
             {/* LOGISTICA */}
            <div>
               <h3 className="text-md font-semibold text-gray-900 mb-3">Logística</h3>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div><label className="text-xs">Peso (Kg)</label><input {...register("weightKg")} type="number" step="0.1" className="w-full border p-2 rounded-lg" /></div>
                  <div><label className="text-xs">Alto (cm)</label><input {...register("dimensions.heightCm")} type="number" className="w-full border p-2 rounded-lg" /></div>
                  <div><label className="text-xs">Ancho (cm)</label><input {...register("dimensions.widthCm")} type="number" className="w-full border p-2 rounded-lg" /></div>
                  <div><label className="text-xs">Largo (cm)</label><input {...register("dimensions.lengthCm")} type="number" className="w-full border p-2 rounded-lg" /></div>
               </div>
            </div>

            <hr className="border-gray-100" />
            
             {/* UBICACION */}
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-3">Ubicación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input {...register("location.aisle")} placeholder="Pasillo" className="w-full border p-2 rounded-lg" />
                 <input {...register("location.shelf")} placeholder="Estante" className="w-full border p-2 rounded-lg" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                {isSubmitting ? "Guardando..." : "Guardar Producto"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}