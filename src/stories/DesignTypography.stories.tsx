import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface TypographyExampleProps {
  title: string;
  className: string;
  description?: string;
  sampleText?: string;
}

const TypographyExample = ({ 
  title, 
  className, 
  description, 
  sampleText = "El veloz murciélago hindú comía feliz cardillo y kiwi" 
}: TypographyExampleProps) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-2">
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-muted-foreground">{className}</div>
    </div>
    <div className={className}>{sampleText}</div>
    {description && (
      <div className="text-xs text-muted-foreground mt-1">{description}</div>
    )}
  </div>
);

const DesignTypography = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Tipografía</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Jerarquía de Encabezados</h2>
        <div className="space-y-8">
          <TypographyExample 
            title="Heading 1" 
            className="text-4xl font-extrabold tracking-tight" 
            description="text-4xl font-extrabold tracking-tight"
          />
          <TypographyExample 
            title="Heading 2" 
            className="text-3xl font-bold tracking-tight" 
            description="text-3xl font-bold tracking-tight"
          />
          <TypographyExample 
            title="Heading 3" 
            className="text-2xl font-semibold tracking-tight" 
            description="text-2xl font-semibold tracking-tight"
          />
          <TypographyExample 
            title="Heading 4" 
            className="text-xl font-semibold tracking-tight" 
            description="text-xl font-semibold tracking-tight"
          />
          <TypographyExample 
            title="Heading 5" 
            className="text-lg font-semibold tracking-tight" 
            description="text-lg font-semibold tracking-tight"
          />
          <TypographyExample 
            title="Heading 6" 
            className="text-base font-semibold tracking-tight" 
            description="text-base font-semibold tracking-tight"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Tamaños de Texto</h2>
        <div className="space-y-6">
          <TypographyExample 
            title="Text 2XL" 
            className="text-2xl" 
            description="text-2xl"
          />
          <TypographyExample 
            title="Text XL" 
            className="text-xl" 
            description="text-xl"
          />
          <TypographyExample 
            title="Text LG" 
            className="text-lg" 
            description="text-lg"
          />
          <TypographyExample 
            title="Text Base" 
            className="text-base" 
            description="text-base (default)"
          />
          <TypographyExample 
            title="Text SM" 
            className="text-sm" 
            description="text-sm"
          />
          <TypographyExample 
            title="Text XS" 
            className="text-xs" 
            description="text-xs"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Pesos de Fuente</h2>
        <div className="space-y-6">
          <TypographyExample 
            title="Font Thin" 
            className="font-thin" 
            description="font-thin (100)"
          />
          <TypographyExample 
            title="Font Extralight" 
            className="font-extralight" 
            description="font-extralight (200)"
          />
          <TypographyExample 
            title="Font Light" 
            className="font-light" 
            description="font-light (300)"
          />
          <TypographyExample 
            title="Font Normal" 
            className="font-normal" 
            description="font-normal (400)"
          />
          <TypographyExample 
            title="Font Medium" 
            className="font-medium" 
            description="font-medium (500)"
          />
          <TypographyExample 
            title="Font Semibold" 
            className="font-semibold" 
            description="font-semibold (600)"
          />
          <TypographyExample 
            title="Font Bold" 
            className="font-bold" 
            description="font-bold (700)"
          />
          <TypographyExample 
            title="Font Extrabold" 
            className="font-extrabold" 
            description="font-extrabold (800)"
          />
          <TypographyExample 
            title="Font Black" 
            className="font-black" 
            description="font-black (900)"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Estilos de Texto</h2>
        <div className="space-y-6">
          <TypographyExample 
            title="Text Italic" 
            className="italic" 
            description="italic"
          />
          <TypographyExample 
            title="Text Underline" 
            className="underline" 
            description="underline"
          />
          <TypographyExample 
            title="Text Uppercase" 
            className="uppercase" 
            description="uppercase"
          />
          <TypographyExample 
            title="Text Lowercase" 
            className="lowercase" 
            description="lowercase"
            sampleText="EL VELOZ MURCIÉLAGO HINDÚ COMÍA FELIZ CARDILLO Y KIWI"
          />
          <TypographyExample 
            title="Text Capitalize" 
            className="capitalize" 
            description="capitalize"
            sampleText="el veloz murciélago hindú comía feliz cardillo y kiwi"
          />
          <TypographyExample 
            title="Text Line Through" 
            className="line-through" 
            description="line-through"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Espaciado de Letras</h2>
        <div className="space-y-6">
          <TypographyExample 
            title="Tracking Tighter" 
            className="tracking-tighter" 
            description="tracking-tighter"
          />
          <TypographyExample 
            title="Tracking Tight" 
            className="tracking-tight" 
            description="tracking-tight"
          />
          <TypographyExample 
            title="Tracking Normal" 
            className="tracking-normal" 
            description="tracking-normal"
          />
          <TypographyExample 
            title="Tracking Wide" 
            className="tracking-wide" 
            description="tracking-wide"
          />
          <TypographyExample 
            title="Tracking Wider" 
            className="tracking-wider" 
            description="tracking-wider"
          />
          <TypographyExample 
            title="Tracking Widest" 
            className="tracking-widest" 
            description="tracking-widest"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Altura de Línea</h2>
        <div className="space-y-8">
          <div>
            <div className="text-sm font-medium mb-2">Leading Tight (leading-tight)</div>
            <p className="leading-tight p-4 bg-muted/20 rounded-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
            </p>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Leading Normal (leading-normal)</div>
            <p className="leading-normal p-4 bg-muted/20 rounded-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
            </p>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Leading Relaxed (leading-relaxed)</div>
            <p className="leading-relaxed p-4 bg-muted/20 rounded-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
            </p>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Leading Loose (leading-loose)</div>
            <p className="leading-loose p-4 bg-muted/20 rounded-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const meta: Meta = {
  title: 'Design System/Tipografía',
  component: DesignTypography,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Tipografia: Story = {};