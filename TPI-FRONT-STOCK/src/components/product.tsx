import { useMemo } from "react";

import type { ICategory } from "../types";
import { useProductContext } from "../context/product.context";

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

function renderCategories(categories: ICategory[] | undefined | null) {
  if (!categories || categories.length === 0) {
    return "Sin categorías";
  }

  return categories
    .map(
      (category) =>
        category.nombre ??
        (category as unknown as { name?: string }).name ??
        "Sin nombre",
    )
    .join(", ");
}

export default function ProductTable() {
  const { products, isLoading, isError, refetch } = useProductContext();

  const normalizedProducts = useMemo(
    () =>
      products.map((product) => ({
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion ?? "Sin descripción",
        precio: product.precio,
        stockDisponible: product.stockDisponible,
        categorias: product.categorias ?? [],
      })),
    [products],
  );

  if (isLoading) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Cargando productos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-6">
        <p className="mb-2 text-sm font-semibold text-red-700">
          No pudimos cargar los productos.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (normalizedProducts.length === 0) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          No hay productos registrados en el sistema.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              Producto
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              Precio
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              Stock disponible
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              Categorías
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {normalizedProducts.map((product) => (
            <tr key={product.id} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">
                  {product.nombre}
                </p>
                <p className="text-sm text-slate-500">{product.descripcion}</p>
              </td>
              <td className="px-4 py-3 text-sm text-slate-700">
                {currencyFormatter.format(product.precio)}
              </td>
              <td className="px-4 py-3 text-sm text-slate-700">
                {product.stockDisponible}
              </td>
              <td className="px-4 py-3 text-sm text-slate-500">
                {renderCategories(product.categorias)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
