import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { IProduct } from "../../types/product.interface";


export interface IProductInput {
    nombre: string;
    precio: number;
    stockDisponible: number; 
    descripcion?: string;
    pesoKg?: number;      
    dimensiones?: {
        altoCm: number;
        anchoCm: number;
        largoCm: number;
    };
    ubicacion?: {
        calle: string;
        codigoPostal: string;
        ciudad?: string;
        provincia?: string;
        pais?: string;
    };
    
    categoryIds?: number[];
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: IProduct | null; 
  onUpdate: (id: number, data: IProductInput) => void | Promise<void>; 
  availableCategories?: { id: number; nombre: string }[]; 
}

const productSchema = z.object({
  nombre: z.string().min(3, "El nombre es muy corto"),
  precio: z.coerce.number().min(0.01, "Precio inválido"),
  stockDisponible: z.coerce.number().int().min(0),
  descripcion: z.string().optional(),
  pesoKg: z.coerce.number().min(0).optional(),
  
  dimensiones: z.object({
    altoCm: z.coerce.number().optional(),
    anchoCm: z.coerce.number().optional(),
    largoCm: z.coerce.number().optional(),
  }).optional(),

  ubicacion: z.object({
    calle: z.string().optional(),
    codigoPostal: z.string().optional(),
    ciudad: z.string().optional(),
    provincia: z.string().optional(),
    pais: z.string().optional(),
  }).optional(),

  categoryIds: z.array(z.coerce.number()).optional(),
});

export function EditProductModal({ 
  isOpen, 
  onClose, 
  productToEdit, 
  onUpdate,
  availableCategories = [] 
}: EditProductModalProps) {

  // 3. USE FORM
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  // 4. EFECTO DE CARGA (Mapeo directo desde tu JSON)
  useEffect(() => {
    if (productToEdit) {
      const p = productToEdit as any;
      const dims = p.dimensiones || {};
      const loc = p.ubicacion || {};

      reset({
        nombre: p.nombre,
        precio: Number(p.precio), 
        stockDisponible: Number(p.stockDisponible),
        descripcion: p.descripcion || "",
        pesoKg: Number(p.pesoKg) || 0, 
        
        dimensiones: {
          altoCm: Number(dims.altoCm) || 0,
          anchoCm: Number(dims.anchoCm) || 0, 
          largoCm: Number(dims.largoCm) || 0,
        },
        
        ubicacion: {
          calle: loc.calle || "",
          codigoPostal: loc.codigoPostal || "",
          ciudad: loc.ciudad || "",
          provincia: loc.provincia || "",
          pais: loc.pais || "",
        },
        
        categoryIds: p.categorias?.map((c: any) => c.id) || [],
      });
    }
  }, [productToEdit, reset]);

  const onSubmit = (data: any) => {
    if (productToEdit) {
        onUpdate(productToEdit.id, data as IProductInput);
        onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          
          <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-200 flex justify-between items-center sticky top-0 z-10">
            <h2 className="text-xl font-bold text-yellow-800">
              Editar: {productToEdit?.nombre}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            
            {/* DATOS BASICOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input {...register("nombre")} className="w-full border p-2 rounded-lg" />
                {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre?.message as string}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                <input {...register("precio")} type="number" step="0.01" className="w-full border p-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Disponible</label>
                {/* Ojo: aquí registramos 'stockDisponible' */}
                <input {...register("stockDisponible")} type="number" className="w-full border p-2 rounded-lg" />
              </div>
              
              <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría Principal</label>
                  <select {...register("categoryIds.0")} className="w-full border p-2 rounded-lg bg-white">
                      <option value="">Sin categoría</option>
                      {availableCategories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                      ))}
                  </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea {...register("descripcion")} rows={3} className="w-full border p-2 rounded-lg"></textarea>
              </div>
            </div>
            
            <hr className="border-gray-100" />
            
            {/* LOGISTICA (USANDO NOMBRES DE TU JSON: altoCm, pesoKg) */}
            <div>
               <h3 className="text-md font-semibold text-gray-900 mb-3">Dimensiones y Peso</h3>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                      <label className="text-xs text-gray-500">Peso (Kg)</label>
                      <input {...register("pesoKg")} type="number" step="0.01" className="w-full border p-2 rounded-lg" />
                  </div>
                  <div>
                      <label className="text-xs text-gray-500">Alto (cm)</label>
                      <input {...register("dimensiones.altoCm")} type="number" step="0.01" className="w-full border p-2 rounded-lg" />
                  </div>
                  <div>
                      <label className="text-xs text-gray-500">Ancho (cm)</label>
                      <input {...register("dimensiones.anchoCm")} type="number" step="0.01" className="w-full border p-2 rounded-lg" />
                  </div>
                  <div>
                      <label className="text-xs text-gray-500">Largo (cm)</label>
                      <input {...register("dimensiones.largoCm")} type="number" step="0.01" className="w-full border p-2 rounded-lg" />
                  </div>
               </div>
            </div>

             {/* UBICACION (USANDO NOMBRES DE TU JSON: calle, ciudad) */}
            <div>
               <h3 className="text-md font-semibold text-gray-900 mb-3">Ubicación en Almacén</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500">Calle y Altura</label>
                    <input {...register("ubicacion.calle")} placeholder="Ej: Av. Principal 123" className="w-full border p-2 rounded-lg" />
                  </div>
                  <div><label className="text-xs text-gray-500">Ciudad</label><input {...register("ubicacion.ciudad")} className="w-full border p-2 rounded-lg" /></div>
                  <div><label className="text-xs text-gray-500">Provincia</label><input {...register("ubicacion.provincia")} className="w-full border p-2 rounded-lg" /></div>
                  <div><label className="text-xs text-gray-500">CP</label><input {...register("ubicacion.codigoPostal")} className="w-full border p-2 rounded-lg" /></div>
                  <div><label className="text-xs text-gray-500">País</label><input {...register("ubicacion.pais")} className="w-full border p-2 rounded-lg" /></div>
               </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700">
                {isSubmitting ? "Guardando..." : "Actualizar Producto"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}