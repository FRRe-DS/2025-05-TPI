import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
import "reflect-metadata";
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // Configuración de variables de entorno (se hace una sola vez al principio)

import { AppDataSource } from "./config/appDataSource";
import { categoryRouter, productRouter, reservationRouter } from "./routes";

// Imports de tus compañeros (Keycloak y Session)
import session from "express-session";
import { keycloak, memoryStore } from "./config/keycloak";
import { initAuthM2M } from "./services/keykcloak.service";

// Import de tu tarea (Error Handler)
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la session (Agregado por tus compañeros)
app.use(
  session({
    secret: "MiclaveDeDesarrollo",   // completar si es necesario
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

// Esto engancha Keycloak a todas las requests (Agregado por tus compañeros)
app.use(keycloak.middleware());

/*
  Configuracion para origenes y permisos 
*/
const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
// app.use(json()); // Ya tienes app.use(express.json()) arriba, pero lo dejo por si acaso lo usan así.

const PORT = process.env.PORT || 8080;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado a Supabase correctamente");
  })
  .catch(error => {
    console.error("❌ Error conectando a Supabase:", error);
  });

const initApp = async () => {
  try {
    console.log("🔄 ENTRO AL TRY...");

    // Conexion a base de datos
    await AppDataSource.initialize();
    console.log("✅ Conexion establecida");

    // Rutas
    app.get('/', (req, res) => res.send('Prueba api node'));
    app.use("/v1/categorias", categoryRouter);
    app.use("/v1/productos", productRouter);
    app.use("/v1/reservas", reservationRouter);
    
    // 👇 TU MANEJADOR DE ERRORES (Aquí está perfecto)
    app.use(errorHandler);

    // Iniciar servidor
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`📍 Productos: http://localhost:${PORT}/v1/productos`);
      console.log(`📍 Reservas: http://localhost:${PORT}/v1/reservas`);
      console.log(`📍 Categorias: http://localhost:${PORT}/v1/categorias`);
    });
<<<<<<< HEAD

    
=======
>>>>>>> develop
  } catch (error) {
    console.error("❌ Error initializing app:", error);
    process.exit(1);
  }
};

initApp();