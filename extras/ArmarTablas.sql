-- -----------------------------------------------------------
-- 1. CREACIÓN DE LA TABLA PIVOTE producto_categorias (AL FINAL)
-- -----------------------------------------------------------
DROP TABLE IF EXISTS producto_categorias;


-- -----------------------------------------------------------
-- 2. CARGA DE CATEGORÍAS (PRIMERO)
-- -----------------------------------------------------------
INSERT INTO categorias (nombre, descripcion) VALUES
('Electrónica', 'Dispositivos electrónicos y accesorios.'),              -- ID 1
('Hogar & Oficina', 'Artículos para el hogar y la oficina.'),            -- ID 2
('Liquidación', 'Productos con descuento o en liquidación.'),            -- ID 3
('Herramientas', 'Herramientas manuales y eléctricas.'),                 -- ID 4
('Utensilios Cocina', 'Utensilios y aparatos de cocina.');               -- ID 5


-- -----------------------------------------------------------
-- 3. CARGA DE PRODUCTOS (SEGUNDO)
-- -----------------------------------------------------------
INSERT INTO productos (
    nombre, descripcion, precio, stock_disponible, peso_kg, 
    "dimensionesLargo_cm", "dimensionesAncho_cm", "dimensionesAlto_cm", 
    "ubicacionCalle", "ubicacionCiudad", "ubicacionProvincia", "ubicacionCodigo_postal", "ubicacionPais"
) VALUES
-- ID 1: Laptop (Electrónica, Liquidación)
('Laptop Pro X', 'Portátil potente M3.', 1499.99, 50, 1.85, 35.5, 24.5, 1.7, 'Av. Vélez Sársfield 123', 'Resistencia', 'Chaco', 'H3500ABC', 'AR'), 
-- ID 2: Mouse (Electrónica, Hogar & Oficina)
('Mouse Inalámbrico Silent', 'Mouse ergonómico silencioso.', 25.50, 120, 0.15, 10.0, 6.0, 3.0, 'Av. Vélez Sársfield 123', 'Resistencia', 'Chaco', 'H3500ABC', 'AR'),
-- ID 3: Monitor (Electrónica)
('Monitor Curvo 32"', 'Monitor 4K curvo para gaming y diseño.', 499.00, 30, 8.5, 75.0, 15.0, 45.0, 'Calle Alvear 456', 'Resistencia', 'Chaco', 'H3500DEF', 'AR'),
-- ID 4: Teclado (Electrónica, Liquidación)
('Teclado Mecánico RGB', 'Teclado gamer con switches táctiles.', 89.99, 75, 1.2, 45.0, 15.0, 4.0, 'Av. Vélez Sársfield 123', 'Resistencia', 'Chaco', 'H3500ABC', 'AR'),
-- ID 5: Cafetera (Hogar & Oficina, Utensilios Cocina)
('Cafetera Espresso Automática', 'Prepara espresso, capuchino y más.', 199.50, 40, 4.0, 30.0, 20.0, 40.0, 'Av. 9 de Julio 789', 'Resistencia', 'Chaco', 'H3500GHI', 'AR'),
-- ID 6: Silla Oficina (Hogar & Oficina)
('Silla Ergonómica Mesh', 'Silla de oficina con soporte lumbar ajustable.', 149.00, 25, 15.0, 60.0, 60.0, 120.0, 'Calle Alvear 456', 'Resistencia', 'Chaco', 'H3500DEF', 'AR'),
-- ID 7: Taladro Percutor (Herramientas)
('Taladro Percutor 850W', 'Herramienta eléctrica de alto rendimiento.', 59.90, 90, 2.5, 30.0, 8.0, 25.0, 'Av. 9 de Julio 789', 'Resistencia', 'Chaco', 'H3500GHI', 'AR'),
-- ID 8: Set Destornilladores (Herramientas)
('Set Destornilladores Precision', '50 piezas para electrónica y hogar.', 19.99, 200, 0.5, 25.0, 15.0, 5.0, 'Av. 9 de Julio 789', 'Resistencia', 'Chaco', 'H3500GHI', 'AR'),
-- ID 9: Aspiradora Robot (Hogar & Oficina)
('Aspiradora Robot con Mapeo', 'Limpia automáticamente con tecnología LiDAR.', 350.00, 60, 3.8, 33.0, 33.0, 8.0, 'Calle Alvear 456', 'Resistencia', 'Chaco', 'H3500DEF', 'AR'),
-- ID 10: Tablet (Electrónica)
('Tablet 11" 256GB', 'Tablet de alto rendimiento para trabajo.', 550.00, 45, 0.7, 26.0, 18.0, 0.8, 'Av. Vélez Sársfield 123', 'Resistencia', 'Chaco', 'H3500ABC', 'AR'),
-- ID 11: Disco Duro Externo (Electrónica)
('Disco Duro Externo 2TB', 'Almacenamiento rápido USB 3.0.', 79.99, 150, 0.3, 12.0, 8.0, 1.5, 'Av. Vélez Sársfield 123', 'Resistencia', 'Chaco', 'H3500ABC', 'AR'),
-- ID 12: Blender (Utensilios Cocina)
('Licuadora Alta Potencia', 'Vaso de vidrio, ideal para batidos.', 75.00, 80, 3.2, 20.0, 20.0, 45.0, 'Av. 9 de Julio 789', 'Resistencia', 'Chaco', 'H3500GHI', 'AR'),
-- ID 13: Termo Inteligente (Hogar & Oficina, Liquidación)
('Termo con Sensor Temp', 'Mantiene el líquido caliente por 12h.', 35.00, 100, 0.4, 8.0, 8.0, 25.0, 'Av. 9 de Julio 789', 'Resistencia', 'Chaco', 'H3500GHI', 'AR'),
-- ID 14: Sierra Circular (Herramientas)
('Sierra Circular Profesional', 'Potencia y precisión para carpintería.', 120.00, 20, 5.5, 40.0, 30.0, 25.0, 'Calle Alvear 456', 'Resistencia', 'Chaco', 'H3500DEF', 'AR'),
-- ID 15: Router Wi-Fi 6 (Electrónica)
('Router Mesh Wi-Fi 6', 'Sistema de malla para cobertura total.', 150.00, 65, 1.0, 22.0, 15.0, 5.0, 'Av. Vélez Sársfield 123', 'Resistencia', 'Chaco', 'H3500ABC', 'AR'),
-- ID 16: Cámara Seguridad (Electrónica)
('Cámara Seguridad Exterior', 'Visión nocturna y detección de movimiento.', 45.00, 95, 0.6, 10.0, 10.0, 15.0, 'Calle Alvear 456', 'Resistencia', 'Chaco', 'H3500DEF', 'AR'),
-- ID 17: Toallas Microfibra (Hogar & Oficina)
('Set de Toallas Microfibra', 'Para limpieza del hogar, 10 unidades.', 14.50, 300, 0.3, 20.0, 15.0, 5.0, 'Av. 9 de Julio 789', 'Resistencia', 'Chaco', 'H3500GHI', 'AR'),
-- ID 18: Olla a Presión (Utensilios Cocina)
('Olla a Presión Eléctrica', 'Capacidad 6 litros, múltiples funciones.', 99.99, 35, 6.0, 32.0, 32.0, 35.0, 'Av. 9 de Julio 789', 'Resistencia', 'Chaco', 'H3500GHI', 'AR'),
-- ID 19: Candado Inteligente (Herramientas, Electrónica)
('Candado Inteligente Bluetooth', 'Se abre con huella dactilar o app.', 40.00, 55, 0.2, 8.0, 4.0, 2.0, 'Calle Alvear 456', 'Resistencia', 'Chaco', 'H3500DEF', 'AR'),
-- ID 20: Mesa Auxiliar (Hogar & Oficina)
('Mesa Auxiliar Madera', 'Mesa lateral pequeña para sala.', 65.00, 15, 7.0, 45.0, 45.0, 50.0, 'Calle Alvear 456', 'Resistencia', 'Chaco', 'H3500DEF', 'AR');


