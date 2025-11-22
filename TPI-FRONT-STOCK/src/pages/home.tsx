import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { StockNode3D } from '../components/common/ui/StockNode3D';
import { Server, Database, Terminal, ArrowRight, Box, Calendar } from 'lucide-react';

// --- COMPONENTE UI: BLOQUE DE CÓDIGO ---
const CodeBlock = ({ title, code, language = "json" }: { title: string, code: string, language?: string }) => (
  <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-slate-800 shadow-2xl my-4 group">
    <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
        <span className="ml-2 text-xs font-mono text-slate-500">{title}</span>
      </div>
      <span className="text-xs text-slate-600 font-mono uppercase">{language}</span>
    </div>
    <div className="p-4 overflow-x-auto">
      <pre className="font-mono text-sm leading-relaxed">
        <code className="text-slate-300">
          {code.split('\n').map((line, i) => (
            <div key={i} className="table-row">
              <span className="table-cell text-slate-700 select-none text-right pr-4 w-8">{i + 1}</span>
              <span className="table-cell" dangerouslySetInnerHTML={{ 
                __html: line
                  .replace(/"(.*?)":/g, '<span class="text-indigo-400">"$1"</span>:') // Keys
                  .replace(/: "(.*?)"/g, ': <span class="text-green-400">"$1"</span>') // String Values
                  .replace(/: ([0-9]+)/g, ': <span class="text-orange-400">$1</span>') // Number Values
                  .replace(/: (true|false)/g, ': <span class="text-red-400">$1</span>') // Booleans
              }} />
            </div>
          ))}
        </code>
      </pre>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      
      {/* --- FONDO FIJO 3D (Fixed para que se mantenga al scrollear) --- */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Suspense fallback={null}>
            <StockNode3D />
            <Environment preset="city" />
          </Suspense>
          <ContactShadows resolution={512} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
        </Canvas>
      </div>

      {/* --- CONTENIDO SCROLLEABLE --- */}
      <div className="relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center container mx-auto px-6 pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium tracking-wider text-indigo-300 uppercase bg-indigo-950/50 rounded-full border border-indigo-800 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              API v1.0 Online
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Infraestructura de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Stock Centralizado
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              API de alto rendimiento diseñada para la integración seamless con los equipos de 
              <strong className="text-slate-200"> Compras</strong> y <strong className="text-slate-200">Logística</strong>. 
              Gestiona inventario, precios y reservas en tiempo real.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
              >
                <Terminal className="w-5 h-5" />
                Ver Documentación
              </button>
              
              <button 
                onClick={() => navigate('/productos')}
                className="px-8 py-4 bg-indigo-600/20 text-indigo-300 border border-indigo-500/50 rounded-lg font-bold hover:bg-indigo-600/30 transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                <Database className="w-5 h-5" />
                Ir al Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 2. DOCUMENTATION SECTION */}
        <section id="docs" className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 py-24">
          <div className="container mx-auto px-6">
            
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Server className="text-indigo-400" />
                Información de Conexión
              </h2>
              <p className="text-slate-400 max-w-2xl">
                Utiliza estos parámetros base para configurar tus clientes HTTP. 
                El servidor corre en un contenedor Docker aislado.
              </p>
            </div>

            {/* Grid de Info Básica */}
            <div className="grid md:grid-cols-3 gap-6 mb-24">
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-mono text-slate-500 uppercase mb-2">Base URL</div>
                <div className="font-mono text-indigo-300 text-lg">http://localhost:8000/v1</div>
              </div>
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-mono text-slate-500 uppercase mb-2">Health Check</div>
                <div className="font-mono text-green-400 text-lg">GET /</div>
              </div>
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-mono text-slate-500 uppercase mb-2">Auth</div>
                <div className="font-mono text-slate-300 text-lg">Bearer Token (Optional)</div>
              </div>
            </div>

            {/* --- ENDPOINT: PRODUCTOS --- */}
            <div className="grid lg:grid-cols-2 gap-12 mb-32 items-start">
              <div>
                <div className="inline-flex items-center gap-2 text-indigo-400 mb-4 font-mono text-sm">
                  <Box className="w-4 h-4" />
                  PRODUCTOS
                </div>
                <h3 className="text-2xl font-bold mb-4">Consultar Catálogo</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Endpoint principal para <strong>Logística</strong> y <strong>Compras</strong>. 
                  Devuelve la lista completa de productos con su stock actual en tiempo real.
                  Utiliza este endpoint para verificar disponibilidad antes de confirmar órdenes.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-bold">GET</span>
                    <code className="bg-slate-800 px-2 py-1 rounded">/productos</code>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-bold">GET</span>
                    <code className="bg-slate-800 px-2 py-1 rounded">/productos/:id</code>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs font-bold">PATCH</span>
                    <code className="bg-slate-800 px-2 py-1 rounded">/productos/:id</code>
                    <span className="text-slate-500 text-xs">(Actualizar Stock)</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
                <CodeBlock 
                  title="Response Example (200 OK)" 
                  code={`[
  {
    "id": 1,
    "nombre": "Laptop Pro X",
    "descripcion": "Workstation portátil",
    "precio": 1200.00,
    "stock_disponible": 50,
    "categorias": [
      { "id": 1, "name": "Electronica" }
    ]
  }
]`} 
                />
              </div>
            </div>

            {/* --- ENDPOINT: RESERVAS --- */}
            <div className="grid lg:grid-cols-2 gap-12 mb-24 items-start">
              <div className="lg:order-2">
                <div className="inline-flex items-center gap-2 text-pink-400 mb-4 font-mono text-sm">
                  <Calendar className="w-4 h-4" />
                  RESERVAS
                </div>
                <h3 className="text-2xl font-bold mb-4">Gestión de Reservas</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Permite al grupo de <strong>Compras</strong> bloquear stock para clientes específicos.
                  Al crear una reserva, el <code>stock_disponible</code> del producto se reduce automáticamente.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs font-bold">POST</span>
                    <code className="bg-slate-800 px-2 py-1 rounded">/reservas</code>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-bold">GET</span>
                    <code className="bg-slate-800 px-2 py-1 rounded">/reservas?userId=1</code>
                  </div>
                </div>
              </div>

              <div className="lg:order-1 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-20"></div>
                <CodeBlock 
                  title="POST Body Payload" 
                  code={`{
  "fecha": "2025-11-22",
  "usuarioId": 1,
  "items": [
    {
      "productoId": 1,
      "cantidad": 5
    }
  ]
}`} 
                />
              </div>
            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-slate-950 border-t border-slate-900 py-12 text-center">
          <p className="text-slate-600 text-sm">
            &copy; 2025 Grupo 5 - Desarrollo de Software UTN.
          </p>
        </footer>

      </div>
    </div>
  );
};

export default Home;