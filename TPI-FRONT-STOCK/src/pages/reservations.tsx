import ReservationList from "../components/reservation";

/**
 * Página principal para la gestión de reservas
 */
export const ReservationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ReservationList />
    </div>
  );
};

export default ReservationsPage;
