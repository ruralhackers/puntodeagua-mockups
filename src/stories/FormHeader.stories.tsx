import type { Meta, StoryObj } from '@storybook/react';
import { FormHeader } from '../components/ui/form-header';

const meta: Meta<typeof FormHeader> = {
  title: 'UI/FormHeader',
  component: FormHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tipoRegistro: {
      control: 'text',
    },
    canSave: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormHeader>;

export const Default: Story = {
  args: {
    tipoRegistro: 'Registro',
    canSave: true,
    isLoading: false,
    onCancel: () => console.log('Cancelado'),
    onSave: () => console.log('Guardado'),
  },
};

export const Loading: Story = {
  args: {
    tipoRegistro: 'Registro',
    canSave: true,
    isLoading: true,
    onCancel: () => console.log('Cancelado'),
    onSave: () => console.log('Guardado'),
  },
};

export const DisabledSave: Story = {
  args: {
    tipoRegistro: 'Registro',
    canSave: false,
    isLoading: false,
    onCancel: () => console.log('Cancelado'),
    onSave: () => console.log('Guardado'),
  },
};

export const SpecificType: Story = {
  args: {
    tipoRegistro: 'Análisis de Cloro',
    canSave: true,
    isLoading: false,
    onCancel: () => console.log('Cancelado'),
    onSave: () => console.log('Guardado'),
  },
};