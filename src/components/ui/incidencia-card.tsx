import React from 'react';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

export interface IncidenciaCardProps {
  id: number;
  titulo: string;
  ubicacion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  fecha: string;
  onClick?: () => void;
  onDelete?: (id: number) => void;
  className?: string;
}

export function IncidenciaCard({
  id,
  titulo,
  ubicacion,
  prioridad,
  fecha,
  onClick,
  onDelete,
  className,
}: IncidenciaCardProps) {
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
        "p-3 bg-orange-50 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer shadow-sm",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                Incidencia
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${getPrioridadColor(prioridad)}`}>
                {prioridad}
              </span>
            </div>
            {onDelete && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <h3 className="font-medium text-sm text-gray-900">{titulo}</h3>
          <p className="text-xs text-gray-600 mt-1">{ubicacion}</p>
          <p className="text-xs text-gray-500 mt-1">Fecha: {fecha}</p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <span className="text-xs text-blue-600 cursor-pointer hover:text-blue-800">
          Ver Incidencia
        </span>
      </div>
    </div>
  );
}