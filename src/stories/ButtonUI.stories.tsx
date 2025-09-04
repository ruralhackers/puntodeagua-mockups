import type { Meta, StoryObj } from '@storybook/react';
import { Button, CancelButton } from '../components/ui/button';
import { ArrowRight, Plus, Save } from 'lucide-react';

const meta = {
  title: 'UI/Button',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as const;

export default meta;

type ButtonStory = StoryObj<typeof Button>;
type CancelButtonStory = StoryObj<typeof CancelButton>;

export const Default: ButtonStory = {
  render: () => <Button>Button</Button>,
};

export const Destructive: ButtonStory = {
  render: () => <Button variant="destructive">Eliminar</Button>,
};

export const Outline: ButtonStory = {
  render: () => <Button variant="outline">Aceptar</Button>,
};

export const Secondary: ButtonStory = {
  render: () => <Button variant="secondary">Secundario</Button>,
};

export const WithIcon: ButtonStory = {
  render: () => (
    <Button>
      Continuar <ArrowRight />
    </Button>
  ),
};

export const IconOnly: ButtonStory = {
  render: () => (
    <Button variant="icon" aria-label="Añadir">
      <Plus />
    </Button>
  ),
};

export const SaveButton: ButtonStory = {
  render: () => (
    <Button>
      <Save /> Guardar
    </Button>
  ),
};

export const Cancel: CancelButtonStory = {
  render: () => <CancelButton>Cancelar</CancelButton>,
};