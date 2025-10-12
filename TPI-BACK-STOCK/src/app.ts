import express, { json } from "express";
import cors from 'cors';
import dotenv from "dotenv";

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

app.listen(PORT, ()=>{
  console.log("Api funcionando en el puerto 8080")
}) 
