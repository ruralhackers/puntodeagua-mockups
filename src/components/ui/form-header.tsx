'use client';

import { Button, CancelButton } from '@/components/ui/button';
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
        <CancelButton
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </CancelButton>

        {/* Espacio central vacío */}
        <div className="text-center">
          {/* El título se eliminó y se mostrará directamente en la página */}
        </div>

        {/* Botón Guardar */}
        <Button
          variant="default"
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