import React from 'react';
import { cn } from '@/lib/utils';

export interface IncidenciaListItemProps {
  id: number;
  titulo: string;
  tipo: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  estado: 'Reportada' | 'En Proceso' | 'Resuelta';
  puntoAgua: string;
  fechaReporte: string;
  onClick?: () => void;
  className?: string;
}

export function IncidenciaListItem({
  id,
  titulo,
  tipo,
  prioridad,
  estado,
  puntoAgua,
  fechaReporte,
  onClick,
  className,
}: IncidenciaListItemProps) {
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Reportada':
        return 'bg-yellow-100 text-yellow-800';
      case 'En Proceso':
        return 'bg-blue-100 text-blue-800';
      case 'Resuelta':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'Alta':
        return 'bg-red-100 text-red-800';
      case 'Media':
        return 'bg-yellow-100 text-yellow-800';
      case 'Baja':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className={cn(
        "p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer shadow-sm",
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div>
          <h3 className="font-medium text-gray-900">{titulo}</h3>
          <p className="text-sm text-gray-600">{puntoAgua}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-1 text-xs rounded-full ${getEstadoColor(estado)}`}>
            {estado}
          </span>
          <span className={`px-2 py-1 text-xs rounded-full ${getPrioridadColor(prioridad)}`}>
            {prioridad}
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            {tipo}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>ID: {id}</span>
        <span>Reportada: {fechaReporte}</span>
      </div>
    </div>
  );
}