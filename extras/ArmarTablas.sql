-- -----------------------------------------------------------
-- 1. CREACIÓN DE LA TABLA PIVOTE product_category
--    (Necesaria para que las FK en el paso 4 funcionen)
-- -----------------------------------------------------------
DROP TABLE IF EXISTS product_category;

CREATE TABLE product_category (
    product_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    
    -- Clave primaria compuesta para asegurar unicidad
    CONSTRAINT "PK_product_category" PRIMARY KEY (product_id, category_id),
    
    -- Restricción de clave foránea a la tabla products
    CONSTRAINT "FK_product_category_product" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    
    -- Restricción de clave foránea a la tabla categories
    CONSTRAINT "FK_product_category_category" FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);


-- -----------------------------------------------------------
-- 2. CARGA DE CATEGORÍAS (Los IDs serán 1, 2, 3, 4, 5 automáticamente)
-- -----------------------------------------------------------
INSERT INTO categories (name, description) VALUES
('Electronics', 'Dispositivos electrónicos y accesorios.'),              -- ID 1
('Home & Office', 'Artículos para el hogar y la oficina.'),                -- ID 2
('Clearance', 'Productos con descuento o en liquidación.'),                -- ID 3
('Tools', 'Herramientas manuales y eléctricas.'),                          -- ID 4
('Kitchenware', 'Utensilios y aparatos de cocina.');                       -- ID 5


-- -----------------------------------------------------------
-- 3. CARGA DE PRODUCTOS (20 unidades)
-- -----------------------------------------------------------
INSERT INTO products (
    name, description, unit_price, available_stock, weight_kg, 
    "dimensionsLength_cm", "dimensionsWidth_cm", "dimensionsHeight_cm", 
    "locationWarehouse_id", "locationAisle", "locationShelf", "locationLevel"
) VALUES
-- ID 1: Laptop (Electronics, Clearance)
('Laptop Pro X', 'Portátil potente M3.', 1499.99, 50, 1.85, 35.5, 24.5, 1.7, 1, 'A', 'R3', 2), 
-- ID 2: Mouse (Electronics, Home & Office)
('Mouse Inalámbrico Silent', 'Mouse ergonómico silencioso.', 25.50, 120, 0.15, 10.0, 6.0, 3.0, 1, 'A', 'R1', 1),
-- ID 3: Monitor (Electronics)
('Monitor Curvo 32"', 'Monitor 4K curvo para gaming y diseño.', 499.00, 30, 8.5, 75.0, 15.0, 45.0, 2, 'C', 'S5', 3),
-- ID 4: Teclado (Electronics, Clearance)
('Teclado Mecánico RGB', 'Teclado gamer con switches táctiles.', 89.99, 75, 1.2, 45.0, 15.0, 4.0, 1, 'A', 'R2', 1),
-- ID 5: Cafetera (Home & Office, Kitchenware)
('Cafetera Espresso Automática', 'Prepara espresso, capuchino y más.', 199.50, 40, 4.0, 30.0, 20.0, 40.0, 3, 'B', 'K1', 4),
-- ID 6: Silla Oficina (Home & Office)
('Silla Ergonómica Mesh', 'Silla de oficina con soporte lumbar ajustable.', 149.00, 25, 15.0, 60.0, 60.0, 120.0, 2, 'D', 'O2', 1),
-- ID 7: Taladro Percutor (Tools)
('Taladro Percutor 850W', 'Herramienta eléctrica de alto rendimiento.', 59.90, 90, 2.5, 30.0, 8.0, 25.0, 3, 'E', 'T1', 2),
-- ID 8: Set Destornilladores (Tools)
('Set Destornilladores Precision', '50 piezas para electrónica y hogar.', 19.99, 200, 0.5, 25.0, 15.0, 5.0, 3, 'E', 'T1', 1),
-- ID 9: Aspiradora Robot (Home & Office)
('Aspiradora Robot con Mapeo', 'Limpia automáticamente con tecnología LiDAR.', 350.00, 60, 3.8, 33.0, 33.0, 8.0, 2, 'C', 'S4', 3),
-- ID 10: Tablet (Electronics)
('Tablet 11" 256GB', 'Tablet de alto rendimiento para trabajo.', 550.00, 45, 0.7, 26.0, 18.0, 0.8, 1, 'A', 'R4', 3),
-- ID 11: Disco Duro Externo (Electronics)
('Disco Duro Externo 2TB', 'Almacenamiento rápido USB 3.0.', 79.99, 150, 0.3, 12.0, 8.0, 1.5, 1, 'A', 'R1', 2),
-- ID 12: Blender (Kitchenware)
('Licuadora Alta Potencia', 'Vaso de vidrio, ideal para batidos.', 75.00, 80, 3.2, 20.0, 20.0, 45.0, 3, 'B', 'K2', 4),
-- ID 13: Termo Inteligente (Home & Office, Clearance)
('Termo con Sensor Temp', 'Mantiene el líquido caliente por 12h.', 35.00, 100, 0.4, 8.0, 8.0, 25.0, 3, 'D', 'O3', 2),
-- ID 14: Sierra Circular (Tools)
('Sierra Circular Profesional', 'Potencia y precisión para carpintería.', 120.00, 20, 5.5, 40.0, 30.0, 25.0, 2, 'E', 'T2', 3),
-- ID 15: Router Wi-Fi 6 (Electronics)
('Router Mesh Wi-Fi 6', 'Sistema de malla para cobertura total.', 150.00, 65, 1.0, 22.0, 15.0, 5.0, 1, 'A', 'R4', 4),
-- ID 16: Cámara Seguridad (Electronics)
('Cámara Seguridad Exterior', 'Visión nocturna y detección de movimiento.', 45.00, 95, 0.6, 10.0, 10.0, 15.0, 2, 'C', 'S5', 4),
-- ID 17: Toallas Microfibra (Home & Office)
('Set de Toallas Microfibra', 'Para limpieza del hogar, 10 unidades.', 14.50, 300, 0.3, 20.0, 15.0, 5.0, 3, 'D', 'O1', 1),
-- ID 18: Olla a Presión (Kitchenware)
('Olla a Presión Eléctrica', 'Capacidad 6 litros, múltiples funciones.', 99.99, 35, 6.0, 32.0, 32.0, 35.0, 3, 'B', 'K3', 4),
-- ID 19: Candado Inteligente (Tools, Electronics)
('Candado Inteligente Bluetooth', 'Se abre con huella dactilar o app.', 40.00, 55, 0.2, 8.0, 4.0, 2.0, 2, 'E', 'T3', 1),
-- ID 20: Mesa Auxiliar (Home & Office)
('Mesa Auxiliar Madera', 'Mesa lateral pequeña para sala.', 65.00, 15, 7.0, 45.0, 45.0, 50.0, 2, 'D', 'O4', 2);


