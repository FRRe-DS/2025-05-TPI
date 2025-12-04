import React from 'react';

export const LightweightStockNode = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Definimos las animaciones CSS aquí mismo para no ensuciar tu tailwind config */}
      <style>{`
        @keyframes float-node {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-ring-1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-ring-2 {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-core {
          0%, 100% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 50px rgba(79, 70, 229, 0.6); }
          50% { transform: scale(1.05); opacity: 1; box-shadow: 0 0 80px rgba(99, 102, 241, 0.8); }
        }
      `}</style>

      {/* Contenedor Principal con animación de flotación */}
      <div 
        className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center"
        style={{ animation: 'float-node 6s ease-in-out infinite' }}
      >
        
        {/* 1. Resplandor de Fondo (Atmósfera) */}
        <div className="absolute inset-0 bg-indigo-600/10 rounded-full blur-[80px] animate-pulse" />

        {/* 2. Anillo Exterior (Orbita Lenta) */}
        <div 
          className="absolute w-full h-full border border-indigo-500/20 rounded-full border-dashed"
          style={{ animation: 'spin-ring-1 60s linear infinite' }}
        >
           {/* Pequeño satélite en el anillo */}
           <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]" />
        </div>

        {/* 3. Anillo Medio (Orbita Media Inversa) */}
        <div 
          className="absolute w-[70%] h-[70%] border border-indigo-400/30 rounded-full"
          style={{ 
            animation: 'spin-ring-2 40s linear infinite',
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent'
          }}
        />

        {/* 4. Anillo Interior (Rápido) */}
        <div 
          className="absolute w-[50%] h-[50%] border-2 border-indigo-300/10 rounded-full border-dotted"
          style={{ animation: 'spin-ring-1 20s linear infinite' }}
        />

        {/* 5. NÚCLEO CENTRAL (El "Nodo") */}
        <div 
          className="relative w-[30%] h-[30%] rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center backdrop-blur-md border border-white/10 z-10"
          style={{ animation: 'pulse-core 4s ease-in-out infinite' }}
        >
           {/* Detalle interno del núcleo */}
           <div className="w-[60%] h-[60%] bg-indigo-950 rounded-full flex items-center justify-center border border-indigo-500/50">
              <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_20px_white]" />
           </div>
        </div>

      </div>
    </div>
  );
};