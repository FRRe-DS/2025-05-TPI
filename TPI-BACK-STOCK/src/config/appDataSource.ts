import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import dns from "dns";
import { Product } from "../models/Product.entity";
import { Category } from "../models/Category.entity";
import { Reservation } from "../models/Reservation.entity";
import { ReservationItem } from "../models/ReservationItem.entity";

dns.setDefaultResultOrder("ipv4first");
dotenv.config();

export const appDataSource = new DataSource({
  type: "postgres", // <-- ¡CAMBIO CLAVE AQUÍ!
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10), // Ahora el default es correcto
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //ssl: {
    //rejectUnauthorized: false, 
  //},
  /* 
    La linea de synchronize se usa para sincronizar la base de datos de forma automatica
    cada vez que se haga un cambio en el sistema.

    true -> Se sincroniza automaticamente
    false -> Los cambios se hacen a mano

    Decidan ustedes cual configuracion usar
  */ 
  synchronize: true, 
  logging: true,
  entities: [Product, Category, Reservation, ReservationItem], //<-- Aca van las entidades o modelos
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
