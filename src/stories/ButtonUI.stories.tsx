import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/button';
import { ArrowRight, Plus, Save } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Eliminar',
    variant: 'destructive',
    size: 'default',
  },
};

export const Outline: Story = {
  args: {
    children: 'Cancelar',
    variant: 'outline',
    size: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secundario',
    variant: 'secondary',
    size: 'default',
  },
};

export const Small: Story = {
  args: {
    children: 'Pequeño',
    variant: 'default',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Grande',
    variant: 'default',
    size: 'lg',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Continuar <ArrowRight />
      </>
    ),
    variant: 'default',
    size: 'default',
  },
};

export const IconOnly: Story = {
  args: {
    children: <Plus />,
    variant: 'default',
    size: 'icon',
    'aria-label': 'Añadir',
  },
};

export const SaveButton: Story = {
  args: {
    children: (
      <>
        <Save /> Guardar
      </>
    ),
    variant: 'default',
    size: 'default',
  },
};