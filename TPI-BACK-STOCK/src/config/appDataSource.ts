import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import dns from "dns";

import { Category, Product, ProductImage, Reservation, ReservationItem } from "../models/entities";

dns.setDefaultResultOrder("ipv4first");
dotenv.config();

const isProduction = process.env.NODE_ENV === "production"
const dbOptions = process.env.DB_OPTIONS;
const extraOptions = dbOptions ? { options: dbOptions } : {};

export const AppDataSource = new DataSource({
  type: "postgres", 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10), 
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  extra:extraOptions,
  /*ssl: {
    rejectUnauthorized: false, 
  },*/ 
  synchronize: !isProduction, 
  logging: true,
  entities: [Product, Category, Reservation, ReservationItem, ProductImage], //<-- Aca van las entidades o modelos
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
