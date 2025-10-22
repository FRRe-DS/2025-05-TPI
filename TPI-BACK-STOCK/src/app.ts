import express, { json } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { AppDataSource } from "./config/appDataSource";
import productRoutes from "./routes/productRoutes";
import reservationRoutes from "./routes/reservation.routes";

dotenv.config();

const app = express();
app.use(express.json());

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
    app.use("/v1/productos", productRoutes);
    app.use("/v1/reservas", reservationRoutes);
    

    // Iniciar servidor
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`📍 Productos: http://localhost:${PORT}/v1/productos`);
      console.log(`📍 Reservas: http://localhost:${PORT}/v1/reservas`);
    });
  } catch (error) {
    console.error("❌ Error initializing app:", error);
    process.exit(1);
  }
};

initApp();