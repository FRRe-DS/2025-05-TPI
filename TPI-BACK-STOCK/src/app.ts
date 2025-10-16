import express from "express";
import { appDataSource } from "./config/appDataSource";
import productRoutes from "./routes/productRoutes";
import reservationRoutes from "./routes/reservationRoutes";

const app = express();
app.use(express.json());

// Inicializar base de datos
appDataSource.initialize()
  .then(() => {
    console.log("✅ Base de datos conectada");
  })
  .catch((error) => console.log("❌ Error conectando a la base de datos:", error));

// Rutas
app.use("/v1/productos", productRoutes);
app.use("/v1/reservas", reservationRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    message: "API de Gestión de Stock - TPI Desarrollo de Software",
    version: "1.0.0",
    endpoints: {
      productos: "/v1/productos",
      reservas: "/v1/reservas"
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

export default app;