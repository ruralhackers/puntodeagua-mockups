'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, MapPin, User, Droplets, Camera } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ContadorFormData {
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

interface FormErrors {
  nombre?: string;
  apellidos?: string;
  dni?: string;
  refCatastral?: string;
  coordenadasGPS?: string;
  numPersonasCensadas?: string;
  numPersonasFlotantes?: string;
  referenciaContador?: string;
  unidadMedida?: string;
}

export default function NuevoContadorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContadorFormData>({
    idUsuario: 0,
    nombre: '',
    apellidos: '',
    dni: '',
    refCatastral: '',
    coordenadasGPS: '',
    numPersonasCensadas: 0,
    numPersonasFlotantes: 0,
    referenciaContador: '',
    unidadMedida: 'litros',
    fotoContador: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Función para generar el siguiente ID de usuario
  const generateIdUsuario = () => {
    // Simular obtener el siguiente ID disponible
    // En una implementación real, esto vendría del backend
    const nextId = Math.floor(Math.random() * 1000) + 1;
    setFormData(prev => ({ ...prev, idUsuario: nextId }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';
    if (!formData.dni.trim()) newErrors.dni = 'El DNI es obligatorio';
    if (!formData.refCatastral.trim()) newErrors.refCatastral = 'La referencia catastral es obligatoria';
    // ID de usuario se genera automáticamente

    // Validación del DNI (formato básico)
    const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    if (formData.dni && !dniRegex.test(formData.dni)) {
      newErrors.dni = 'Formato de DNI inválido';
    }

    // Validación de coordenadas GPS (formato básico) - solo si se proporciona
    const coordRegex = /^-?\d+\.\d+,\s*-?\d+\.\d+$/;
    if (formData.coordenadasGPS.trim() && !coordRegex.test(formData.coordenadasGPS)) {
      newErrors.coordenadasGPS = 'Formato de coordenadas inválido (ej: 40.4168, -3.7038)';
    }

    if (!formData.unidadMedida) {
      newErrors.unidadMedida = 'La unidad de medida es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Generar ID de usuario automáticamente si no está establecido
      if (formData.idUsuario === 0) {
        generateIdUsuario();
      }

      const updatedFormData = { ...formData };
      
      // Aquí se enviarían los datos al backend
      console.log('Datos del contador:', updatedFormData);
      alert('Contador creado exitosamente');
      router.push('/dashboard/contadores');
    }
  };

  const handleInputChange = (field: keyof ContadorFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    const errorField = field as keyof FormErrors;
    if (errors[errorField]) {
      setErrors(prev => ({ ...prev, [errorField]: undefined }));
    }
  };

  const handleNumberInputChange = (field: keyof ContadorFormData, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    const errorField = field as keyof FormErrors;
    if (errors[errorField]) {
      setErrors(prev => ({ ...prev, [errorField]: undefined }));
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <Link href="/dashboard/contadores">
          <Button variant="outline" size="sm" className="whitespace-nowrap w-fit">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div className="min-w-0">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Nuevo Contador</h1>
          <p className="text-muted-foreground text-sm lg:text-base">
            Registra un nuevo contador/punto de agua en el sistema
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
              {/* ID Usuario se genera automáticamente y no se muestra */}

              <div className="space-y-2">
                <Label htmlFor="dni">DNI *</Label>
                <Input
                  id="dni"
                  value={formData.dni}
                  onChange={(e) => handleInputChange('dni', e.target.value.toUpperCase())}
                  placeholder="12345678A"
                  className={errors.dni ? 'border-red-500' : ''}
                />
                {errors.dni && <p className="text-sm text-red-500">{errors.dni}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  placeholder="María"
                  className={errors.nombre ? 'border-red-500' : ''}
                />
                {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos *</Label>
                <Input
                  id="apellidos"
                  value={formData.apellidos}
                  onChange={(e) => handleInputChange('apellidos', e.target.value)}
                  placeholder="García López"
                  className={errors.apellidos ? 'border-red-500' : ''}
                />
                {errors.apellidos && <p className="text-sm text-red-500">{errors.apellidos}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refCatastral">Referencia Catastral *</Label>
              <Input
                id="refCatastral"
                value={formData.refCatastral}
                onChange={(e) => handleInputChange('refCatastral', e.target.value)}
                placeholder="1234567890123456789012"
                className={errors.refCatastral ? 'border-red-500' : ''}
              />
              {errors.refCatastral && <p className="text-sm text-red-500">{errors.refCatastral}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="coordenadasGPS">Coordenadas GPS</Label>
              <div className="flex gap-2">
                <Input
                  id="coordenadasGPS"
                  value={formData.coordenadasGPS}
                  onChange={(e) => handleInputChange('coordenadasGPS', e.target.value)}
                  placeholder="40.4168, -3.7038 (opcional)"
                  className={errors.coordenadasGPS ? 'border-red-500' : ''}
                />
                <Button type="button" variant="outline">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              {errors.coordenadasGPS && <p className="text-sm text-red-500">{errors.coordenadasGPS}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numPersonasCensadas">Personas Censadas</Label>
                <Input
                  id="numPersonasCensadas"
                  type="number"
                  min="0"
                  value={formData.numPersonasCensadas}
                  onChange={(e) => handleInputChange('numPersonasCensadas', parseInt(e.target.value) || 0)}
                  placeholder="4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numPersonasFlotantes">Personas Flotantes</Label>
                <Input
                  id="numPersonasFlotantes"
                  type="number"
                  min="0"
                  value={formData.numPersonasFlotantes}
                  onChange={(e) => handleInputChange('numPersonasFlotantes', parseInt(e.target.value) || 0)}
                  placeholder="1"
                />
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
                <Input
                  id="referenciaContador"
                  value={formData.referenciaContador}
                  onChange={(e) => handleInputChange('referenciaContador', e.target.value)}
                  placeholder="REF123456 (opcional)"
                />
                <p className="text-xs text-muted-foreground">
                  Número de serie del contador (opcional por cambio futuro a telemetría)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unidadMedida">Unidad de Medida *</Label>
                <Select value={formData.unidadMedida} onValueChange={(value) => handleInputChange('unidadMedida', value)}>
                  <SelectTrigger className={errors.unidadMedida ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecciona la unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="litros">Litros</SelectItem>
                    <SelectItem value="m3">Metros cúbicos (m³)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.unidadMedida && <p className="text-sm text-red-500">{errors.unidadMedida}</p>}
                <p className="text-xs text-muted-foreground">
                  Todos los valores se convertirán a litros internamente
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fotoContador">Foto del Contador (Opcional)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="fotoContador"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // En una aplicación real, aquí subirías el archivo
                      // Por ahora, solo guardamos el nombre del archivo
                      handleInputChange('fotoContador', file.name);
                    }
                  }}
                  className="flex-1"
                />
                <Camera className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Sube una foto del contador para referencia futura (formatos: JPG, PNG, máx. 5MB)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/contadores">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Guardar Contador
          </Button>
        </div>
      </form>
    </div>
  );
}