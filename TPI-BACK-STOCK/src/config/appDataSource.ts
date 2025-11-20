// src/config/appDataSource.ts - VERSIÓN CORREGIDA
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import dns from "dns";

import { Category, Product, ProductImage, Reservation, ReservationItem } from "../models/entities";

dns.setDefaultResultOrder("ipv4first");
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres", 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10), 
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  synchronize: false, // ← CAMBIAR A FALSE
  logging: true,
  entities: [Product, Category, Reservation, ReservationItem, ProductImage],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});