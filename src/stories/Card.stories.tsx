import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    className: 'w-[350px]',
    children: (
      <>
        <CardHeader>
          <CardTitle>Título de la tarjeta</CardTitle>
          <CardDescription>Descripción de la tarjeta</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Contenido de la tarjeta</p>
        </CardContent>
      </>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    className: 'w-[350px]',
    children: (
      <>
        <CardHeader>
          <CardTitle>Título de la tarjeta</CardTitle>
          <CardDescription>Descripción de la tarjeta</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Contenido de la tarjeta con pie de página</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Guardar</Button>
        </CardFooter>
      </>
    ),
  },
};

export const FormCard: Story = {
  args: {
    className: 'w-[350px]',
    children: (
      <>
        <CardHeader>
          <CardTitle>Formulario</CardTitle>
          <CardDescription>Complete los datos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nombre</label>
            <input 
              type="text" 
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" 
              placeholder="Ingrese su nombre"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input 
              type="email" 
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" 
              placeholder="Ingrese su email"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Enviar</Button>
        </CardFooter>
      </>
    ),
  },
};

export const InfoCard: Story = {
  args: {
    className: 'w-[350px]',
    children: (
      <>
        <CardHeader>
          <CardTitle>Información</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Nombre:</span>
            <span className="text-sm font-medium">Juan Pérez</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Email:</span>
            <span className="text-sm font-medium">juan@ejemplo.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Teléfono:</span>
            <span className="text-sm font-medium">+34 123 456 789</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" size="sm">Ver detalles</Button>
        </CardFooter>
      </>
    ),
  },
};