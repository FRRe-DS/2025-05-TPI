-- ####################################################################
-- # ARCHIVO SQL COMPLETO: CREACIÓN DE TABLAS Y RELLENO (SEEDING)
-- #
-- # Compatibilidad: Estándar SQL, funciona en PostgreSQL/MySQL con ligeros ajustes.
-- # Se asume tipo de dato: INTEGER (para enteros), VARCHAR (para strings),
-- # NUMERIC/DECIMAL/FLOAT (para precios y dimensiones), BOOLEAN (para esPrincipal).
-- ####################################################################

-- --------------------------------------------------------------------
-- PARTE 1: CREACIÓN DE TABLAS
-- --------------------------------------------------------------------

-- Tabla Categoria (Esquema Categoria/CategoriaInput)
CREATE TABLE Categoria (
    id          INTEGER PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

-- Tabla Dimensiones (Esquema Dimensiones)
CREATE TABLE Dimensiones (
    id          INTEGER PRIMARY KEY,
    largoCm     NUMERIC(10, 2) NOT NULL CHECK (largoCm >= 0),
    anchoCm     NUMERIC(10, 2) NOT NULL CHECK (anchoCm >= 0),
    altoCm      NUMERIC(10, 2) NOT NULL CHECK (altoCm >= 0)
);

-- Tabla UbicacionAlmacen (Esquema UbicacionAlmacen)
CREATE TABLE UbicacionAlmacen (
    id          INTEGER PRIMARY KEY,
    almacenId   INTEGER NOT NULL,
    pasillo     VARCHAR(50),
    estanteria  VARCHAR(50),
    nivel       INTEGER
);

-- Tabla Producto (Esquema Producto/ProductoInput)
CREATE TABLE Producto (
    id                  INTEGER PRIMARY KEY,
    nombre              VARCHAR(200) NOT NULL,
    descripcion         TEXT,
    precio              NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
    stockDisponible     INTEGER NOT NULL CHECK (stockDisponible >= 0),
    pesoKg              NUMERIC(10, 2) CHECK (pesoKg >= 0),
    dimensionesId       INTEGER,
    ubicacionId         INTEGER,
    -- Claves foráneas para datos anidados
    FOREIGN KEY (dimensionesId) REFERENCES Dimensiones(id),
    FOREIGN KEY (ubicacionId) REFERENCES UbicacionAlmacen(id)
);

-- Tabla ImagenProducto (Esquema ImagenProducto)
CREATE TABLE ImagenProducto (
    id            SERIAL PRIMARY KEY, -- Usamos SERIAL para auto-incremento aquí
    productoId    INTEGER NOT NULL,
    url           VARCHAR(255) NOT NULL,
    esPrincipal   BOOLEAN NOT NULL,
    FOREIGN KEY (productoId) REFERENCES Producto(id) ON DELETE CASCADE
);

-- Tabla de Unión ProductoCategoria (Relación M:N entre Producto y Categoria)
CREATE TABLE ProductoCategoria (
    productoId  INTEGER NOT NULL,
    categoriaId INTEGER NOT NULL,
    PRIMARY KEY (productoId, categoriaId),
    FOREIGN KEY (productoId) REFERENCES Producto(id) ON DELETE CASCADE,
    FOREIGN KEY (categoriaId) REFERENCES Categoria(id) ON DELETE CASCADE
);

-- Tabla Reserva (Esquema ReservaOutput/ReservaCompleta)
CREATE TABLE Reserva (
    idReserva          INTEGER PRIMARY KEY,
    idCompra           VARCHAR(100) NOT NULL,
    usuarioId          INTEGER NOT NULL,
    estado             VARCHAR(20) NOT NULL CHECK (estado IN ('confirmado', 'pendiente', 'cancelado', 'liberado')),
    expiresAt          TIMESTAMP WITH TIME ZONE,
    fechaCreacion      TIMESTAMP WITH TIME ZONE NOT NULL,
    fechaActualizacion TIMESTAMP WITH TIME ZONE
);

-- Tabla DetalleReserva (Para almacenar los productos y cantidades de una reserva)
CREATE TABLE DetalleReserva (
    reservaId       INTEGER NOT NULL,
    productoId      INTEGER NOT NULL,
    cantidad        INTEGER NOT NULL CHECK (cantidad >= 1),
    precioUnitario  NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (reservaId, productoId),
    FOREIGN KEY (reservaId) REFERENCES Reserva(idReserva) ON DELETE CASCADE,
    FOREIGN KEY (productoId) REFERENCES Producto(id)
);


-- --------------------------------------------------------------------
-- PARTE 2: RELLENO DE DATOS (SEEDING)
-- --------------------------------------------------------------------

-- 1. INSERTAR CATEGORÍAS
-- --------------------------------------------------------------------
INSERT INTO Categoria (id, nombre, descripcion) VALUES
(1, 'Electrónica', 'Dispositivos electrónicos y accesorios.'),
(2, 'Hogar', 'Artículos para el hogar y decoración.'),
(3, 'Oficina', 'Suministros y equipos de oficina.'),
(4, 'Muebles', 'Mobiliario para el hogar y la oficina.'),
(5, 'Deportes', 'Equipamiento y ropa deportiva.');


-- 2. INSERTAR DIMENSIONES
-- --------------------------------------------------------------------
INSERT INTO Dimensiones (id, largoCm, anchoCm, altoCm) VALUES
(101, 35.0, 25.0, 2.5),    -- Dimensiones para Laptop
(102, 10.0, 10.0, 15.0),   -- Dimensiones para Taza
(103, 150.0, 80.0, 75.0);  -- Dimensiones para Escritorio


-- 3. INSERTAR UBICACIONES EN ALMACÉN
-- --------------------------------------------------------------------
INSERT INTO UbicacionAlmacen (id, almacenId, pasillo, estanteria, nivel) VALUES
(201, 1, 'A01', 'E05', 3),  -- Ubicación para Laptop
(202, 2, 'C10', 'E02', 1),  -- Ubicación para Taza
(203, 1, 'B02', 'E15', 2);  -- Ubicación para Escritorio


-- 4. INSERTAR PRODUCTOS
-- --------------------------------------------------------------------
INSERT INTO Producto (id, nombre, descripcion, precio, stockDisponible, pesoKg, dimensionesId, ubicacionId) VALUES
(1, 'Laptop Pro X', 'Una laptop potente para profesionales.', 1499.99, 50, 1.8, 101, 201),
(2, 'Taza de Café Térmica', 'Mantiene tu café caliente por horas.', 15.50, 200, 0.3, 102, 202),
(3, 'Escritorio de Madera', 'Escritorio amplio y robusto para oficina.', 299.00, 10, 35.5, 103, 203);


-- 5. INSERTAR RELACIONES PRODUCTO-CATEGORÍA
-- --------------------------------------------------------------------
INSERT INTO ProductoCategoria (productoId, categoriaId) VALUES
(1, 1), -- Laptop -> Electrónica
(1, 3), -- Laptop -> Oficina
(2, 2), -- Taza -> Hogar
(3, 4), -- Escritorio -> Muebles
(3, 3);  -- Escritorio -> Oficina


-- 6. INSERTAR IMÁGENES DE PRODUCTOS
--    Nota: La columna 'id' es SERIAL (auto-incremento)
-- --------------------------------------------------------------------
INSERT INTO ImagenProducto (productoId, url, esPrincipal) VALUES
(1, 'https://example.com/images/laptop_frontal.jpg', TRUE),
(1, 'https://example.com/images/laptop_lateral.jpg', FALSE),
(2, 'https://example.com/images/taza_roja.jpg', TRUE),
(3, 'https://example.com/images/escritorio_vista.jpg', TRUE);


-- 7. INSERTAR UNA RESERVA DE EJEMPLO
-- --------------------------------------------------------------------
INSERT INTO Reserva (idReserva, idCompra, usuarioId, estado, expiresAt, fechaCreacion, fechaActualizacion) VALUES
(550, 'COMPRA-XYZ-12345', 123, 'confirmado', '2025-10-10 12:00:00', '2025-09-25 10:30:00', '2025-09-25 10:30:00');


-- 8. INSERTAR DETALLES DE LA RESERVA
-- --------------------------------------------------------------------
INSERT INTO DetalleReserva (reservaId, productoId, cantidad, precioUnitario) VALUES
(550, 1, 1, 1499.99), -- 1x Laptop Pro X
(550, 2, 2, 15.50);   -- 2x Taza de Café Termica