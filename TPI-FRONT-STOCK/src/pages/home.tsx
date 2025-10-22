import ProductTable from "../components/product";
import { ProductProvider } from "../context/product.context";

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Listado de productos
        </h1>
        <p className="text-sm text-slate-600">
          Consulta el stock disponible y el detalle general de cada producto.
        </p>
      </header>

      <ProductProvider>
        <ProductTable />
      </ProductProvider>
    </section>
  );
}
