import React from 'react';

interface FilterContainerProps {
  title: string;
  onReset: () => void;
  children: React.ReactNode;
}

export function FilterContainer({ title, onReset, children }: FilterContainerProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
        >
          Limpiar filtros
        </button>
      </div>
      {children}
    </div>
  );
}
