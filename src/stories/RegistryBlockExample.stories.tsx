import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RegistryBlock } from '../components/ui/registry-block';
import { Button } from '../components/ui/button';

const meta: Meta<typeof RegistryBlock> = {
  title: 'Examples/RegistryBlockExample',
  component: RegistryBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RegistryBlock>;

const RegistryBlockContent = () => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">Lectura de Contador</h3>
        <p className="text-sm text-gray-600">Contador principal de entrada</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Lectura
          </label>
          <div className="text-sm border border-gray-200 rounded-md p-2 bg-gray-50">
            12/05/2023
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lectura (m³)
          </label>
          <div className="text-sm border border-gray-200 rounded-md p-2 bg-gray-50">
            1,234.5
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Observaciones
        </label>
        <div className="text-sm border border-gray-200 rounded-md p-2 bg-gray-50 min-h-[60px]">
          Lectura realizada en condiciones normales. No se observan anomalías en el contador.
        </div>
      </div>
      
      <div className="pt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm">Editar</Button>
        <Button variant="default" size="sm">Ver Detalles</Button>
      </div>
    </div>
  );
};

export const RegistryExample: Story = {
  render: () => (
    <RegistryBlock variant="default" size="default" className="max-w-md">
      <RegistryBlockContent />
    </RegistryBlock>
  ),
};