-- -----------------------------------------------------------
-- 4. CREACIÓN DE LA TABLA PIVOTE producto_categorias (AHORA SÍ)
-- -----------------------------------------------------------
CREATE TABLE producto_categorias (
    producto_id INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL,
    
    -- Clave primaria compuesta para asegurar unicidad
    CONSTRAINT "PK_producto_categorias" PRIMARY KEY (producto_id, categoria_id),
    
    -- Restricción de clave foránea a la tabla productos
    CONSTRAINT "FK_producto_categorias_producto" FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    
    -- Restricción de clave foránea a la tabla categorias
    CONSTRAINT "FK_producto_categorias_categoria" FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
);


-- -----------------------------------------------------------
-- 5. CARGA DE RELACIONES DE CATEGORÍA (DESPUÉS DE CREAR LA TABLA)
-- -----------------------------------------------------------
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES
-- ID 1: Laptop (Electrónica: 1, Liquidación: 3)
(1, 1),
(1, 3),
-- ID 2: Mouse (Electrónica: 1, Hogar & Oficina: 2)
(2, 1),
(2, 2),
-- ID 5: Cafetera (Hogar & Oficina: 2, Utensilios Cocina: 5)
(5, 2),
(5, 5),
-- ID 7: Taladro (Herramientas: 4)
(7, 4),
-- ID 19: Candado (Herramientas: 4, Electrónica: 1)
(19, 4),
(19, 1);


-- -----------------------------------------------------------
-- 6. CARGA DE IMÁGENES DE PRODUCTO
-- -----------------------------------------------------------
INSERT INTO producto_imagenes (producto_id, url, es_principal) VALUES
(1, 'https://storage.com/img/laptop_frontal.jpg', TRUE),
(1, 'https://storage.com/img/laptop_lateral.jpg', FALSE),
(5, 'https://storage.com/img/cafe_main.jpg', TRUE),
(7, 'https://storage.com/img/taladro_a.jpg', TRUE);


-- -----------------------------------------------------------
-- 7. CARGA DE RESERVA INICIAL
-- -----------------------------------------------------------
INSERT INTO reservas (id_compra, usuario_id, estado, fecha_creacion, expira_en) VALUES
(
    'COMPRA-PORTAL-001', 
    12345, 
    'PENDIENTE',
    NOW(), 
    NOW() + INTERVAL '1 day' 
);

INSERT INTO reserva_items (reserva_id, producto_id, cantidad, precio_unitario, nombre)
SELECT 
    (SELECT "idReserva" FROM reservas WHERE id_compra = 'COMPRA-PORTAL-001'),
    p.id,
    item.cantidad,
    item.precio,
    item.nombre_producto
FROM (
    VALUES
        ('Laptop Pro X', 5, 1499.99),
        ('Silla Ergonómica Mesh', 2, 149.00)
) AS item(nombre_producto, cantidad, precio) 
JOIN productos AS p 
    ON p.nombre = item.nombre_producto;