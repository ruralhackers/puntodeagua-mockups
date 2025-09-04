import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IncidenciaCard } from '@/components/ui/incidencia-card';
import { IncidenciaListItem } from '@/components/ui/incidencia-list-item';

// Definición del meta para Storybook
const meta: Meta<typeof IncidenciaCard> = {
  title: 'UI/Incidencias',
  component: IncidenciaCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Historia para el componente de Incidencia Card
export const IncidenciaCardComponent: Story = {
  render: () => (
    <div className="w-80">
      <IncidenciaCard
        id={1}
        titulo="Fuga en tubería principal"
        ubicacion="Sector Norte"
        prioridad="Alta"
        fecha="2024-01-15"
      />
    </div>
  ),
};

// Historia para mostrar diferentes prioridades de incidencias
export const PrioridadesIncidencia: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <IncidenciaCard
        id={1}
        titulo="Fuga en tubería principal"
        ubicacion="Sector Norte"
        prioridad="Alta"
        fecha="2024-01-15"
      />
      <IncidenciaCard
        id={2}
        titulo="Presión baja en zona residencial"
        ubicacion="Sector Sur"
        prioridad="Media"
        fecha="2024-01-14"
      />
      <IncidenciaCard
        id={3}
        titulo="Mantenimiento rutinario"
        ubicacion="Estación de bombeo"
        prioridad="Baja"
        fecha="2024-01-13"
      />
    </div>
  ),
};

// Historia para el componente de Incidencia con botón de eliminar
export const IncidenciaConEliminar: Story = {
  render: () => (
    <div className="w-80">
      <IncidenciaCard
        id={1}
        titulo="Fuga en tubería principal"
        ubicacion="Sector Norte"
        prioridad="Alta"
        fecha="2024-01-15"
        onDelete={(id) => alert(`Eliminar incidencia ${id}`)}
      />
    </div>
  ),
};

// Historia para el componente de Incidencia en lista
export const IncidenciaEnLista: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <IncidenciaListItem
        id={1}
        titulo="Fuga en tubería principal"
        tipo="Fuga"
        prioridad="Alta"
        estado="Reportada"
        puntoAgua="Red Distribución Este"
        fechaReporte="2024-01-15"
      />
      <IncidenciaListItem
        id={2}
        titulo="Avería en bomba de agua"
        tipo="Avería Equipo"
        prioridad="Media"
        estado="En Proceso"
        puntoAgua="Pozo Principal Norte"
        fechaReporte="2024-01-14"
      />
      <IncidenciaListItem
        id={3}
        titulo="Baja presión en sector residencial"
        tipo="Presión"
        prioridad="Baja"
        estado="Resuelta"
        puntoAgua="Tanque Elevado Central"
        fechaReporte="2024-01-13"
      />
    </div>
  ),
};