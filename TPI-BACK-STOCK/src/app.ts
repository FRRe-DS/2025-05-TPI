import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/appDataSource";
import { categoryRouter } from "./routes/category.routes";

dotenv.config();

const app = express();

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

const PORT = process.env.PORT || 8080;

const initApp = async () => {
  try {

    // Conexion a base de datos
    await AppDataSource.initialize();
    console.log("Conexion establecida")

    // Rutas
    app.get('/', (req, res) => res.send('Prueba api node'));
    app.use("/categorias", categoryRouter);

    // Iniciar servidor
    app.listen(process.env.PORT || 8080, () => {
      console.log('API funcionando en el puerto ' + process.env.PORT);
    });
  } catch (error) {
    console.error("❌ Error initializing app:", error);
    process.exit(1);
  }
};

initApp();

