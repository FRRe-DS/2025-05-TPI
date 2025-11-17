import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); //esto es una recomendacion para que las variables de entorno esten disponibles antes de importar keycloak

import { AppDataSource } from "./config/appDataSource";
import { categoryRouter, productRouter, reservationRouter } from "./routes";
import session from "express-session";
import { keycloak, memoryStore } from "./config/keycloak";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion de la session
app.use(
  session({
    secret: "",   //completar
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

// Esto engancha Keycloak a todas las requests
app.use(keycloak.middleware());

/*
  Configuracion para orgigenes y permisos 
  (Acepta cualquier peticion que venga las urls establecidas y con el header de credenciales)
*/
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
app.use(json());

const initApp = async () => {
  try {

    // Conexion a base de datos
    await AppDataSource.initialize();
    console.log("✅ Conexion establecida")

    // Rutas
    app.get('/', (req, res) => res.send('Prueba api node'));
    app.use("/v1/categorias", categoryRouter);
    app.use("/v1/productos", productRouter);
    app.use("/v1/reservas", reservationRouter);
    

    // Iniciar servidor
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`📍 Productos: http://localhost:${PORT}/v1/productos`);
      console.log(`📍 Reservas: http://localhost:${PORT}/v1/reservas`);
      console.log(`📍 Categorias: http://localhost:${PORT}/v1/categorias`);
    });
  } catch (error) {
    console.error("❌ Error initializing app:", error);
    process.exit(1);
  }
};

initApp();
