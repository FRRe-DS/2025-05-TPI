import express, { json } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import productosRouter from './routes/productosRoutes'
import { AppDataSource } from "./config/appDataSource";


AppDataSource.initialize()
  .then(() => {
    console.log("Conexion a la base de datos establecida")
  
    app.listen(PORT, ()=>{
      console.log("Api funcionando en el puerto 8080")
    }) 
  })
  .catch((error) => console.log("Error al conectar a la base de datos: ", error))

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173'
];

/*
  Configuracion para orgigenes y permisos 
  (Acepta cualquier peticion que venga las urls establecidas y con el header de credenciales)
*/
const corsOptions: cors.CorsOptions = {
  // Solo permite las URLs definidas en el arreglo allowedOrigins
  origin: allowedOrigins,
  
  // Es vital permitir credenciales si usas headers de Autorización (JWT)
  //credentials: true, 
};

app.use(json());
app.use(cors(corsOptions));
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Prueba api node'))
app.use('/productos', productosRouter);


