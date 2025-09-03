'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Search, Plus, User, Mail, Phone, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { BackButton } from '@/components/ui/back-button';

export default function UsuariosPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo
  const usuarios = [
    {
      id: 1,
      nombre: 'María García',
      email: 'maria.garcia@email.com',
      telefono: '666 123 456',
      rol: 'administrador',
      usuario: 'mgarcia',
      activo: true,
      ultimoAcceso: '2024-01-15'
    },
    {
      id: 2,
      nombre: 'José Rodríguez',
      email: 'jose.rodriguez@email.com',
      telefono: '666 789 012',
      rol: 'operario',
      usuario: 'jrodriguez',
      activo: true,
      ultimoAcceso: '2024-01-14'
    },
    {
      id: 3,
      nombre: 'Ana López',
      email: 'ana.lopez@email.com',
      telefono: '666 345 678',
      rol: 'vecino',
      usuario: 'alopez',
      activo: false,
      ultimoAcceso: '2024-01-10'
    },
    {
      id: 4,
      nombre: 'Carlos Fernández',
      email: 'carlos.fernandez@email.com',
      telefono: '666 901 234',
      rol: 'lectura',
      usuario: 'cfernandez',
      activo: true,
      ultimoAcceso: '2024-01-13'
    }
  ];

  const getRolColor = (rol: string) => {
    switch (rol) {
      case 'administrador': return 'bg-red-100 text-red-800';
      case 'operario': return 'bg-blue-100 text-blue-800';
      case 'lectura': return 'bg-gray-100 text-gray-800';
      case 'vecino': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.usuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-4">
        <BackButton href="/dashboard/mas" />
      </div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold tracking-tight truncate">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Administra los usuarios del sistema y sus permisos
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button asChild className="whitespace-nowrap">
            <Link href="/dashboard/usuarios/nuevo">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </Link>
          </Button>
        </div>
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{usuarios.length}</div>
            <div className="text-sm text-gray-600">Total usuarios</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{usuarios.filter(u => u.activo).length}</div>
            <div className="text-sm text-gray-600">Activos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{usuarios.filter(u => u.rol === 'administrador').length}</div>
            <div className="text-sm text-gray-600">Administradores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{usuarios.filter(u => u.rol === 'operario').length}</div>
            <div className="text-sm text-gray-600">Operarios</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de usuarios */}
      <div className="space-y-3">
        {filteredUsuarios.map((usuario) => (
          <Card key={usuario.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{usuario.nombre}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getRolColor(usuario.rol)}`}>
                        {usuario.rol}
                      </span>
                      {!usuario.activo && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Inactivo</span>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {usuario.email}
                      </div>
                      {usuario.telefono && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {usuario.telefono}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Usuario: {usuario.usuario} • Último acceso: {usuario.ultimoAcceso}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsuarios.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No se encontraron usuarios</p>
        </div>
      )}
    </div>
  );
}