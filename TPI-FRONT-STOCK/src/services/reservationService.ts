import { apiClient } from "../client/apiClient";
import type {
  IReservationRequest,
  IReservationResponse,
} from "../types/reservation.interface";

const RESERVAS_ENDPOINT = "/reservas";

export const createReservation = (payload: IReservationRequest) =>
  apiClient.post<IReservationResponse>(RESERVAS_ENDPOINT, payload);
