'use client';

import { Button } from '@/components/ui/button';
import { X, Check } from 'lucide-react';

interface FormHeaderProps {
  tipoRegistro: string;
  onCancel: () => void;
  onSave: () => void;
  canSave: boolean;
  isLoading?: boolean;
}

export function FormHeader({ 
  tipoRegistro, 
  onCancel, 
  onSave, 
  canSave, 
  isLoading = false 
}: FormHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Botón Cancelar */}
        <Button
          variant="destructive"
          size="sm"
          onClick={onCancel}
          className="px-3"
          disabled={isLoading}
        >
          Cancelar
        </Button>

        {/* Tipo de Registro */}
        <div className="text-center">
          <h1 className="text-sm font-medium text-gray-900">
            Nuevo {tipoRegistro}
          </h1>
        </div>

        {/* Botón Guardar */}
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          disabled={!canSave || isLoading}
          className="px-3"
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </div>
  );
}