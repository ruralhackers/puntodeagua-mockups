import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar } from '../components/ui/calendar';

const ComponentsShowcase = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Componentes UI</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Botones</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Variantes</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Tamaños</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" className="h-10 w-10">+</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Estados</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button variant="outline" className="bg-muted/50">Hover</Button>
              <Button variant="outline" className="bg-muted">Active</Button>
              <Button className="relative">
                Loading
                <div className="absolute inset-0 flex items-center justify-center bg-primary/90 rounded-md">
                  <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Inputs</h2>
        <div className="space-y-6 max-w-md">
          <div>
            <div className="text-sm font-medium mb-2">Input Default</div>
            <Input placeholder="Ingrese texto aquí" />
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Input Disabled</div>
            <Input placeholder="Input deshabilitado" disabled />
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Input con Etiqueta</div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" placeholder="ejemplo@correo.com" type="email" />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Input con Error</div>
            <div className="space-y-2">
              <Input placeholder="Input con error" className="border-destructive" />
              <p className="text-xs text-destructive">Este campo es requerido</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contenido de la tarjeta con información relevante.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost">Cancelar</Button>
              <Button>Guardar</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-primary/50">
            <CardHeader className="bg-primary/5">
              <CardTitle>Card con Énfasis</CardTitle>
              <CardDescription>Variante con borde y fondo destacado</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p>Contenido de la tarjeta con información relevante.</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button>Acción Principal</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Select</h2>
        <div className="max-w-xs">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Opción 1</SelectItem>
              <SelectItem value="option2">Opción 2</SelectItem>
              <SelectItem value="option3">Opción 3</SelectItem>
              <SelectItem value="option4">Opción 4</SelectItem>
              <SelectItem value="option5">Opción 5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Calendar</h2>
        <div className="max-w-sm">
          <Calendar />
        </div>
      </section>


    </div>
  );
};

const meta: Meta = {
  title: 'Design System/Componentes UI',
  component: ComponentsShowcase,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ComponentesUI: Story = {};