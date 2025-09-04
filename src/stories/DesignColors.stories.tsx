import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface ColorBlockProps {
  name: string;
  variable: string;
  className: string;
  tailwindClass?: string;
}

const ColorBlock = ({ name, variable, className, tailwindClass }: ColorBlockProps) => {
  const [computedColor, setComputedColor] = useState<string>('No disponible');
  const [copied, setCopied] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const style = getComputedStyle(document.documentElement);
      setComputedColor(style.getPropertyValue(variable).trim() || 'No disponible');
    }
  }, [variable]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className="mb-4 border border-border rounded-md overflow-hidden hover:shadow-md transition-shadow">
      <div className={`h-16 ${className}`} />
      <div className="p-3 bg-card">
        <div className="text-sm font-medium">{name}</div>
        <div className="flex flex-col gap-1 mt-2">
          <button 
            onClick={() => copyToClipboard(`var(${variable})`, 'css')}
            className="text-xs flex items-center justify-between bg-muted px-2 py-1 rounded hover:bg-muted/80 transition-colors"
          >
            <span className="font-mono">var({variable})</span>
            <span className="text-xs text-muted-foreground">{copied === 'css' ? '✓ Copiado' : 'Copiar'}</span>
          </button>
          
          {tailwindClass && (
            <button 
              onClick={() => copyToClipboard(tailwindClass, 'tailwind')}
              className="text-xs flex items-center justify-between bg-muted px-2 py-1 rounded hover:bg-muted/80 transition-colors"
            >
              <span className="font-mono">{tailwindClass}</span>
              <span className="text-xs text-muted-foreground">{copied === 'tailwind' ? '✓ Copiado' : 'Copiar'}</span>
            </button>
          )}
          
          <button 
            onClick={() => copyToClipboard(computedColor, 'color')}
            className="text-xs flex items-center justify-between bg-muted px-2 py-1 rounded hover:bg-muted/80 transition-colors"
          >
            <span className="font-mono">{computedColor}</span>
            <span className="text-xs text-muted-foreground">{copied === 'color' ? '✓ Copiado' : 'Copiar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const DesignColors = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">Colores del Sistema</h1>
      <p className="text-muted-foreground mb-8">Haz clic en cualquier valor para copiarlo al portapapeles.</p>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Colores Base</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ColorBlock 
            name="Primary" 
            variable="--primary" 
            className="bg-primary" 
            tailwindClass="bg-primary text-primary-foreground"
          />
          <ColorBlock 
            name="Primary Foreground" 
            variable="--primary-foreground" 
            className="bg-primary-foreground" 
            tailwindClass="text-primary-foreground"
          />
          <ColorBlock 
            name="Secondary" 
            variable="--secondary" 
            className="bg-secondary" 
            tailwindClass="bg-secondary text-secondary-foreground"
          />
          <ColorBlock 
            name="Secondary Foreground" 
            variable="--secondary-foreground" 
            className="bg-secondary-foreground" 
            tailwindClass="text-secondary-foreground"
          />
          <ColorBlock 
            name="Accent" 
            variable="--accent" 
            className="bg-accent" 
            tailwindClass="bg-accent text-accent-foreground"
          />
          <ColorBlock 
            name="Accent Foreground" 
            variable="--accent-foreground" 
            className="bg-accent-foreground" 
            tailwindClass="text-accent-foreground"
          />
          <ColorBlock 
            name="Destructive" 
            variable="--destructive" 
            className="bg-destructive" 
            tailwindClass="bg-destructive text-destructive-foreground"
          />
          <ColorBlock 
            name="Destructive Foreground" 
            variable="--destructive-foreground" 
            className="bg-destructive-foreground" 
            tailwindClass="text-destructive-foreground"
          />
          <ColorBlock 
            name="Muted" 
            variable="--muted" 
            className="bg-muted" 
            tailwindClass="bg-muted text-muted-foreground"
          />
          <ColorBlock 
            name="Muted Foreground" 
            variable="--muted-foreground" 
            className="bg-muted-foreground" 
            tailwindClass="text-muted-foreground"
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
            tailwindClass="bg-background"
          />
          <ColorBlock 
            name="Foreground" 
            variable="--foreground" 
            className="bg-foreground" 
            tailwindClass="text-foreground"
          />
          <ColorBlock 
            name="Card" 
            variable="--card" 
            className="bg-card" 
            tailwindClass="bg-card"
          />
          <ColorBlock 
            name="Card Foreground" 
            variable="--card-foreground" 
            className="bg-card-foreground" 
            tailwindClass="text-card-foreground"
          />
          <ColorBlock 
            name="Popover" 
            variable="--popover" 
            className="bg-popover" 
            tailwindClass="bg-popover"
          />
          <ColorBlock 
            name="Popover Foreground" 
            variable="--popover-foreground" 
            className="bg-popover-foreground" 
            tailwindClass="text-popover-foreground"
          />
          <ColorBlock 
            name="Border" 
            variable="--border" 
            className="bg-border" 
            tailwindClass="border-border"
          />
          <ColorBlock 
            name="Input" 
            variable="--input" 
            className="bg-input" 
            tailwindClass="bg-input"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Colores de Componentes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ColorBlock 
            name="Card Reminder" 
            variable="--color-card-reminder" 
            className="bg-card-reminder" 
            tailwindClass="bg-card-reminder"
          />
          <ColorBlock 
            name="Card Incident (Naranja)" 
            variable="--color-card-incident" 
            className="bg-card-incident" 
            tailwindClass="bg-card-incident"
          />
          <ColorBlock 
            name="Incident (Naranja)" 
            variable="--color-card-incident" 
            className="bg-incident" 
            tailwindClass="bg-incident"
          />
          <ColorBlock 
            name="Incident Card BG (Naranja Suave)" 
            variable="" 
            className="bg-orange-50" 
            tailwindClass="bg-orange-50"
          />
          <ColorBlock 
            name="Form Block Basic" 
            variable="--color-form-block-basic" 
            className="bg-form-block-basic" 
            tailwindClass="bg-form-block-basic"
          />
          <ColorBlock 
            name="Registry Block" 
            variable="--color-registry-block" 
            className="bg-registry-block" 
            tailwindClass="bg-registry-block"
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
            tailwindClass="bg-success text-success-foreground"
          />
          <ColorBlock 
            name="Success Foreground" 
            variable="--success-foreground" 
            className="bg-success-foreground" 
            tailwindClass="text-success-foreground"
          />
          <ColorBlock 
            name="Warning" 
            variable="--warning" 
            className="bg-warning" 
            tailwindClass="bg-warning text-warning-foreground"
          />
          <ColorBlock 
            name="Warning Foreground" 
            variable="--warning-foreground" 
            className="bg-warning-foreground" 
            tailwindClass="text-warning-foreground"
          />
          <ColorBlock 
            name="Info" 
            variable="--info" 
            className="bg-info" 
            tailwindClass="bg-info text-info-foreground"
          />
          <ColorBlock 
            name="Info Foreground" 
            variable="--info-foreground" 
            className="bg-info-foreground" 
            tailwindClass="text-info-foreground"
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