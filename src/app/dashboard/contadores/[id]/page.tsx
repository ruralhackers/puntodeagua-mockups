'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Edit, Save, X, MapPin, User, Droplets, Camera } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
  unidadMedida: string;
  fotoContador?: string;
}

// Datos de ejemplo - en una app real vendrían del backend
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
    referenciaContador: 'REF123456',
    unidadMedida: 'litros',
    fotoContador: 'contador_maria_001.jpg'
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
    referenciaContador: 'REF789012',
    unidadMedida: 'm3',
    fotoContador: undefined
  }
];

export default function ContadorDetallePage() {
  const params = useParams();
  const contadorId = params.id as string;
  
  const [isEditing, setIsEditing] = useState(false);
  const [contador, setContador] = useState<Contador | null>(
    contadoresEjemplo.find(c => c.id === contadorId) || null
  );
  const [editData, setEditData] = useState<Contador | null>(contador);

  if (!contador) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4">Contador no encontrado</h1>
          <Link href="/dashboard/contadores">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Contadores
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditData({ ...contador });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editData) {
      setContador(editData);
      setIsEditing(false);
      // Aquí se enviarían los datos al backend
      alert('Contador actualizado exitosamente');
    }
  };

  const handleCancel = () => {
    setEditData({ ...contador });
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Contador, value: string | number) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const displayData = isEditing ? editData : contador;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
          <Link href="/dashboard/contadores">
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight truncate">
              {displayData?.nombre} {displayData?.apellidos}
            </h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Detalles del contador • ID Usuario: {displayData?.idUsuario}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel} className="whitespace-nowrap">
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleSave} className="whitespace-nowrap">
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit} className="whitespace-nowrap">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Datos de la Persona */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Datos de la Persona
            </CardTitle>
            <CardDescription>
              Información personal del titular del contador
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idUsuario">ID Usuario</Label>
                {isEditing ? (
                  <Input
                    id="idUsuario"
                    type="number"
                    min="1"
                    value={editData?.idUsuario || ''}
                    onChange={(e) => handleInputChange('idUsuario', parseInt(e.target.value) || 0)}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{displayData?.idUsuario}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dni">DNI</Label>
                {isEditing ? (
                  <Input
                    id="dni"
                    value={editData?.dni || ''}
                    onChange={(e) => handleInputChange('dni', e.target.value.toUpperCase())}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{displayData?.dni}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                {isEditing ? (
                  <Input
                    id="nombre"
                    value={editData?.nombre || ''}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{displayData?.nombre}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                {isEditing ? (
                  <Input
                    id="apellidos"
                    value={editData?.apellidos || ''}
                    onChange={(e) => handleInputChange('apellidos', e.target.value)}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{displayData?.apellidos}</div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refCatastral">Referencia Catastral</Label>
              {isEditing ? (
                <Input
                  id="refCatastral"
                  value={editData?.refCatastral || ''}
                  onChange={(e) => handleInputChange('refCatastral', e.target.value)}
                />
              ) : (
                <div className="p-2 bg-muted rounded font-mono text-sm">{displayData?.refCatastral}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="coordenadasGPS">Coordenadas GPS</Label>
              <div className="flex gap-2">
                {isEditing ? (
                  <Input
                    id="coordenadasGPS"
                    value={editData?.coordenadasGPS || ''}
                    onChange={(e) => handleInputChange('coordenadasGPS', e.target.value)}
                    placeholder="40.4168, -3.7038 (opcional)"
                  />
                ) : (
                  <div className="flex-1 p-2 bg-muted rounded flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {displayData?.coordenadasGPS || 'No especificadas'}
                  </div>
                )}
                {!isEditing && displayData?.coordenadasGPS && (
                  <Button variant="outline" size="sm">
                    Ver en Mapa
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numPersonasCensadas">Personas Censadas</Label>
                {isEditing ? (
                  <Input
                    id="numPersonasCensadas"
                    type="number"
                    min="0"
                    value={editData?.numPersonasCensadas || 0}
                    onChange={(e) => handleInputChange('numPersonasCensadas', parseInt(e.target.value) || 0)}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{displayData?.numPersonasCensadas}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="numPersonasFlotantes">Personas Flotantes</Label>
                {isEditing ? (
                  <Input
                    id="numPersonasFlotantes"
                    type="number"
                    min="0"
                    value={editData?.numPersonasFlotantes || 0}
                    onChange={(e) => handleInputChange('numPersonasFlotantes', parseInt(e.target.value) || 0)}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded">{displayData?.numPersonasFlotantes}</div>
                )}
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Total de Personas</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {(displayData?.numPersonasCensadas || 0) + (displayData?.numPersonasFlotantes || 0)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Datos del Contador */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Datos del Contador
            </CardTitle>
            <CardDescription>
              Información técnica del contador de agua
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="referenciaContador">Referencia del Contador</Label>
                {isEditing ? (
                  <Input
                    id="referenciaContador"
                    value={editData?.referenciaContador || ''}
                    onChange={(e) => handleInputChange('referenciaContador', e.target.value)}
                    placeholder="REF123456 (opcional)"
                  />
                ) : (
                  <div className="p-2 bg-muted rounded font-mono">
                    {displayData?.referenciaContador || 'No especificada'}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Número de serie del contador (opcional por cambio futuro a telemetría)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unidadMedida">Unidad de Medida</Label>
                {isEditing ? (
                  <Select value={editData?.unidadMedida || 'litros'} onValueChange={(value) => handleInputChange('unidadMedida', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la unidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="litros">Litros</SelectItem>
                      <SelectItem value="m3">Metros cúbicos (m³)</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-2 bg-muted rounded">
                    {displayData?.unidadMedida === 'm3' ? 'Metros cúbicos (m³)' : 'Litros'}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Todos los valores se convierten a litros internamente
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fotoContador">Foto del Contador</Label>
              {isEditing ? (
                <div className="flex items-center gap-4">
                  <Input
                    id="fotoContador"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleInputChange('fotoContador', file.name);
                      }
                    }}
                    className="flex-1"
                  />
                  <Camera className="h-5 w-5 text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-2">
                  {displayData?.fotoContador ? (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded">
                      <Camera className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{displayData.fotoContador}</span>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Disponible</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded">
                      <Camera className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">No hay foto disponible</span>
                    </div>
                  )}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Foto de referencia del contador (formatos: JPG, PNG, máx. 5MB)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}