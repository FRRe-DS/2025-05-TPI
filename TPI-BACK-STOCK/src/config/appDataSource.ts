import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import dns from "dns";
import { Producto } from "../models/Producto.entity";
import { Categoria } from "../models/Categoria.entity";
import { Reserva } from "../models/Reserva.entity";
import { ReservaProducto } from "../models/ReservaProducto.entity";

dns.setDefaultResultOrder("ipv4first");
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres", 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, 
  },
  synchronize: true, 
  logging: true,
  entities: [Producto, Categoria, Reserva, ReservaProducto], //<-- Aca van las entidades o modelos
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
