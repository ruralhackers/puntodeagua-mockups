'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Mail, Lock, Users } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function NuevoUsuarioPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    rol: '',
    usuario: '',
    password: '',
    confirmPassword: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateUsername = () => {
    if (formData.nombre && formData.apellidos) {
      const username = (formData.nombre.charAt(0) + formData.apellidos.split(' ')[0]).toLowerCase();
      handleInputChange('usuario', username);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    handleInputChange('password', password);
    handleInputChange('confirmPassword', password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular creación de usuario
    setShowSuccess(true);
    setTimeout(() => {
      router.push('/dashboard/usuarios');
    }, 2000);
  };

  return (
    <div className="p-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Alta de nuevo usuario</h1>
      </div>

      {showSuccess && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <User className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Usuario creado exitosamente. Redirigiendo...
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Personal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Personal
            </CardTitle>
            <CardDescription>
              Datos básicos del nuevo usuario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  placeholder="Nombre del usuario"
                  required
                />
              </div>
              <div>
                <Label htmlFor="apellidos">Apellidos *</Label>
                <Input
                  id="apellidos"
                  value={formData.apellidos}
                  onChange={(e) => handleInputChange('apellidos', e.target.value)}
                  placeholder="Apellidos del usuario"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  placeholder="666 123 456"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="rol">Rol en la comunidad *</Label>
              <Select value={formData.rol} onValueChange={(value) => handleInputChange('rol', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el rol del usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrador">Administrador</SelectItem>
                  <SelectItem value="operario">Operario</SelectItem>
                  <SelectItem value="lectura">Solo lectura</SelectItem>
                  <SelectItem value="vecino">Vecino/Usuario</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Credenciales de Acceso */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Credenciales de Acceso
            </CardTitle>
            <CardDescription>
              Usuario y contraseña para acceder a la aplicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="usuario">Nombre de usuario *</Label>
              <div className="flex gap-2">
                <Input
                  id="usuario"
                  value={formData.usuario}
                  onChange={(e) => handleInputChange('usuario', e.target.value)}
                  placeholder="usuario123"
                  required
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={generateUsername}
                  disabled={!formData.nombre || !formData.apellidos}
                >
                  Generar
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="password">Contraseña *</Label>
              <div className="flex gap-2">
                <Input
                  id="password"
                  type="text"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Contraseña segura"
                  required
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={generatePassword}
                >
                  Generar
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
              <Input
                id="confirmPassword"
                type="text"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Repetir contraseña"
                required
              />
            </div>

            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  Las contraseñas no coinciden
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="flex gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="flex-1"
            disabled={!formData.nombre || !formData.apellidos || !formData.email || !formData.rol || !formData.usuario || !formData.password || formData.password !== formData.confirmPassword}
          >
            Crear Usuario
          </Button>
        </div>
      </form>
    </div>
  );
}