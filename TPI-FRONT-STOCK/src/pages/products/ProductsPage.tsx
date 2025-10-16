import ProductTable from "../../components/products/ProductTable";
import { useProducts } from "../../hooks/useProducts";

export const ProductsPage = () => {
  const { products, loading, error, reload } = useProducts();

  return (
    <section className="page products-page">
      <header className="page-header">
        <h1>Listado de Productos</h1>
        <p className="page-subtitle">
          Consulta el stock disponible y los datos principales de cada producto.
        </p>
      </header>

      {error && (
        <div className="alert error">
          <span>{error}</span>
          <button type="button" onClick={() => void reload()}>
            Reintentar
          </button>
        </div>
      )}

      <ProductTable products={products} isLoading={loading} />
    </section>
  );
};

export default ProductsPage;
