import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface ColorBlockProps {
  name: string;
  variable: string;
  className: string;
}

const ColorBlock = ({ name, variable, className }: ColorBlockProps) => {
  // Obtener el valor real del color desde la variable CSS
  const getComputedColor = () => {
    if (typeof window !== 'undefined') {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue(variable).trim() || 'No disponible';
    }
    return 'No disponible';
  };

  return (
    <div className="mb-4">
      <div className={`h-16 rounded-md ${className}`} />
      <div className="mt-2">
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{variable}</div>
        <div className="text-xs font-mono mt-1">{getComputedColor()}</div>
      </div>
    </div>
  );
};

const DesignColors = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Colores del Sistema</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Colores Base</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ColorBlock 
            name="Primary" 
            variable="--primary" 
            className="bg-primary" 
          />
          <ColorBlock 
            name="Primary Foreground" 
            variable="--primary-foreground" 
            className="bg-primary-foreground" 
          />
          <ColorBlock 
            name="Secondary" 
            variable="--secondary" 
            className="bg-secondary" 
          />
          <ColorBlock 
            name="Secondary Foreground" 
            variable="--secondary-foreground" 
            className="bg-secondary-foreground" 
          />
          <ColorBlock 
            name="Accent" 
            variable="--accent" 
            className="bg-accent" 
          />
          <ColorBlock 
            name="Accent Foreground" 
            variable="--accent-foreground" 
            className="bg-accent-foreground" 
          />
          <ColorBlock 
            name="Destructive" 
            variable="--destructive" 
            className="bg-destructive" 
          />
          <ColorBlock 
            name="Destructive Foreground" 
            variable="--destructive-foreground" 
            className="bg-destructive-foreground" 
          />
          <ColorBlock 
            name="Muted" 
            variable="--muted" 
            className="bg-muted" 
          />
          <ColorBlock 
            name="Muted Foreground" 
            variable="--muted-foreground" 
            className="bg-muted-foreground" 
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Colores de Interfaz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ColorBlock 
            name="Background" 
            variable="--background" 
            className="bg-background" 
          />
          <ColorBlock 
            name="Foreground" 
            variable="--foreground" 
            className="bg-foreground" 
          />
          <ColorBlock 
            name="Card" 
            variable="--card" 
            className="bg-card" 
          />
          <ColorBlock 
            name="Card Foreground" 
            variable="--card-foreground" 
            className="bg-card-foreground" 
          />
          <ColorBlock 
            name="Popover" 
            variable="--popover" 
            className="bg-popover" 
          />
          <ColorBlock 
            name="Popover Foreground" 
            variable="--popover-foreground" 
            className="bg-popover-foreground" 
          />
          <ColorBlock 
            name="Border" 
            variable="--border" 
            className="bg-border" 
          />
          <ColorBlock 
            name="Input" 
            variable="--input" 
            className="bg-input" 
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Colores de Estado</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ColorBlock 
            name="Success" 
            variable="--success" 
            className="bg-success" 
          />
          <ColorBlock 
            name="Success Foreground" 
            variable="--success-foreground" 
            className="bg-success-foreground" 
          />
          <ColorBlock 
            name="Warning" 
            variable="--warning" 
            className="bg-warning" 
          />
          <ColorBlock 
            name="Warning Foreground" 
            variable="--warning-foreground" 
            className="bg-warning-foreground" 
          />
          <ColorBlock 
            name="Info" 
            variable="--info" 
            className="bg-info" 
          />
          <ColorBlock 
            name="Info Foreground" 
            variable="--info-foreground" 
            className="bg-info-foreground" 
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Gradientes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="mb-4">
            <div className="h-16 rounded-md bg-gradient-to-r from-primary to-secondary" />
            <div className="mt-2">
              <div className="text-sm font-medium">Primario a Secundario</div>
              <div className="text-xs text-muted-foreground">bg-gradient-to-r from-primary to-secondary</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="h-16 rounded-md bg-gradient-to-r from-secondary to-accent" />
            <div className="mt-2">
              <div className="text-sm font-medium">Secundario a Acento</div>
              <div className="text-xs text-muted-foreground">bg-gradient-to-r from-secondary to-accent</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="h-16 rounded-md bg-gradient-to-tr from-primary via-accent to-secondary" />
            <div className="mt-2">
              <div className="text-sm font-medium">Gradiente Triple</div>
              <div className="text-xs text-muted-foreground">bg-gradient-to-tr from-primary via-accent to-secondary</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="h-16 rounded-md bg-gradient-to-b from-background to-muted" />
            <div className="mt-2">
              <div className="text-sm font-medium">Fondo a Muted</div>
              <div className="text-xs text-muted-foreground">bg-gradient-to-b from-background to-muted</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const meta: Meta = {
  title: 'Design System/Colores',
  component: DesignColors,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Colores: Story = {};