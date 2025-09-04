import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

interface SpacingBlockProps {
  size: string;
  value: string;
}

const SpacingBlock = ({ size, value }: SpacingBlockProps) => (
  <div className="flex items-center gap-4 mb-4">
    <div 
      className="bg-primary" 
      style={{ width: value, height: value }}
    />
    <div>
      <div className="text-sm font-medium">{size}</div>
      <div className="text-xs text-muted-foreground">{value}</div>
    </div>
  </div>
);

interface ShadowBlockProps {
  name: string;
  className: string;
}

const ShadowBlock = ({ name, className }: ShadowBlockProps) => (
  <div className="mb-6">
    <div className="text-sm font-medium mb-2">{name}</div>
    <div 
      className={`w-24 h-24 bg-card rounded-md ${className}`}
    />
  </div>
);

const DesignTokens = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Tokens de Diseño</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Espaciado</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-medium mb-4">Espaciado Base</h3>
            <div className="space-y-6">
              <SpacingBlock size="0.5rem (2px)" value="0.5rem" />
              <SpacingBlock size="1rem (4px)" value="1rem" />
              <SpacingBlock size="1.5rem (6px)" value="1.5rem" />
              <SpacingBlock size="2rem (8px)" value="2rem" />
              <SpacingBlock size="2.5rem (10px)" value="2.5rem" />
              <SpacingBlock size="3rem (12px)" value="3rem" />
              <SpacingBlock size="4rem (16px)" value="4rem" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Espaciado en Componentes</h3>
            <div className="space-y-4">
              <div className="p-2 border border-border rounded-md mb-2">
                <div className="text-sm font-medium">Padding Small (p-2)</div>
                <div className="text-xs text-muted-foreground">0.5rem</div>
              </div>
              
              <div className="p-4 border border-border rounded-md mb-2">
                <div className="text-sm font-medium">Padding Medium (p-4)</div>
                <div className="text-xs text-muted-foreground">1rem</div>
              </div>
              
              <div className="p-6 border border-border rounded-md mb-2">
                <div className="text-sm font-medium">Padding Large (p-6)</div>
                <div className="text-xs text-muted-foreground">1.5rem</div>
              </div>
              
              <div className="space-y-2 border border-border rounded-md p-4 mb-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="text-sm font-medium mt-2">Gap Small (space-y-2)</div>
                <div className="text-xs text-muted-foreground">0.5rem</div>
              </div>
              
              <div className="space-y-4 border border-border rounded-md p-4 mb-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="text-sm font-medium mt-2">Gap Medium (space-y-4)</div>
                <div className="text-xs text-muted-foreground">1rem</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Sombras</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ShadowBlock name="Sin sombra" className="" />
          <ShadowBlock name="Shadow SM" className="shadow-sm" />
          <ShadowBlock name="Shadow" className="shadow" />
          <ShadowBlock name="Shadow MD" className="shadow-md" />
          <ShadowBlock name="Shadow LG" className="shadow-lg" />
          <ShadowBlock name="Shadow XL" className="shadow-xl" />
          <ShadowBlock name="Shadow 2XL" className="shadow-2xl" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Opacidad</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm font-medium">Opacidad 100%</div>
            <div className="h-16 bg-primary rounded-md"></div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Opacidad 75%</div>
            <div className="h-16 bg-primary/75 rounded-md"></div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Opacidad 50%</div>
            <div className="h-16 bg-primary/50 rounded-md"></div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Opacidad 25%</div>
            <div className="h-16 bg-primary/25 rounded-md"></div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Opacidad 10%</div>
            <div className="h-16 bg-primary/10 rounded-md"></div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Opacidad 5%</div>
            <div className="h-16 bg-primary/5 rounded-md"></div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Transiciones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="text-sm font-medium">Transición por defecto (hover)</div>
            <div className="h-16 bg-primary/10 hover:bg-primary/50 rounded-md transition-all duration-300 ease-in-out"></div>
            <div className="text-xs text-muted-foreground">transition-all duration-300 ease-in-out</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Transición rápida (hover)</div>
            <div className="h-16 bg-primary/10 hover:bg-primary/50 rounded-md transition-all duration-150 ease-in-out"></div>
            <div className="text-xs text-muted-foreground">transition-all duration-150 ease-in-out</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Transición lenta (hover)</div>
            <div className="h-16 bg-primary/10 hover:bg-primary/50 rounded-md transition-all duration-500 ease-in-out"></div>
            <div className="text-xs text-muted-foreground">transition-all duration-500 ease-in-out</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Transición con rebote (hover)</div>
            <div className="h-16 bg-primary/10 hover:bg-primary/50 rounded-md transition-all duration-300 ease-bounce"></div>
            <div className="text-xs text-muted-foreground">transition-all duration-300 ease-bounce</div>
          </div>
        </div>
      </section>
    </div>
  );
};

const meta: Meta = {
  title: 'Design System/Tokens de Diseño',
  component: DesignTokens,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TokensDeDiseno: Story = {};