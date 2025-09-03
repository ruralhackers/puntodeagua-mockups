'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Upload, MapPin, User, Droplets } from 'lucide-react';
import Link from 'next/link';
import { BackButton } from '@/components/ui/back-button';

interface Contador {
  id: string;
  idUsuario: number;
  nombre: string;
  apellidos: string;
  dni: string;
  refCatastral: string;
  coordenadasGPS: string;
  numPersonasCensadas: number;
  numPersonasFlotantes: number;
  referenciaContador: string;
}

const contadoresEjemplo: Contador[] = [
  {
    id: '1',
    idUsuario: 1,
    nombre: 'María',
    apellidos: 'García López',
    dni: '12345678A',
    refCatastral: '1234567890123456789012',
    coordenadasGPS: '40.4168, -3.7038',
    numPersonasCensadas: 4,
    numPersonasFlotantes: 1,
    referenciaContador: 'REF123456'
  },
  {
    id: '2',
    idUsuario: 2,
    nombre: 'José',
    apellidos: 'Martínez Ruiz',
    dni: '87654321B',
    refCatastral: '9876543210987654321098',
    coordenadasGPS: '40.4200, -3.7100',
    numPersonasCensadas: 2,
    numPersonasFlotantes: 0,
    referenciaContador: 'REF789012'
  }
];

export default function ContadoresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contadores] = useState<Contador[]>(contadoresEjemplo);

  const filteredContadores = contadores.filter(contador =>
    contador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contador.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contador.dni.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contador.idUsuario.toString().includes(searchTerm)
  );



  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-4">
        <BackButton href="/dashboard/mas" />
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold tracking-tight truncate">Contadores</h1>
          <p className="text-muted-foreground">
            Gestiona los contadores y puntos de agua de la comunidad
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
            <Upload className="h-4 w-4" />
            Importar CSV
          </Button>
          <Link href="/dashboard/contadores/nuevo">
            <Button className="flex items-center gap-2 whitespace-nowrap">
              <Plus className="h-4 w-4" />
              Nuevo Contador
            </Button>
          </Link>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contadores</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contadores.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por nombre, DNI o ID contador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Lista de contadores */}
      <div className="space-y-3">
        {filteredContadores.map((contador) => (
          <Card key={contador.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg truncate">
                      {contador.nombre} {contador.apellidos}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                       DNI: {contador.dni} • ID Usuario: {contador.idUsuario}
                     </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 min-w-0">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{contador.coordenadasGPS}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 flex-shrink-0" />
                      <span>{contador.numPersonasCensadas + contador.numPersonasFlotantes} personas</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link href={`/dashboard/contadores/${contador.id}`}>
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                      Ver Detalles
                    </Button>
                  </Link>
                  <Link href={`/dashboard/contadores/${contador.id}`}>
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                      Editar
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContadores.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No se encontraron contadores</p>
        </div>
      )}
    </div>
  );
}