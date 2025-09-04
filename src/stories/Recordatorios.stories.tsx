import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RecordatorioCard } from '@/components/ui/recordatorio-card';
import { ElementoAtencionCard } from '@/components/ui/elemento-atencion-card';

// Definición del meta para Storybook
const meta: Meta<typeof RecordatorioCard> = {
  title: 'UI/Recordatorios',
  component: RecordatorioCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Historia para el componente de Recordatorio
export const Recordatorio: Story = {
  render: () => (
    <div className="w-80">
      <RecordatorioCard
        titulo="Lectura mensual de contadores"
        tipoRegistro="contador"
        fecha={new Date().toISOString().split('T')[0]}
        periodicidad="mensual"
      />
    </div>
  ),
};

// Historia para mostrar diferentes tipos de recordatorios
export const TiposDeRecordatorios: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <RecordatorioCard
        titulo="Lectura mensual de contadores"
        tipoRegistro="contador"
        fecha={new Date().toISOString().split('T')[0]}
        periodicidad="mensual"
      />
      <RecordatorioCard
        titulo="Análisis de calidad del agua"
        tipoRegistro="analitica"
        fecha={new Date().toISOString().split('T')[0]}
        periodicidad="semanal"
      />
      <RecordatorioCard
        titulo="Mantenimiento preventivo bombas"
        tipoRegistro="mantenimiento"
        fecha={new Date().toISOString().split('T')[0]}
        periodicidad="trimestral"
      />
    </div>
  ),
};

// Historia para el componente de Incidencia
export const Incidencia: Story = {
  render: () => (
    <div className="w-80">
      <ElementoAtencionCard
        tipo="incidencia"
        titulo="Fuga en tubería principal"
        ubicacion="Sector Norte"
      />
    </div>
  ),
};

// Historia para el componente de Recordatorio Vencido
export const RecordatorioVencido: Story = {
  render: () => (
    <div className="w-80">
      <ElementoAtencionCard
        tipo="recordatorio"
        titulo="Lectura mensual de contadores"
        fechaVencimiento="2024-01-18"
      />
    </div>
  ),
};

// Historia para mostrar elementos que requieren atención
export const ElementosAtencion: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <ElementoAtencionCard
        tipo="incidencia"
        titulo="Fuga en tubería principal"
        ubicacion="Sector Norte"
      />
      <ElementoAtencionCard
        tipo="recordatorio"
        titulo="Lectura mensual de contadores"
        fechaVencimiento="2024-01-18"
      />
      <ElementoAtencionCard
        tipo="tarea"
        titulo="Inspección mensual Pozo A"
        fechaVencimiento="2024-01-10"
        subtipo="Mantenimiento"
      />
    </div>
  ),
};