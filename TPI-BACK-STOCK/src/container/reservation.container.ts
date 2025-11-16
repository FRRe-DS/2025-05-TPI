import { ReservationRepository } from "../repository";
import { ReservationService } from "../services";
import { ReservationController } from "../controllers";

export const buildReservationDependencies = () => {
  
  const repository = new ReservationRepository(); 
  
  const service = new ReservationService(repository);

  const controller = new ReservationController(service);

  return {
    reservationService: service,
    reservationyController: controller,
  };
};