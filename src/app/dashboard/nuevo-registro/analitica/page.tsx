'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function NuevoAnaliticaPage() {
  const router = useRouter();
  const [subtipoSeleccionado, setSubtipoSeleccionado] = useState('');

  const subtiposAnalitica = [
    { value: 'cloro-ph', label: 'Cloro y pH (por usuario)' },
    { value: 'turbidez', label: 'Turbidez (por usuario)' },
    { value: 'dureza', label: 'Dureza (por laboratorio)' },
    { value: 'completa', label: 'Completa (por laboratorio)' }
  ];

  const handleContinuar = () => {
    if (subtipoSeleccionado) {
      router.push(`/dashboard/nuevo-registro/analitica/${subtipoSeleccionado}`);
    }
  };

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold">Nuevo Registro de Analítica</h1>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Analítica
          </label>
          <select 
            value={subtipoSeleccionado} 
            onChange={(e) => setSubtipoSeleccionado(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecciona el tipo de analítica</option>
            {subtiposAnalitica.map((subtipo) => (
              <option key={subtipo.value} value={subtipo.value}>
                {subtipo.label}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleContinuar}
          disabled={!subtipoSeleccionado}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}