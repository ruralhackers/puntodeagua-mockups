import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/ui/input';
import { Search, Mail, Lock } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    className: 'w-[300px]',
    placeholder: 'Ingrese texto',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2 w-[300px]">
      <label className="text-sm font-medium">Nombre</label>
      <Input {...args} placeholder="Ingrese su nombre" />
    </div>
  ),
};

export const Email: Story = {
  args: {
    className: 'w-[300px]',
    type: 'email',
    placeholder: 'Ingrese su email',
  },
};

export const Password: Story = {
  args: {
    className: 'w-[300px]',
    type: 'password',
    placeholder: 'Ingrese su contraseña',
  },
};

export const Disabled: Story = {
  args: {
    className: 'w-[300px]',
    disabled: true,
    placeholder: 'Input deshabilitado',
    value: 'Valor no editable',
  },
};

export const WithIconBefore: Story = {
  render: (args) => (
    <div className="relative w-[300px]">
      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input {...args} className="pl-10" placeholder="Ingrese su email" />
    </div>
  ),
};

export const WithIconAfter: Story = {
  render: (args) => (
    <div className="relative w-[300px]">
      <Input {...args} className="pr-10" placeholder="Buscar..." />
      <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
    </div>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <div className="space-y-2 w-[300px]">
      <label className="text-sm font-medium">Contraseña</label>
      <Input 
        {...args} 
        type="password" 
        placeholder="Ingrese su contraseña" 
        className="border-red-500 focus-visible:ring-red-500/20" 
      />
      <p className="text-xs text-red-500">La contraseña debe tener al menos 8 caracteres</p>
    </div>
  ),
};