-- Roles para los 3 módulos (RECUERDA cambiar las contraseñas)
CREATE ROLE api_stock_logistica WITH LOGIN PASSWORD 's2acBlY734qf';
CREATE ROLE api_stock_compras_g7 WITH LOGIN PASSWORD '9tt3VvgtQ9oa';
CREATE ROLE api_stock_compras_g13 WITH LOGIN PASSWORD 'eC2Ro0k7w1Z8';


-- Logistica
-- 1. Control Total sobre su propio esquema ('logistica')
GRANT USAGE ON SCHEMA logistica TO api_stock_logistica;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA logistica TO api_stock_logistica;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA logistica TO api_stock_logistica;
-- Permisos para objetos FUTUROS (vital para migraciones de Django)
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA logistica GRANT ALL ON TABLES TO api_stock_logistica;

-- 2. Lectura (SELECT) sobre Stock y Compras
GRANT USAGE ON SCHEMA public, compras_grupo7, compras_grupo13 TO api_stock_logistica;
GRANT SELECT ON TABLE public.productos, public.reservas TO api_stock_logistica;
GRANT SELECT ON ALL TABLES IN SCHEMA compras_grupo7 TO api_stock_logistica;
GRANT SELECT ON ALL TABLES IN SCHEMA compras_grupo13 TO api_stock_logistica;

-- 3. Actualizacion (UPDATE) sobre stock
GRANT UPDATE ON TABLE public.reservas TO api_stock_logistica;



-- Compras g7
-- A. Control Total sobre su propio esquema (compras_grupo7)
GRANT USAGE ON SCHEMA compras_grupo7 TO api_stock_compras_g7;

-- Permisos sobre objetos existentes
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA compras_grupo7 TO api_stock_compras_g7;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA compras_grupo7 TO api_stock_compras_g7;

-- Permisos sobre objetos FUTUROS que cree (CRÍTICO para migraciones)
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA compras_grupo7
    GRANT ALL ON TABLES TO api_stock_compras_g7;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA compras_grupo7
    GRANT ALL ON SEQUENCES TO api_stock_compras_g7;

-- B. Permisos para el flujo de Stock (Esquema public)
GRANT USAGE ON SCHEMA public TO api_stock_compras_g7; -- Necesario para acceder a tablas
GRANT INSERT ON TABLE public.reservas TO api_stock_compras_g7; -- Insertar nuevas reservas
GRANT UPDATE ON TABLE public.productos TO api_stock_compras_g7; -- Descontar stock (UPDATE)
GRANT SELECT ON TABLE public.productos TO api_stock_compras_g7; -- Listar productos



--compras g13
-- A. Control Total sobre su propio esquema (compras_grupo13)
GRANT USAGE ON SCHEMA compras_grupo13 TO api_stock_compras_g13;

-- Permisos sobre objetos existentes
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA compras_grupo13 TO api_stock_compras_g13;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA compras_grupo13 TO api_stock_compras_g13;

-- Permisos sobre objetos FUTUROS que cree (CRÍTICO para migraciones)
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA compras_grupo13
    GRANT ALL ON TABLES TO api_stock_compras_g13;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA compras_grupo13
    GRANT ALL ON SEQUENCES TO api_stock_compras_g13;

-- B. Permisos para el flujo de Stock (Esquema public)
GRANT USAGE ON SCHEMA public TO api_stock_compras_g13; -- Necesario para acceder a tablas
GRANT INSERT ON TABLE public.reservas TO api_stock_compras_g13; -- Insertar nuevas reservas
GRANT UPDATE ON TABLE public.productos TO api_stock_compras_g13; -- Descontar stock (UPDATE)
GRANT SELECT ON TABLE public.productos TO api_stock_compras_g13; -- Listar productos