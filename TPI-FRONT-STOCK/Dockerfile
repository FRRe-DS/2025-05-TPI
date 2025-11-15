# Etapa de construcción
FROM node:18-alpine as build

WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./

# Instalar dependencias
RUN npm ci

# Copiar todo el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos construidos de Vite a Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx para React Router
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]