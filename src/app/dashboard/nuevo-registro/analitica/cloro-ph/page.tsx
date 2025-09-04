'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { FormHeader } from '@/components/ui/form-header';
import { useTabBar } from '@/contexts/TabBarContext';

interface FormData {
  fecha: string;
  persona: string;
  resultadoCloro: string;
  zona: string;
  resultadoPh: string;
  notas: string;
  archivo: File | null;
}

export default function CloroPhPage() {
  const router = useRouter();
  const { hideTabBar, showTabBar } = useTabBar();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fecha: new Date().toISOString().split('T')[0],
    persona: '',
    resultadoCloro: '',
    zona: '',
    resultadoPh: '',
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
    if (name === 'resultadoCloro' && parseFloat(value) > 1.5) {
      setMostrarAdvertencia(true);
    } else if (name === 'resultadoPh' && (parseFloat(value) < 6.5 || parseFloat(value) > 8.5)) {
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
      formData.persona.trim() !== '' &&
      formData.resultadoCloro !== '' &&
      formData.resultadoPh !== ''
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
    <div className="min-h-screen bg-background">
      <FormHeader
        tipoRegistro="Cloro y pH"
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
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-3 mb-4">📊 Parámetros</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="resultadoCloro">Resultado de Cloro (mg/L)</Label>
              <Input 
                id="resultadoCloro" 
                name="resultadoCloro" 
                type="number" 
                step="0.01" 
                placeholder="Nivel de cloro" 
                value={formData.resultadoCloro} 
                onChange={handleInputChange} 
                required 
              />
            </div>

            <div>
              <Label htmlFor="resultadoPh">Resultado de pH</Label>
              <Input 
                id="resultadoPh" 
                name="resultadoPh" 
                type="number" 
                step="0.1" 
                placeholder="Nivel de pH" 
                value={formData.resultadoPh} 
                onChange={handleInputChange} 
                required 
              />
            </div>

            {mostrarAdvertencia && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Advertencia</AlertTitle>
                <AlertDescription>
                  Los valores ingresados superan los niveles recomendados. Por favor, verifique los datos.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Observaciones */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-3 mb-4">📝 Observaciones</h2>
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