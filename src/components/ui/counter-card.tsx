// Reusable counter card component for displaying water meter readings
// Shows user info, consumption, last reading date and alerts for high usage or overdue readings

'use client';

import { AlertTriangle } from 'lucide-react';

export interface CounterData {
  id: number;
  nombre: string;
  apellidos?: string;
  zona: string;
  ultimaLectura: string; // Format: YYYY-MM-DD or DD/MM/YY
  lecturaAnterior: number; // In m³
  ultimoConsumo?: number; // In L (for registros page compatibility)
  consumoAnomalo?: boolean; // For registros page compatibility
  personasRegistradas?: number;
  apodo?: string;
}

interface CounterCardProps {
  counter: CounterData;
  onClick: (counter: CounterData) => void;
  showConsumption?: boolean; // Whether to show consumption in L or last reading
  dateFormat?: 'natural' | 'short'; // Date format preference
}

export function CounterCard({ 
  counter, 
  onClick, 
  showConsumption = true,
  dateFormat = 'natural' 
}: CounterCardProps) {
  const diasSinLectura = Math.ceil((new Date().getTime() - new Date(counter.ultimaLectura).getTime()) / (1000 * 60 * 60 * 24));
  const consumoEnLitros = showConsumption ? (counter.ultimoConsumo || counter.lecturaAnterior * 1000) : 0;
  const tieneConsumoAlto = consumoEnLitros > 200000;
  const tieneDiasExcesivos = diasSinLectura > 90;

  // Helper function to format date naturally
  const formatNaturalDate = (dateString: string) => {
    let date: Date;
    
    // Handle different date formats
    if (dateString.includes('/')) {
      // Format: DD/MM/YY
      const [day, month, year] = dateString.split('/');
      const fullYear = year.length === 2 ? '20' + year : year;
      date = new Date(parseInt(fullYear), parseInt(month) - 1, parseInt(day));
    } else {
      // Format: YYYY-MM-DD
      const [year, month, day] = dateString.split('-');
      date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: dateFormat === 'natural' ? 'long' : 'short',
      year: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  };

  const displayName = counter.apellidos ? 
    `${counter.nombre} ${counter.apellidos}` : 
    counter.nombre;

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onClick(counter)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">
              {displayName}
            </h3>
            {(tieneConsumoAlto || counter.consumoAnomalo) && (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            )}
          </div>
          <p className="text-sm text-gray-600">
            {formatNaturalDate(counter.ultimaLectura)} • <span className={`font-medium ${tieneDiasExcesivos ? 'text-red-600' : 'text-gray-600'}`}>{diasSinLectura} días</span>
          </p>
          {showConsumption && (
            <p className="text-sm text-gray-600 mb-1">
              {consumoEnLitros.toLocaleString('es-ES', { 
                minimumFractionDigits: 1, 
                maximumFractionDigits: 1 
              })} L
            </p>
          )}
          <p className="text-sm text-gray-500">
            {counter.zona}
          </p>
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}