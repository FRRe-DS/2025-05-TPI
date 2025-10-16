import { useCallback, useState } from "react";
import {
  createReservation,
} from "../services/reservationService";
import type {
  IReservationRequest,
  IReservationResponse,
} from "../types/reservation.interface";

interface UseCreateReservationResult {
  loading: boolean;
  error: string | null;
  result: IReservationResponse | null;
  submit: (payload: IReservationRequest) => Promise<void>;
  reset: () => void;
}

export const useCreateReservation = (): UseCreateReservationResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IReservationResponse | null>(null);

  const submit = useCallback(async (payload: IReservationRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createReservation(payload);
      setResult(response);
    } catch (err) {
      setResult(null);
      setError(
        err instanceof Error ? err.message : "Error desconocido al crear reserva",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setResult(null);
  }, []);

  return {
    loading,
    error,
    result,
    submit,
    reset,
  };
};
