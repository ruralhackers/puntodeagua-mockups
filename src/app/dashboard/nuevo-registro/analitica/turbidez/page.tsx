'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface FormData {
  fecha: string;
  persona: string;
  resultadoTurbidez: string;
  zona: string;
  notas: string;
  archivo: File | null;
}

export default function TurbidezPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fecha: new Date().toISOString().split('T')[0],
    persona: '',
    resultadoTurbidez: '',
    zona: '',
    notas: '',
    archivo: null
  });

  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Verificar si los valores superan los niveles permitidos
    if (name === 'resultadoTurbidez' && parseFloat(value) > 5) {
      setMostrarAdvertencia(true);
    } else {
      setMostrarAdvertencia(false);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
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
        <h1 className="text-xl font-semibold">Registro de Turbidez</h1>
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
              <Label htmlFor="persona">Persona que realiza</Label>
              <Input 
                id="persona" 
                name="persona" 
                type="text" 
                placeholder="Nombre de la persona" 
                value={formData.persona} 
                onChange={handleInputChange} 
                required 
              />
            </div>

            <div>
              <Label htmlFor="zona">Zona de la medición</Label>
              <Select 
                value={formData.zona} 
                onValueChange={(value) => handleSelectChange('zona', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la zona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="os-casas">Os Casas</SelectItem>
                  <SelectItem value="centro">Centro</SelectItem>
                  <SelectItem value="ramis">Ramis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Parámetros */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-blue-800 border-b border-blue-300 pb-3 mb-4">📊 Parámetros</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="resultadoTurbidez">Resultado de Turbidez (NTU)</Label>
              <Input 
                id="resultadoTurbidez" 
                name="resultadoTurbidez" 
                type="number" 
                step="0.01" 
                placeholder="Nivel de turbidez" 
                value={formData.resultadoTurbidez} 
                onChange={handleInputChange} 
                required 
              />
            </div>

            {mostrarAdvertencia && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Advertencia</AlertTitle>
                <AlertDescription>
                  El valor de turbidez supera los 5 NTU recomendados. Por favor, verifique el dato.
                </AlertDescription>
              </Alert>
            )}
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