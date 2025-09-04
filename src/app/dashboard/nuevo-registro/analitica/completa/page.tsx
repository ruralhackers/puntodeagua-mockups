'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { FormHeader } from '@/components/ui/form-header';
import { useTabBar } from '@/contexts/TabBarContext';

interface FormData {
  fecha: string;
  proveedor: string;
  notas: string;
  archivo: File | null;
}

export default function CompletaPage() {
  const router = useRouter();
  const { hideTabBar, showTabBar } = useTabBar();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fecha: new Date().toISOString().split('T')[0],
    proveedor: '',
    notas: '',
    archivo: null
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        archivo: e.target.files[0]
      });
    }
  };

  // Esconder TabBar al montar el componente
  useEffect(() => {
    hideTabBar();
    return () => {
      showTabBar();
    };
  }, [hideTabBar, showTabBar]);

  // Validar campos obligatorios
  const isFormValid = () => {
    return (
      formData.fecha !== '' &&
      formData.proveedor.trim() !== ''
    );
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que quieres cancelar? Los datos no guardados se perderán.')) {
      router.back();
    }
  };

  const handleSave = async () => {
    if (!isFormValid()) return;
    
    setIsLoading(true);
    try {
      console.log('Datos enviados:', formData);
      // Aquí iría la lógica para enviar los datos al servidor
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular guardado
      router.push('/dashboard');
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader
        tipoRegistro="Analítica Completa"
        onCancel={handleCancel}
        onSave={handleSave}
        canSave={isFormValid()}
        isLoading={isLoading}
      />

      <div className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Básica */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-300 pb-3 mb-4">📋 Información Básica</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="fecha">Fecha</Label>
              <Input 
                id="fecha" 
                name="fecha" 
                type="date" 
                value={formData.fecha} 
                onChange={handleInputChange} 
                required 
              />
            </div>

            <div>
              <Label htmlFor="proveedor">Proveedor/Laboratorio</Label>
              <Input 
                id="proveedor" 
                name="proveedor" 
                type="text" 
                placeholder="Nombre del proveedor o laboratorio" 
                value={formData.proveedor} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </div>
        </div>

        {/* Observaciones */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-amber-800 border-b border-amber-300 pb-3 mb-4">📝 Observaciones</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="notas">Notas</Label>
              <Textarea 
                id="notas" 
                name="notas" 
                placeholder="Observaciones adicionales" 
                value={formData.notas} 
                onChange={handleInputChange} 
              />
            </div>

            <div>
              <Label htmlFor="archivo">Subir archivo (opcional)</Label>
              <Input 
                id="archivo" 
                name="archivo" 
                type="file" 
                onChange={handleFileChange} 
              />
            </div>
          </div>
         </div>

        </form>
      </div>
    </div>
  );
}