-- -----------------------------------------------------------
-- 4. CARGA DE RELACIONES DE CATEGORÍA (Tabla Muchos-a-Muchos: product_category)
-- -----------------------------------------------------------
INSERT INTO product_category (product_id, category_id) VALUES
-- ID 1: Laptop (Electronics: 1, Clearance: 3)
((SELECT id FROM products WHERE name = 'Laptop Pro X'), (SELECT id FROM categories WHERE name = 'Electronics')),
((SELECT id FROM products WHERE name = 'Laptop Pro X'), (SELECT id FROM categories WHERE name = 'Clearance')),
-- ID 2: Mouse (Electronics: 1, Home & Office: 2)
((SELECT id FROM products WHERE name = 'Mouse Inalámbrico Silent'), (SELECT id FROM categories WHERE name = 'Electronics')),
((SELECT id FROM products WHERE name = 'Mouse Inalámbrico Silent'), (SELECT id FROM categories WHERE name = 'Home & Office')),
-- ID 5: Cafetera (Home & Office: 2, Kitchenware: 5)
((SELECT id FROM products WHERE name = 'Cafetera Espresso Automática'), (SELECT id FROM categories WHERE name = 'Home & Office')),
((SELECT id FROM products WHERE name = 'Cafetera Espresso Automática'), (SELECT id FROM categories WHERE name = 'Kitchenware')),
-- ID 7: Taladro (Tools: 4)
((SELECT id FROM products WHERE name = 'Taladro Percutor 850W'), (SELECT id FROM categories WHERE name = 'Tools')),
-- ID 19: Candado (Tools: 4, Electronics: 1)
((SELECT id FROM products WHERE name = 'Candado Inteligente Bluetooth'), (SELECT id FROM categories WHERE name = 'Tools')),
((SELECT id FROM products WHERE name = 'Candado Inteligente Bluetooth'), (SELECT id FROM categories WHERE name = 'Electronics'));


-- -----------------------------------------------------------
-- 5. CARGA DE IMÁGENES DE PRODUCTO (Se usan los IDs autogenerados)
-- -----------------------------------------------------------
INSERT INTO product_images (product_id, url, is_main) VALUES
((SELECT id FROM products WHERE name = 'Laptop Pro X'), 'https://storage.com/img/laptop_frontal.jpg', TRUE),
((SELECT id FROM products WHERE name = 'Laptop Pro X'), 'https://storage.com/img/laptop_lateral.jpg', FALSE),
((SELECT id FROM products WHERE name = 'Cafetera Espresso Automática'), 'https://storage.com/img/cafe_main.jpg', TRUE),
((SELECT id FROM products WHERE name = 'Taladro Percutor 850W'), 'https://storage.com/img/taladro_a.jpg', TRUE);


-- -----------------------------------------------------------
-- 6. CARGA DE RESERVA INICIAL (Se reserva stock de 2 productos)
-- -----------------------------------------------------------
INSERT INTO reservations (purchase_id, user_id, state, created_at, expires_at) VALUES
(
    'COMPRA-PORTAL-001', 
    '12345', 
    'PENDING', 
    NOW(), 
    NOW() + INTERVAL '1 day' 
);

INSERT INTO reservation_items (reservation_id, product_id, quantity, unit_price, name)
SELECT 
    (SELECT id FROM reservations WHERE purchase_id = 'COMPRA-PORTAL-001'), -- ID de la reserva (FK)
    p.id,                                                                -- ID del Producto (FK)
    item.cantidad,                                                       -- Cantidad
    item.precio,                                                         -- Precio 'congelado' (unit_price_at_reservation)
    item.nombre_producto                                                 -- Nombre del producto (para la columna 'name')
FROM (
    -- Genera las filas de datos
    VALUES
        ('Laptop Pro X', 5, 1499.99),
        ('Silla Ergonómica Mesh', 2, 149.00)
) AS item(nombre_producto, cantidad, precio) 
JOIN products AS p 
    ON p.name = item.nombre_producto;








