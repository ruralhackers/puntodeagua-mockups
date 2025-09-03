'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

export default function NuevaIncidenciaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    descripcion: '',
    estado: 'abierta',
    fechaApertura: new Date().toISOString().split('T')[0],
    fechaResolucion: '',
    personaFirma: '',
    zona: ''
  });

  // Prellenar formulario si vienen datos por URL
  useEffect(() => {
    const descripcion = searchParams.get('descripcion');
    const estado = searchParams.get('estado');
    const zona = searchParams.get('zona');
    const personaFirma = searchParams.get('personaFirma');
    const fechaApertura = searchParams.get('fechaApertura');
    const fechaResolucion = searchParams.get('fechaResolucion');

    if (descripcion || estado || zona || personaFirma || fechaApertura || fechaResolucion) {
      setFormData({
        descripcion: descripcion || '',
        estado: estado || 'abierta',
        fechaApertura: fechaApertura || new Date().toISOString().split('T')[0],
        fechaResolucion: fechaResolucion || '',
        personaFirma: personaFirma || '',
        zona: zona || ''
      });
    }
  }, [searchParams]);

  const zonas = ['Os Casas', 'Centro', 'Ramis'];
  const estados = [
    { value: 'abierta', label: 'Abierta', color: 'text-red-600' },
    { value: 'cerrada', label: 'Cerrada', color: 'text-green-600' }
  ];

  // Detectar si hay cambios sin guardar
  const hayDatosSinGuardar = () => {
    return formData.descripcion !== '' || 
           formData.personaFirma !== '' || 
           formData.zona !== '' ||
           (formData.estado === 'cerrada' && formData.fechaResolucion !== '');
  };

  // Manejar navegación con confirmación
  const manejarVolver = () => {
    if (hayDatosSinGuardar()) {
      if (window.confirm('¿Estás seguro de que quieres salir? Los datos no guardados se perderán.')) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Si cambia a abierta, limpiar fecha de resolución
      ...(name === 'estado' && value === 'abierta' ? { fechaResolucion: '' } : {})
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos de la incidencia:', formData);
    router.push('/dashboard/registros');
  };

  return (
    <div className="px-3 py-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={manejarVolver}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nueva Incidencia</h1>
          <p className="text-gray-600">Registra una nueva incidencia en el sistema</p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Básica y Descripción */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-300 pb-3 mb-4">📋 Información Básica</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zona" className="text-slate-700 font-medium">Zona *</Label>
              <Select value={formData.zona} onValueChange={(value) => handleSelectChange('zona', value)}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Selecciona la zona" />
                </SelectTrigger>
                <SelectContent>
                  {zonas.map((zona) => (
                    <SelectItem key={zona} value={zona}>{zona}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="personaFirma" className="text-slate-700 font-medium">Persona que Firma *</Label>
              <Input
                id="personaFirma"
                name="personaFirma"
                type="text"
                value={formData.personaFirma}
                onChange={handleInputChange}
                required
                placeholder="Nombre de quien firma la incidencia"
                className="mt-1"
              />
            </div>
          </div>

          {/* Descripción dentro de Información Básica */}
          <div className="mt-6 pt-4 border-t border-slate-300">
            <Label htmlFor="descripcion" className="text-slate-700 font-medium">Descripción de la Incidencia *</Label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              required
              rows={5}
              placeholder="Describe detalladamente la incidencia, incluyendo ubicación específica, síntomas observados, posibles causas y cualquier información relevante..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 mt-2 resize-vertical"
            />
            <p className="text-xs text-slate-600 mt-1">
              Proporciona todos los detalles posibles para facilitar la resolución
            </p>
          </div>
        </div>

        {/* Estado y Fechas */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-blue-800 border-b border-blue-300 pb-3 mb-4">📅 Estado y Fechas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Estado */}
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <Label className="text-blue-700 font-medium">Estado *</Label>
              <Select value={formData.estado} onValueChange={(value) => handleSelectChange('estado', value)}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {estados.map((estado) => (
                    <SelectItem key={estado.value} value={estado.value}>
                      <div className="flex items-center gap-2">
                        {estado.value === 'abierta' ? (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <span className={estado.color}>{estado.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fecha de Apertura */}
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <Label htmlFor="fechaApertura" className="text-blue-700 font-medium">Fecha de Apertura *</Label>
              <Input
                id="fechaApertura"
                name="fechaApertura"
                type="date"
                value={formData.fechaApertura}
                onChange={handleInputChange}
                required
                className="mt-2"
              />
            </div>

            {/* Fecha de Resolución */}
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <Label htmlFor="fechaResolucion" className="text-blue-700 font-medium">
                Fecha de Resolución {formData.estado === 'cerrada' ? '*' : ''}
              </Label>
              <Input
                id="fechaResolucion"
                name="fechaResolucion"
                type="date"
                value={formData.fechaResolucion}
                onChange={handleInputChange}
                required={formData.estado === 'cerrada'}
                disabled={formData.estado === 'abierta'}
                className={`mt-2 ${formData.estado === 'abierta' ? 'bg-gray-100' : ''}`}
              />
              {formData.estado === 'abierta' && (
                <p className="text-xs text-gray-500 mt-1">
                  Solo disponible cuando el estado es "Cerrada"
                </p>
              )}
            </div>
          </div>

          {/* Indicador visual del estado */}
          <div className={`p-4 rounded-lg border-2 ${
            formData.estado === 'abierta' 
              ? 'bg-red-50 border-red-200' 
              : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-center gap-3">
              {formData.estado === 'abierta' ? (
                <AlertCircle className="h-6 w-6 text-red-600" />
              ) : (
                <CheckCircle className="h-6 w-6 text-green-600" />
              )}
              <div>
                <h4 className={`font-semibold ${
                  formData.estado === 'abierta' ? 'text-red-800' : 'text-green-800'
                }`}>
                  {formData.estado === 'abierta' ? '🔴 Incidencia Abierta' : '✅ Incidencia Cerrada'}
                </h4>
                <p className={`text-sm ${
                  formData.estado === 'abierta' ? 'text-red-700' : 'text-green-700'
                }`}>
                  {formData.estado === 'abierta' 
                    ? 'Esta incidencia requiere atención y seguimiento'
                    : 'Esta incidencia ha sido resuelta satisfactoriamente'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>



        {/* Resumen de la Incidencia */}
        {(formData.descripcion || formData.zona || formData.personaFirma) && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Resumen de la Incidencia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Zona:</span>
                <span className="ml-2 text-gray-900">{formData.zona || 'No especificada'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Estado:</span>
                <span className={`ml-2 font-medium ${
                  formData.estado === 'abierta' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {formData.estado === 'abierta' ? 'Abierta' : 'Cerrada'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Fecha de apertura:</span>
                <span className="ml-2 text-gray-900">{formData.fechaApertura}</span>
              </div>
              {formData.fechaResolucion && (
                <div>
                  <span className="font-medium text-gray-700">Fecha de resolución:</span>
                  <span className="ml-2 text-gray-900">{formData.fechaResolucion}</span>
                </div>
              )}
              <div className="md:col-span-2">
                <span className="font-medium text-gray-700">Firmado por:</span>
                <span className="ml-2 text-gray-900">{formData.personaFirma || 'No especificado'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={manejarVolver}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1"
          >
            Registrar Incidencia
          </Button>
        </div>
      </form>
    </div>
  );
}