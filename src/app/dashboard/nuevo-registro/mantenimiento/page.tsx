'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function NuevoMantenimientoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    objetoMantenimiento: '',
    otroObjeto: '',
    fechaRealizacion: '',
    descripcionNotas: '',
    personaEmpresa: '',
    zona: '',
    proveedor: '',
    archivo: null as File | null
  });

  const objetosMantenimiento = [
    'Depósito',
    'Manantiales',
    'Pozos',
    'Bombas',
    'Otros'
  ];

  const zonas = [
    'Os Casas',
    'Centro',
    'Ramis'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      archivo: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del mantenimiento:', formData);
    // Aquí iría la lógica para guardar el mantenimiento
    router.push('/dashboard/registros/mantenimiento');
  };

  return (
    <div className="px-3 py-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Mantenimiento</h1>
          <p className="text-gray-600">Registra una actividad de mantenimiento</p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Básica */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-300 pb-3 mb-4">📋 Información Básica</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="objetoMantenimiento">Objeto del Mantenimiento *</Label>
              <select
                id="objetoMantenimiento"
                name="objetoMantenimiento"
                value={formData.objetoMantenimiento}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              >
                <option value="">Selecciona el objeto del mantenimiento</option>
                {objetosMantenimiento.map((objeto) => (
                  <option key={objeto} value={objeto}>{objeto}</option>
                ))}
              </select>
            </div>

            {formData.objetoMantenimiento === 'Otros' && (
              <div>
                <Label htmlFor="otroObjeto">Especifica el objeto *</Label>
                <Input
                  id="otroObjeto"
                  name="otroObjeto"
                  value={formData.otroObjeto}
                  onChange={handleInputChange}
                  required
                  placeholder="Describe el objeto del mantenimiento"
                />
              </div>
            )}

            <div>
              <Label htmlFor="fechaRealizacion">Fecha de Realización *</Label>
              <Input
                id="fechaRealizacion"
                name="fechaRealizacion"
                type="date"
                value={formData.fechaRealizacion}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="personaEmpresa">Persona/Empresa que realiza el mantenimiento *</Label>
              <Input
                id="personaEmpresa"
                name="personaEmpresa"
                value={formData.personaEmpresa}
                onChange={handleInputChange}
                required
                placeholder="Nombre de la persona o empresa responsable"
              />
            </div>

            <div>
              <Label htmlFor="zona">Zona del Mantenimiento *</Label>
              <select
                id="zona"
                name="zona"
                value={formData.zona}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              >
                <option value="">Selecciona la zona</option>
                {zonas.map((zona) => (
                  <option key={zona} value={zona}>{zona}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="proveedor">Proveedor del Producto (opcional)</Label>
              <Input
                id="proveedor"
                name="proveedor"
                value={formData.proveedor}
                onChange={handleInputChange}
                placeholder="Nombre del proveedor si se utilizó algún producto"
              />
            </div>
          </div>
        </div>

        {/* Descripción/Notas */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-blue-800 border-b border-blue-300 pb-3 mb-4">📝 Descripción/Notas</h2>
          
          <div>
            <Label htmlFor="descripcionNotas">Descripción del mantenimiento *</Label>
            <Textarea
              id="descripcionNotas"
              name="descripcionNotas"
              value={formData.descripcionNotas}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Describe detalladamente las actividades de mantenimiento realizadas"
            />
          </div>
        </div>

        {/* Documentación */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-amber-800 border-b border-amber-300 pb-3 mb-4">📎 Documentación</h2>
          
          <div>
            <Label htmlFor="archivo">Subir archivo (fotos, videos, PDFs)</Label>
            <Input
              id="archivo"
              name="archivo"
              type="file"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf,.mp4,.mov"
            />
            <p className="text-sm text-amber-600 mt-1">
              Formatos permitidos: JPG, PNG, PDF, MP4, MOV
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
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
          >
            Guardar Mantenimiento
          </Button>
        </div>
      </form>
    </div>
  );
}