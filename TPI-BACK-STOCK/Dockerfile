# ../TPI-BACK-STOCK/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY src/ ./src/
COPY .env ./

# Instalar ts-node-dev para desarrollo
RUN npm install -g ts-node-dev

# Exponer puerto (debe coincidir con el que usa tu app)
EXPOSE 8000

# Comando para desarrollo (con hot-reload)
CMD ["npm", "run", "dev"]

# Para producción usarías:
# RUN npm run build
# CMD ["node", "dist/app.js"]