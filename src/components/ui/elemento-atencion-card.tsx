import React from 'react';
import { cn } from '@/lib/utils';

export interface ElementoAtencionCardProps {
  tipo: 'incidencia' | 'recordatorio' | 'tarea';
  titulo: string;
  ubicacion?: string;
  fechaVencimiento?: string;
  subtipo?: string;
  onClick?: () => void;
  className?: string;
}

export function ElementoAtencionCard({
  tipo,
  titulo,
  ubicacion,
  fechaVencimiento,
  subtipo,
  onClick,
  className,
}: ElementoAtencionCardProps) {
  return (
    <div 
      className={cn(
        `p-3 ${tipo === 'incidencia' ? 'bg-orange-50' : 'bg-white'} border border-gray-200 rounded-md hover:bg-gray-50 transition-colors shadow-sm cursor-pointer`,
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-1 text-xs rounded-full ${
              tipo === 'incidencia' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
            }`}>
              {tipo === 'incidencia' ? 'Incidencia' : tipo === 'recordatorio' ? 'Recordatorio Vencido' : 'Tarea Vencida'}
            </span>
            {tipo === 'tarea' && subtipo && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {subtipo}
              </span>
            )}
          </div>
          <h3 className="font-medium text-sm text-gray-900">{titulo}</h3>
          <p className="text-xs text-gray-600 mt-1">
            {tipo === 'incidencia' ? 
              (ubicacion || '') : 
              (fechaVencimiento ? `Vencía: ${fechaVencimiento}` : '')
            }
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span 
          className="text-xs text-blue-600 cursor-pointer hover:text-blue-800 ml-auto"
        >
          {tipo === 'incidencia' ? 'Ver Incidencia' : 'Añadir Registro'}
        </span>
      </div>
    </div>
  );
}