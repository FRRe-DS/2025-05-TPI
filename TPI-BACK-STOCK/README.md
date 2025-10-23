# TPI - [Nombre de tu Microservicio] (Backend API)

<p align="center">
    <a href="http://nodejs.org" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="100" alt="Node.js Logo" /></a>
</p>

<p align="center">
    API REST construida sobre Node.js y Express.js, utilizando TypeScript, TypeORM y PostgreSQL.
</p>

---

## 📚 Tecnologías Clave

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Lenguaje** | **TypeScript** | Añade tipado estático y escalabilidad. |
| **Framework** | **Express.js** | Servidor web minimalista para la API REST. |
| **Persistencia** | **PostgreSQL**, TypeORM | Base de datos relacional y ORM para la interacción con la DB. |
| **Herramientas** | **ts-node-dev** | Facilita el desarrollo con recarga automática (*hot reload*). |

---

## 🛠️ Requisitos del Sistema (Ejecución Local)

Para ejecutar el proyecto, debes tener instalado y funcionando:

1.  **Node.js (v18 o superior)** y **npm**.
2.  **Servidor PostgreSQL:** Debe estar activo en `localhost:5432` (o el puerto configurado en `.env`).
3.  **Keycloak (Servidor de Auth):** **Debe estar accesible** para la futura validación de tokens de seguridad (comúnmente en `http://localhost:8080`).


---

## ⚙️ Puesta en Marcha y Scripts


El proyecto utiliza **npm** para gestionar las dependencias y los comandos de inicio.

## ⚙️ Puesta en Marcha (Entorno Local)

### 1. Configuración de Variables de Entorno

1.  Cree un archivo llamado **`.env`** en la raíz del proyecto. **No suba este archivo a Git, solo el ejemplo.**
2.  Copie el contenido del siguiente ejemplo y rellénelo con sus credenciales locales.
3.  Ejemplo del archivo **`.env`**

# Puerto del servidor PostgreSQL. El estándar es 5432, pero el ejemplo usa 5433.
PORT=8080

# Host de la base de datos (ej: localhost para desarrollo)
DB_HOST=localhost

# Puerto del servidor PostgreSQL. El estándar es 5432, pero el ejemplo usa 5433.
DB_PORT=5433

# Usuario de la base de datos.
DB_USER=postgres

# Contraseña del usuario de la base de datos
DB_PASSWORD=contraseña

# Nombre de la base de datos
DB_NAME=nombreDeLaBaseDeDatos

### 1. Configuración Inicial

1.  **Instalar Dependencias:**
    ```bash
    npm install
    ```
2.  **Configurar Variables:**
    * Cree el archivo **`.env`** en la raíz del proyecto para definir la conexión a PostgreSQL y otras variables de entorno.
3.  **Base de Datos y Migraciones:**
    * Asegúrese de que su servidor PostgreSQL esté activo y luego ejecute las migraciones:
    ```bash
    # Asume que este script existe en package.json
    npm run typeorm:run 
    ```

### 2. Ejecución del Servidor

Utilice los scripts definidos en `package.json`:

| Comando | Descripción | Uso |
| :--- | :--- | :--- |
| **`npm run dev`** | **Modo Desarrollo:** Inicia el servidor usando `ts-node-dev`. El servidor se reinicia automáticamente (*hot reload*) con cada cambio en el código fuente. | `npm run dev` |
| **`npm run build`** | **Compilar Código:** Traduce el código TypeScript (`src/`) a JavaScript puro para producción (`dist/`). | `npm run build` |
| **`npm run start`** | **Modo Producción:** Ejecuta el código JavaScript compilado (`dist/app.js`). | `npm run start` |

El *backend* estará disponible en **`http://localhost:[PUERTO_CONFIGURADO]`**.

---

## 📐 Estructura y Patrones de Diseño

El *backend* está organizado en capas con enfoque en la **Inyección de Dependencias (DI)** y el patrón **Singleton**.

### Arquitectura de Capas

* **Controllers:** (`src/controllers/`) Manejan la petición HTTP y la respuesta.
* **Services:** (`src/services/`) Contienen la **lógica de negocio** pura.
* **Repositories:** (`src/repository/`) Se encargan de la interacción con la capa de persistencia (TypeORM/PostgreSQL).

### Patrón Singleton (Contenedor DI)

El proyecto utiliza un **Contenedor de Dependencias** modular (`src/container/container.ts`) que garantiza que solo exista una **única instancia** (**Singleton**) de cada Repository, Service y Controller durante la vida útil de la aplicación. Esto asegura la eficiencia y el uso controlado de recursos.

---
