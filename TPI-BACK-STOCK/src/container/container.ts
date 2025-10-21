import { ReservationRepository } from "../repository";
import { ReservationService } from "../services";

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
