# Sistema de Gestión de Stock - TPI 2025

![React](https://img.shields.io/badge/React-19-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript) ![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=nodedotjs) ![Keycloak](https://img.shields.io/badge/Auth-Keycloak-orange?logo=keycloak) ![Supabase](https://img.shields.io/badge/DB-Supabase-green?logo=supabase)

Repositorio oficial para el Trabajo Práctico Integrador de la materia **Desarrollo de Software** (UTN FRRe).

Este proyecto implementa una plataforma moderna de gestión de inventario con una arquitectura de microservicios, seguridad avanzada mediante IAM (Identity and Access Management) y persistencia en la nube.

---

## 🏗️ Arquitectura del Sistema

El sistema opera bajo un esquema de **Monorepo** dividido en capas:

1.  **Frontend (`/TPI-FRONT-STOCK`):** SPA desarrollada con **React 19** y **Vite**. Utiliza **Tailwind CSS v4** y **Material UI v7** para la interfaz.
2.  **Backend (`/TPI-BACK-STOCK`):** API REST en **Express v5** y **TypeScript**.
3.  **Infraestructura (`/docker`):** Orquestación de contenedores para el servicio de identidad (Keycloak) y la API.
4.  **Base de Datos:**
    * **Gestión de Usuarios (IAM):** PostgreSQL local (Docker).
    * **Negocio/Stock:** PostgreSQL en la nube (**Supabase**).

---

## 🛠️ Stack Tecnológico (Bleeding Edge)

Utilizamos las versiones más recientes y estables de las tecnologías:

| Área | Tecnología | Versión / Detalle |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | v19 / v7 |
| **Estilos** | Tailwind CSS | **v4.1** (Última generación) |
| **Componentes** | Material UI | **v7** |
| **Estado** | TanStack Query | v5 (Gestión asíncrona) |
| **Backend** | Express | **v5** (Next Gen) |
| **ORM** | TypeORM | Conexión a Supabase |
| **Seguridad** | Keycloak | v23 (OIDC / OAuth2) |

---

## 🚀 Guía de Instalación y Despliegue

Sigue estos pasos en orden para levantar el ecosistema completo.

### Paso 1: Configuración de Variables de Entorno
Este proyecto requiere configurar variables en tres ubicaciones.

**A. Infraestructura (`/docker/.env`)**
Crea un archivo `.env` dentro de la carpeta `docker/`. Es vital para que Docker Compose funcione.
```ini
# --- Configuración Base de Datos Keycloak (Local) ---
POSTGRES_DB=keycloak_db
POSTGRES_USER=keycloak_user
POSTGRES_PASSWORD=admin

# --- Configuración Keycloak Admin ---
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=admin

# --- Credenciales Supabase (Base de datos de Stock) ---
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=TU_PASSWORD_SUPABASE
SUPABASE_DB_OPTIONS=project=tu-project-id

# --- Configuración Cliente Keycloak (Para el Backend) ---
KEYCLOAK_CLIENT_ID=backend-api
KEYCLOAK_CLIENT_SECRET=TU_CLIENT_SECRET
KEYCLOAK_TOKEN_URL=http://keycloak:8080/realms/ds-2025-realm/protocol/openid-connect/token
```

**B. Backend (`/TPI-BACK-STOCK/.env`)**
Copia el archivo `.env.example` que está en la carpeta y ajústalo con tus credenciales.

**C. Frontend (`/TPI-FRONT-STOCK/.env`)**
Crea un archivo `.env` en la carpeta del frontend con este contenido:
```ini
VITE_API_URL=http://localhost:8000
```

---

### Paso 2: Levantar Infraestructura (Docker)

Desde la raíz del proyecto, ejecutamos Docker Compose para levantar la Base de Datos y Keycloak:

```bash
cd docker
docker-compose up -d --build
```

Esto iniciará:
* **PostgreSQL (Local):** Para datos internos de Keycloak.
* **Keycloak:** Servicio de identidad (disponible en `http://localhost:8080`).
    * *Nota:* Se importará automáticamente la configuración desde `./realm-config`.
* **Backend API:** Disponible en `http://localhost:8000`.

> **Nota:** El backend dentro de Docker se compila apuntando a la base de datos de Supabase definida en las variables de entorno.

---

### Paso 3: Levantar Frontend (Local)

El frontend se ejecuta fuera de Docker para aprovechar la velocidad de desarrollo de Vite. Abrí una nueva terminal y ejecutá:

```bash
cd ../TPI-FRONT-STOCK
npm install
npm run dev
```

Accede a la aplicación en: **`http://localhost:5173`**

---

## 🧪 Workflow de Desarrollo

Para trabajar en el código del **Backend** y ver cambios en tiempo real sin reiniciar Docker:

1.  En `docker/docker-compose.yml`, comentá o detené el servicio `stock_backend_api`.
2.  Mantén corriendo `keycloak` y `keycloak_db`.
3.  Ve a la carpeta `/TPI-BACK-STOCK` y ejecutá:
    ```bash
    npm run dev
    ```

---

## 📝 Licencia
Proyecto académico para la cátedra de Desarrollo de Software - UTN FRRe.