import { ReservationRepository } from "../repository/reservationRepository";
import { ReservationService } from "../services/reservation.service";

class Container{
  private reservationService: ReservationService;

  constructor(){
   this.reservationService = new ReservationService(new ReservationRepository());
  }


  getReservationService(): ReservationService {
    return this.reservationService;
  }
}

export const container = new Container();