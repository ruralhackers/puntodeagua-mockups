import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface ColorBlockProps {
  color: string;
  name: string;
  value: string;
}

const ColorBlock = ({ color, name, value }: ColorBlockProps) => (
  <div className="flex flex-col items-start mb-4">
    <div 
      className="w-full h-16 rounded-md mb-2" 
      style={{ backgroundColor: `var(--${color})` }}
    />
    <div className="text-sm font-medium">{name}</div>
    <div className="text-xs text-muted-foreground">{value}</div>
  </div>
);

interface TypographyBlockProps {
  variant: string;
  sample: string;
  className?: string;
}

const TypographyBlock = ({ variant, sample, className = '' }: TypographyBlockProps) => (
  <div className="mb-6">
    <div className="text-sm text-muted-foreground mb-2">{variant}</div>
    <div className={className}>{sample}</div>
  </div>
);

interface RadiusBlockProps {
  name: string;
  value: string;
}

const RadiusBlock = ({ name, value }: RadiusBlockProps) => (
  <div className="flex items-center gap-4 mb-4">
    <div 
      className="w-16 h-16 bg-primary" 
      style={{ borderRadius: `var(${value})` }}
    />
    <div>
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xs text-muted-foreground">{value}</div>
    </div>
  </div>
);

const DesignSystem = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">Sistema de Diseño</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Colores</h2>
        
        <h3 className="text-xl font-medium mb-4">Colores Principales</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <ColorBlock color="background" name="Background" value="var(--background)" />
          <ColorBlock color="foreground" name="Foreground" value="var(--foreground)" />
          <ColorBlock color="primary" name="Primary" value="var(--primary)" />
          <ColorBlock color="primary-foreground" name="Primary Foreground" value="var(--primary-foreground)" />
          <ColorBlock color="secondary" name="Secondary" value="var(--secondary)" />
          <ColorBlock color="secondary-foreground" name="Secondary Foreground" value="var(--secondary-foreground)" />
          <ColorBlock color="accent" name="Accent" value="var(--accent)" />
          <ColorBlock color="accent-foreground" name="Accent Foreground" value="var(--accent-foreground)" />
          <ColorBlock color="muted" name="Muted" value="var(--muted)" />
          <ColorBlock color="muted-foreground" name="Muted Foreground" value="var(--muted-foreground)" />
          <ColorBlock color="destructive" name="Destructive" value="var(--destructive)" />
          <ColorBlock color="destructive-foreground" name="Destructive Foreground" value="var(--destructive-foreground)" />
        </div>

        <h3 className="text-xl font-medium mb-4">Componentes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <ColorBlock color="card" name="Card" value="var(--card)" />
          <ColorBlock color="card-foreground" name="Card Foreground" value="var(--card-foreground)" />
          <ColorBlock color="popover" name="Popover" value="var(--popover)" />
          <ColorBlock color="popover-foreground" name="Popover Foreground" value="var(--popover-foreground)" />
          <ColorBlock color="border" name="Border" value="var(--border)" />
          <ColorBlock color="input" name="Input" value="var(--input)" />
          <ColorBlock color="ring" name="Ring" value="var(--ring)" />
        </div>

        <h3 className="text-xl font-medium mb-4">Colores Personalizados</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ColorBlock color="color-card-reminder" name="Card Reminder" value="var(--color-card-reminder)" />
          <ColorBlock color="color-card-incident" name="Card Incident" value="var(--color-card-incident)" />
          <ColorBlock color="color-form-block-basic" name="Form Block Basic" value="var(--color-form-block-basic)" />
          <ColorBlock color="color-registry-block" name="Registry Block" value="var(--color-registry-block)" />
          <ColorBlock color="color-button-primary" name="Button Primary" value="var(--color-button-primary)" />
          <ColorBlock color="color-button-destructive" name="Button Destructive" value="var(--color-button-destructive)" />
          <ColorBlock color="color-button-secondary" name="Button Secondary" value="var(--color-button-secondary)" />
          <ColorBlock color="color-input-background" name="Input Background" value="var(--color-input-background)" />
          <ColorBlock color="color-input-background-filled" name="Input Background Filled" value="var(--color-input-background-filled)" />
          <ColorBlock color="color-input-border" name="Input Border" value="var(--color-input-border)" />
          <ColorBlock color="color-input-border-focus" name="Input Border Focus" value="var(--color-input-border-focus)" />
          <ColorBlock color="color-input-border-hover" name="Input Border Hover" value="var(--color-input-border-hover)" />
          <ColorBlock color="color-input-border-error" name="Input Border Error" value="var(--color-input-border-error)" />
          <ColorBlock color="color-input-ring-focus" name="Input Ring Focus" value="var(--color-input-ring-focus)" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Tipografía</h2>
        <div className="space-y-8">
          <TypographyBlock 
            variant="Heading 1" 
            sample="Gestión Comunal de Aguas" 
            className="text-4xl font-bold"
          />
          <TypographyBlock 
            variant="Heading 2" 
            sample="Sección Principal" 
            className="text-2xl font-bold"
          />
          <TypographyBlock 
            variant="Heading 3" 
            sample="Subsección" 
            className="text-2xl font-semibold"
          />
          <TypographyBlock 
            variant="Heading 4" 
            sample="Título de Componente" 
            className="text-xl font-medium"
          />
          <TypographyBlock 
            variant="Paragraph" 
            sample="Este es un párrafo de texto normal que se utiliza para el contenido principal de la aplicación. Debe ser legible y tener un buen contraste con el fondo." 
            className="text-base"
          />
          <TypographyBlock 
            variant="Small" 
            sample="Texto pequeño para información secundaria o etiquetas" 
            className="text-sm"
          />
          <TypographyBlock 
            variant="Muted" 
            sample="Texto con menor énfasis visual para contenido auxiliar" 
            className="text-sm text-muted-foreground"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Radios de Borde</h2>
        <div className="space-y-6">
          <RadiusBlock name="Radius SM" value="--radius-sm" />
          <RadiusBlock name="Radius MD" value="--radius-md" />
          <RadiusBlock name="Radius LG" value="--radius-lg" />
          <RadiusBlock name="Radius XL" value="--radius-xl" />
        </div>
      </section>
    </div>
  );
};

const meta: Meta = {
  title: 'Design System/Guía de Estilos',
  component: DesignSystem,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const GuiaDeEstilos: Story = {};