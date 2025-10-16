import type { IProduct } from "../../types/product.interface";

interface ProductTableProps {
  products: IProduct[];
  isLoading?: boolean;
}

export const ProductTable = ({
  products,
  isLoading = false,
}: ProductTableProps) => {
  if (isLoading) {
    return <div className="table-status">Cargando productos…</div>;
  }

  if (!products.length) {
    return <div className="table-status">No hay productos para mostrar.</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="products-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock disponible</th>
            <th scope="col">Categorías</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nombre}</td>
              <td>{formatCurrency(product.precio)}</td>
              <td>{product.stockDisponible}</td>
              <td>{renderCategories(product)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const renderCategories = ({ categorias }: IProduct) => {
  if (!categorias?.length) {
    return "—";
  }

  return categorias.map((category) => category.nombre).join(", ");
};

const formatCurrency = (value: unknown) => {
  const amount = typeof value === "number" ? value : Number(value ?? 0);
  return amount.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
};

export default ProductTable;
