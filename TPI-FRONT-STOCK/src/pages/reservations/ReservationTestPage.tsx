import ReservationForm from "../../components/reservations/ReservationForm";
import { useCreateReservation } from "../../hooks/useCreateReservation";
import type { IReservationRequest } from "../../types/reservation.interface";

export const ReservationTestPage = () => {
  const { submit, loading, error, result, reset } = useCreateReservation();

  const handleSubmit = async (payload: IReservationRequest) => {
    await submit(payload);
  };

  const handleResetState = () => {
    reset();
  };

  return (
    <section className="page reservation-page">
      <header className="page-header">
        <h1>Interfaz de Prueba de Reserva</h1>
        <p className="page-subtitle">
          Envía una solicitud a <code>POST /reservas</code> y verifica cómo
          responde el backend cuando el stock es insuficiente.
        </p>
      </header>

      {result && (
        <div className="alert success" role="status">
          <span>
            Reserva creada con ID <strong>{result.idReserva}</strong> en estado{" "}
            <strong>{result.estado}</strong>.
          </span>
          <button type="button" onClick={handleResetState}>
            Nueva prueba
          </button>
        </div>
      )}

      {error && (
        <div className="alert error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={handleResetState}>
            Limpiar estado
          </button>
        </div>
      )}

      <ReservationForm loading={loading} onSubmit={handleSubmit} />

      <footer className="page-footer">
        <small>
          Tip: genera un caso de error solicitando más unidades de las
          disponibles para un producto. El backend debería responder con un
          mensaje claro de stock insuficiente.
        </small>
      </footer>
    </section>
  );
};

export default ReservationTestPage;
