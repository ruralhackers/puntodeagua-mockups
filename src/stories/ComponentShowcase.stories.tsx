import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@radix-ui/react-label';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';

const ComponentShowcase = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">Componentes UI</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Botones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Variantes</h3>
            <div className="flex flex-col gap-4">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tamaños</h3>
            <div className="flex flex-col gap-4">
              <Button size="default">Default</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Search className="h-4 w-4" /></Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Estados</h3>
            <div className="flex flex-col gap-4">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button className="opacity-70">Hover (simulado)</Button>
              <Button className="ring-2 ring-primary ring-offset-2">Focus (simulado)</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Inputs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Básicos</h3>
            <div className="flex flex-col gap-4">
              <Input placeholder="Input estándar" />
              <Input placeholder="Input disabled" disabled />
              <div className="space-y-2">
                <Label htmlFor="with-label">Con etiqueta</Label>
                <Input id="with-label" placeholder="Input con etiqueta" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Variantes</h3>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Con icono al inicio" />
              </div>
              <div className="relative">
                <Input placeholder="Con icono al final" />
                <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" />
              </div>
              <Input type="email" placeholder="Tipo email" />
              <Input type="password" placeholder="Tipo password" />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Básica</CardTitle>
              <CardDescription>Descripción de la tarjeta</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contenido principal de la tarjeta.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Card con Footer</CardTitle>
              <CardDescription>Incluye acciones en el footer</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contenido principal de la tarjeta.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost">Cancelar</Button>
              <Button>Guardar</Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle>Card con Fondo</CardTitle>
              <CardDescription>Usando la clase bg-muted</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contenido principal de la tarjeta.</p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle>Card con Borde</CardTitle>
              <CardDescription>Usando la clase border-primary/50</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contenido principal de la tarjeta.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Select</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Básico</h3>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="opcion1">Opción 1</SelectItem>
                <SelectItem value="opcion2">Opción 2</SelectItem>
                <SelectItem value="opcion3">Opción 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Con etiqueta</h3>
            <div className="space-y-2">
              <Label htmlFor="select-label">Selecciona una opción</Label>
              <Select>
                <SelectTrigger id="select-label">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opcion1">Opción 1</SelectItem>
                  <SelectItem value="opcion2">Opción 2</SelectItem>
                  <SelectItem value="opcion3">Opción 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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
  component: ComponentShowcase,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const MuestraDeComponentes: Story = {};