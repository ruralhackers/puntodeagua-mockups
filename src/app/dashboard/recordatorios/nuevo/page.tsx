'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BackButton } from '@/components/ui/back-button';
import Link from 'next/link';

export default function NuevoRecordatorioPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: '',
    tipoRegistro: '',
    periodicidad: '',
    fecha: '',
    descripcion: ''
  });

  const tiposRegistro = [
    { value: 'contador', label: 'Lectura de Contadores' },
    { value: 'mantenimiento', label: 'Mantenimiento' },
    { value: 'analitica', label: 'Análisis de Agua' }
  ];

  const periodicidades = [
    { value: 'unica', label: '1 vez' },
    { value: 'diaria', label: 'Todos los días' },
    { value: 'semanal', label: '1 vez a la semana' },
    { value: 'mensual', label: '1 vez al mes' },
    { value: 'trimestral', label: '1 vez cada 3 meses' },
    { value: 'semestral', label: '1 vez cada 6 meses' },
    { value: 'anual', label: '1 vez al año' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se procesaría el formulario
    console.log('Recordatorio creado:', formData);
    router.push('/dashboard');
  };

  return (
    <div className="px-4 py-4 pb-20">
      <div className="mb-4">
        <BackButton href="/dashboard/mas" />
      </div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Crear Recordatorio</h1>
        <p className="text-muted-foreground text-sm">
          Programa un recordatorio para realizar registros
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nuevo Recordatorio</CardTitle>
          <CardDescription>
            Los recordatorios te ayudarán a no olvidar realizar registros importantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título del Recordatorio</Label>
              <Input 
                id="titulo"
                placeholder="Ej: Lectura mensual de contadores"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Registro</Label>
              <Select 
                value={formData.tipoRegistro} 
                onValueChange={(value) => setFormData({ ...formData, tipoRegistro: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo de registro" />
                </SelectTrigger>
                <SelectContent>
                  {tiposRegistro.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Nota: Las incidencias no requieren recordatorios programados
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha de Inicio</Label>
              <Input 
                id="fecha"
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="periodicidad">Periodicidad</Label>
              <Select 
                value={formData.periodicidad} 
                onValueChange={(value) => setFormData({ ...formData, periodicidad: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la periodicidad" />
                </SelectTrigger>
                <SelectContent>
                  {periodicidades.map((periodo) => (
                    <SelectItem key={periodo.value} value={periodo.value}>
                      {periodo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción (Opcional)</Label>
              <Input 
                id="descripcion"
                placeholder="Descripción adicional del recordatorio"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard/mas">Cancelar</Link>
              </Button>
              <Button type="submit">Crear Recordatorio</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}