import { useMemo, useState } from "react";
import type { IReservationProduct } from "../../types/reservation-item.interface";
import type { IReservationRequest } from "../../types/reservation.interface";

interface ReservationFormProps {
  loading?: boolean;
  onSubmit: (payload: IReservationRequest) => Promise<void>;
}

interface EditableProduct {
  idProducto: string;
  cantidad: string;
}

const emptyProduct: EditableProduct = { idProducto: "", cantidad: "" };

export const ReservationForm = ({
  loading = false,
  onSubmit,
}: ReservationFormProps) => {
  const [idCompra, setIdCompra] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [productos, setProductos] = useState<EditableProduct[]>([
    { ...emptyProduct },
  ]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const isSubmitDisabled = useMemo(
    () => loading || productos.length === 0,
    [loading, productos.length],
  );

  const handleProductChange = (
    index: number,
    field: keyof EditableProduct,
    value: string,
  ) => {
    setProductos((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const handleAddProduct = () => {
    setProductos((prev) => [...prev, { ...emptyProduct }]);
  };

  const handleRemoveProduct = (index: number) => {
    setProductos((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedUsuarioId = Number(usuarioId);
    const parsedProductos: IReservationProduct[] = productos
      .filter(
        (producto) =>
          producto.idProducto.trim() !== "" || producto.cantidad.trim() !== "",
      )
      .map((producto) => ({
        idProducto: Number(producto.idProducto),
        cantidad: Number(producto.cantidad),
      }));

    const validationMessage = validatePayload({
      idCompra,
      usuarioId: parsedUsuarioId,
      productos: parsedProductos,
    });

    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    setValidationError(null);

    await onSubmit({
      idCompra: idCompra.trim(),
      usuarioId: parsedUsuarioId,
      productos: parsedProductos,
    });
  };

  const handleClear = () => {
    setIdCompra("");
    setUsuarioId("");
    setProductos([{ ...emptyProduct }]);
    setValidationError(null);
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <fieldset className="form-fieldset" disabled={loading}>
        <legend>Datos de la reserva</legend>

        <div className="form-group">
          <label htmlFor="idCompra">ID de Compra</label>
          <input
            id="idCompra"
            type="text"
            placeholder="Ej: COMPRA-XYZ-12345"
            value={idCompra}
            onChange={(event) => setIdCompra(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="usuarioId">Usuario ID</label>
          <input
            id="usuarioId"
            type="number"
            min={1}
            placeholder="Ej: 123"
            value={usuarioId}
            onChange={(event) => setUsuarioId(event.target.value)}
            required
          />
        </div>
      </fieldset>

      <fieldset className="form-fieldset" disabled={loading}>
        <legend>Productos a reservar</legend>

        {productos.map((producto, index) => (
          <div className="product-row" key={`producto-${index}`}>
            <div className="form-group product-input">
              <label htmlFor={`producto-id-${index}`}>ID Producto</label>
              <input
                id={`producto-id-${index}`}
                type="number"
                min={1}
                value={producto.idProducto}
                onChange={(event) =>
                  handleProductChange(index, "idProducto", event.target.value)
                }
                required
              />
            </div>

            <div className="form-group product-input">
              <label htmlFor={`producto-cantidad-${index}`}>Cantidad</label>
              <input
                id={`producto-cantidad-${index}`}
                type="number"
                min={1}
                value={producto.cantidad}
                onChange={(event) =>
                  handleProductChange(index, "cantidad", event.target.value)
                }
                required
              />
            </div>

            {productos.length > 1 && (
              <button
                className="ghost-button"
                type="button"
                onClick={() => handleRemoveProduct(index)}
                aria-label={`Eliminar producto ${index + 1}`}
              >
                Quitar
              </button>
            )}
          </div>
        ))}

        <button
          className="secondary-button"
          type="button"
          onClick={handleAddProduct}
        >
          Añadir producto
        </button>
      </fieldset>

      {validationError && (
        <div className="alert error" role="alert">
          {validationError}
        </div>
      )}

      <div className="form-actions">
        <button
          className="primary-button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {loading ? "Enviando..." : "Enviar reserva"}
        </button>
        <button
          className="ghost-button"
          type="button"
          onClick={handleClear}
          disabled={loading}
        >
          Limpiar formulario
        </button>
      </div>
    </form>
  );
};

const validatePayload = (payload: IReservationRequest) => {
  if (!payload.idCompra.trim()) {
    return "Ingresa un ID de compra válido.";
  }

  if (!Number.isInteger(payload.usuarioId) || payload.usuarioId <= 0) {
    return "El usuario debe ser un número entero mayor a cero.";
  }

  if (!payload.productos.length) {
    return "Agrega al menos un producto a la reserva.";
  }

  const invalidItem = payload.productos.find(
    (producto) =>
      !Number.isInteger(producto.idProducto) ||
      producto.idProducto <= 0 ||
      !Number.isInteger(producto.cantidad) ||
      producto.cantidad <= 0,
  );

  if (invalidItem) {
    return "Completa ID de producto y cantidad con números enteros mayores a cero.";
  }

  return null;
};

export default ReservationForm;
