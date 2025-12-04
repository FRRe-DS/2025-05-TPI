import { useMemo, useState } from "react";
import { CategoryTableRow } from "../../components/categories/CategoryTableRow";
import { CreateCategoryModal } from "../../components/categories/CreateCategoryModal";
import { DeleteCategoryModal } from "../../components/categories/DeleteCategoryModal";
import { useCategories, useCreateCategory, useDeleteCategory } from "../../hooks/category.hook";
import { useNotification } from "../../context/notifications/notificactions";

export default function CategoriesPage() {
  const { data: categories, isLoading, isError } = useCategories();
  const { mutateAsync: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutateAsync: removeCategory, isPending: isDeleting } = useDeleteCategory();
  const { showNotification } = useNotification();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: number; nombre: string } | null>(null);

  const sortedCategories = useMemo(() => {
    if (!categories) return [];
    return [...categories].sort((a, b) => a.id - b.id);
  }, [categories]);

  const handleCreate = async (data: { nombre: string; descripcion?: string | null }) => {
    try {
      await createCategory(data);
      showNotification("Categoría creada correctamente", "success");
      setIsCreateOpen(false);
    } catch (error) {
      console.error(error);
      showNotification("No se pudo crear la categoría", "error");
    }
  };

  const handleRequestDelete = (id: number, nombre: string) => {
    setCategoryToDelete({ id, nombre });
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await removeCategory(categoryToDelete.id);
      showNotification("Categoría eliminada", "warning");
    } catch (error) {
      console.error(error);
      showNotification("No se pudo eliminar la categoría", "error");
    } finally {
      setIsDeleteOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Categorías</h1>
          <p className="text-gray-600 text-lg">Crea, visualiza y elimina categorías para clasificar productos.</p>
        </div>

        <div className="flex justify-start my-4">
          <button
            onClick={() => setIsCreateOpen(true)}
            disabled={isCreating}
            className={`bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-sm cursor-pointer ${isCreating ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isCreating ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
            {isCreating ? "GUARDANDO..." : "NUEVA CATEGORÍA"}
          </button>
        </div>

        {isLoading && (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
            <p className="text-gray-600 font-medium">Cargando categorías...</p>
          </div>
        )}

        {isError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-6">
            Error al cargar las categorías. Verifica la conexión con el backend.
          </div>
        )}

        {!isLoading && !isError && sortedCategories.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Descripción</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedCategories.map((category) => (
                  <CategoryTableRow
                    key={category.id}
                    category={category}
                    onDelete={() => handleRequestDelete(category.id, category.nombre)}
                    isDeleting={isDeleting && categoryToDelete?.id === category.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && !isError && sortedCategories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
            <p className="text-gray-500 text-lg">No se encontraron categorías.</p>
          </div>
        )}
      </div>

      <CreateCategoryModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
        isSubmitting={isCreating}
      />

      <DeleteCategoryModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        categoryName={categoryToDelete?.nombre}
        isSubmitting={isDeleting}
      />
    </div>
  );
}
