import type { ICategory } from "../../types/category.interface";

interface Props {
  category: ICategory;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export function CategoryTableRow({ category, onDelete, isDeleting }: Props) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">{category.nombre}</span>
          <span className="text-xs text-gray-500">ID: {category.id}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-700 line-clamp-2">
          {category.descripcion || "Sin descripción"}
        </p>
      </td>
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => onDelete(category.id)}
          disabled={isDeleting}
          className={`px-3 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors cursor-pointer ${isDeleting ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {isDeleting ? "Eliminando..." : "Eliminar"}
        </button>
      </td>
    </tr>
  );
}
