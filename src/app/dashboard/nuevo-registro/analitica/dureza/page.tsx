'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface FormData {
  fecha: string;
  proveedor: string;
  notas: string;
  archivo: File | null;
}

export default function DurezaPage() {
  const router = useRouter();
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí iría la lógica para enviar los datos al servidor
    router.push('/dashboard');
  };

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold">Registro de Dureza</h1>
      </div>

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

        <Button type="submit" className="w-full" size="lg">
          Guardar Registro
        </Button>
      </form>
    </div>
  );
}