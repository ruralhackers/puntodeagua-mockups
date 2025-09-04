import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

const FormStates = () => {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Estados de Componentes de Formulario</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div>
            <div className="text-sm font-medium mb-2">Estado Normal</div>
            <Input placeholder="Input normal" />
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Filled</div>
            <Input defaultValue="Texto ingresado" className="bg-button-secondary" />
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Focus</div>
            <Input className="ring-2 ring-ring ring-offset-2" placeholder="Input con focus" />
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Disabled</div>
            <Input disabled placeholder="Input deshabilitado" />
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Error</div>
            <Input className="border-destructive focus:ring-destructive" placeholder="Input con error" />
            <p className="text-xs text-destructive mt-1">Este campo es requerido</p>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Readonly</div>
            <Input readOnly defaultValue="Valor de solo lectura" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Select</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div>
            <div className="text-sm font-medium mb-2">Estado Normal</div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Opción 1</SelectItem>
                <SelectItem value="option2">Opción 2</SelectItem>
                <SelectItem value="option3">Opción 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Selected</div>
            <Select defaultValue="option2">
              <SelectTrigger className="bg-button-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Opción 1</SelectItem>
                <SelectItem value="option2">Opción 2</SelectItem>
                <SelectItem value="option3">Opción 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Disabled</div>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select deshabilitado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Opción 1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Error</div>
            <Select>
              <SelectTrigger className="border-destructive focus:ring-destructive">
                <SelectValue placeholder="Select con error" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Opción 1</SelectItem>
                <SelectItem value="option2">Opción 2</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive mt-1">Debe seleccionar una opción</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Textarea</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div>
            <div className="text-sm font-medium mb-2">Estado Normal</div>
            <Textarea placeholder="Textarea normal" />
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Filled</div>
            <Textarea defaultValue="Texto ingresado en textarea" className="bg-button-secondary" />
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Focus</div>
            <Textarea className="ring-2 ring-ring ring-offset-2" placeholder="Textarea con focus" />
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Disabled</div>
            <Textarea disabled placeholder="Textarea deshabilitado" />
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Error</div>
            <Textarea className="border-destructive focus:ring-destructive" placeholder="Textarea con error" />
            <p className="text-xs text-destructive mt-1">Este campo es requerido</p>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Estado Readonly</div>
            <Textarea readOnly defaultValue="Valor de solo lectura" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Checkbox</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div className="flex items-center space-x-2">
            <Checkbox id="checkbox-default" />
            <Label htmlFor="checkbox-default">Estado Normal</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="checkbox-checked" defaultChecked />
            <Label htmlFor="checkbox-checked">Estado Checked</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="checkbox-disabled" disabled />
            <Label htmlFor="checkbox-disabled" className="text-muted-foreground">Estado Disabled</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="checkbox-disabled-checked" disabled defaultChecked />
            <Label htmlFor="checkbox-disabled-checked" className="text-muted-foreground">Estado Disabled Checked</Label>
          </div>
        </div>
      </section>

      {/* Nota: La sección de Radio Group se ha eliminado porque el componente no existe en el proyecto */}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Formulario Completo</h2>
        <div className="border rounded-lg p-6 max-w-2xl">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Nombre completo</Label>
              <Input id="full-name" defaultValue="Juan Pérez" className="bg-button-secondary" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="ejemplo@correo.com" className="border-destructive focus:ring-destructive" />
              <p className="text-xs text-destructive">Correo electrónico inválido</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select defaultValue="user">
                <SelectTrigger id="role" className="bg-button-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="guest">Invitado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comments">Comentarios</Label>
              <Textarea id="comments" defaultValue="Comentarios adicionales sobre el usuario" className="bg-button-secondary" />            
            </div>
            
            <div className="space-y-2">
              <Label>Notificaciones</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifications-email" defaultChecked />
                  <Label htmlFor="notifications-email">Correo electrónico</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifications-sms" />
                  <Label htmlFor="notifications-sms">SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifications-push" defaultChecked />
                  <Label htmlFor="notifications-push">Notificaciones push</Label>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end space-x-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar cambios</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const meta: Meta = {
  title: 'Design System/Estados de Formulario',
  component: FormStates,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const EstadosDeFormulario: Story = {};