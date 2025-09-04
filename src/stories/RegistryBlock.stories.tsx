import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RegistryBlock } from '../components/ui/registry-block';

const meta: Meta<typeof RegistryBlock> = {
  title: 'UI/RegistryBlock',
  component: RegistryBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RegistryBlock>;

export const Default: Story = {
  args: {
    children: 'Este es un bloque de registro',
    variant: 'default',
    size: 'default',
    className: 'max-w-md',
  },
};

export const Small: Story = {
  args: {
    children: 'Este es un bloque de registro pequeño',
    variant: 'default',
    size: 'sm',
    className: 'max-w-md',
  },
};

export const Large: Story = {
  args: {
    children: 'Este es un bloque de registro grande',
    variant: 'default',
    size: 'lg',
    className: 'max-w-md',
  },
};

export const WithContent: Story = {
  render: () => (
    <RegistryBlock variant="default" size="default" className="max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-2">Título del Bloque de Registro</h3>
        <p className="text-sm text-gray-600">Este es un bloque de registro con contenido personalizado.</p>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">ID de Registro:</span>
            <span className="text-sm">REG-001</span>
          </div>
        </div>
      </div>
    </RegistryBlock>
  ),
};