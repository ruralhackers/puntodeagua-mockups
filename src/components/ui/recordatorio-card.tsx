import React from 'react';
import { cn } from '@/lib/utils';

export interface RecordatorioCardProps {
  titulo: string;
  tipoRegistro: 'contador' | 'analitica' | 'mantenimiento';
  fecha: string;
  periodicidad: string;
  onClick?: () => void;
  className?: string;
}

export function RecordatorioCard({
  titulo,
  tipoRegistro,
  fecha,
  periodicidad,
  onClick,
  className,
}: RecordatorioCardProps) {
  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'contador':
        return 'bg-purple-100 text-purple-800';
      case 'analitica':
        return 'bg-green-100 text-green-800';
      case 'mantenimiento':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'contador':
        return 'Contadores';
      case 'analitica':
        return 'Análisis';
      case 'mantenimiento':
        return 'Mantenimiento';
      default:
        return tipo;
    }
  };

  return (
    <button
      className={cn(
        "w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm",
        className
      )}
      onClick={onClick}
    >
      <div>
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getTipoColor(tipoRegistro)}`}>
              {getTipoLabel(tipoRegistro)}
            </span>
          </div>
          <h4 className="font-medium text-sm text-gray-900">{titulo}</h4>
          <p className="text-xs text-gray-600 mt-1">
            {periodicidad}
          </p>
        </div>
        <div className="text-right">
          <span className="text-blue-600 text-xs font-medium">
            Añadir Registro
          </span>
        </div>
      </div>
    </button>
  );
}