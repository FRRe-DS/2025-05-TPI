import { buildReservationDependencies } from "./reservation.container"; 

const reservationDependencies = buildReservationDependencies();

export const container = {
  ...reservationDependencies
};