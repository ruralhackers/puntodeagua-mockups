'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, AlertTriangle, CheckCircle, Users, Calendar, Search } from 'lucide-react';
import { FormHeader } from '@/components/ui/form-header';
import { useTabBar } from '@/contexts/TabBarContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function NuevoContadorPage() {
  const router = useRouter();
  const { hideTabBar, showTabBar } = useTabBar();
  const [isLoading, setIsLoading] = useState(false);
  const [zonaSeleccionada, setZonaSeleccionada] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<any>(null);
  const [busquedaUsuario, setBusquedaUsuario] = useState('');
  const [formData, setFormData] = useState({
    fechaActual: new Date().toISOString().split('T')[0],
    lecturaActual: '',
    observaciones: ''
  });

  // Datos de ejemplo
  const zonas = ['Os Casas', 'Centro', 'Ramis'];
  
  const usuariosPorZona = {
    'Os Casas': [
      { id: 1, nombre: 'María García', apodo: 'Casa del Río', ultimaLectura: '2024-01-15', lecturaAnterior: 125.5, personasRegistradas: 4 },
      { id: 2, nombre: 'José Fernández', apodo: 'El Molino', ultimaLectura: '2024-01-10', lecturaAnterior: 89.2, personasRegistradas: 2 },
      { id: 3, nombre: 'Ana Rodríguez', apodo: 'Casa Verde', ultimaLectura: '2024-01-12', lecturaAnterior: 156.8, personasRegistradas: 5 }
    ],
    'Centro': [
      { id: 4, nombre: 'Carlos López', apodo: 'Panadería Central', ultimaLectura: '2024-01-14', lecturaAnterior: 234.1, personasRegistradas: 3 },
      { id: 5, nombre: 'Elena Martín', apodo: 'Casa Azul', ultimaLectura: '2024-01-11', lecturaAnterior: 178.9, personasRegistradas: 6 },
      { id: 6, nombre: 'Pedro Sánchez', apodo: 'Bar Central', ultimaLectura: '2024-01-13', lecturaAnterior: 312.4, personasRegistradas: 8 }
    ],
    'Ramis': [
      { id: 7, nombre: 'Lucía Gómez', apodo: 'Finca Alta', ultimaLectura: '2024-01-09', lecturaAnterior: 67.3, personasRegistradas: 2 },
      { id: 8, nombre: 'Miguel Torres', apodo: 'Casa del Campo', ultimaLectura: '2024-01-16', lecturaAnterior: 145.7, personasRegistradas: 4 },
      { id: 9, nombre: 'Isabel Ruiz', apodo: 'La Granja', ultimaLectura: '2024-01-08', lecturaAnterior: 203.2, personasRegistradas: 7 }
    ]
  };

  // Filtrar usuarios por zona y búsqueda
  const usuariosFiltrados = useMemo(() => {
    if (!zonaSeleccionada) return [];
    
    const usuarios = usuariosPorZona[zonaSeleccionada as keyof typeof usuariosPorZona] || [];
    
    if (!busquedaUsuario) return usuarios;
    
    return usuarios.filter(usuario => 
      usuario.nombre.toLowerCase().includes(busquedaUsuario.toLowerCase()) ||
      usuario.apodo.toLowerCase().includes(busquedaUsuario.toLowerCase())
    );
  }, [zonaSeleccionada, busquedaUsuario]);

  const calcularDiferencia = () => {
    if (!usuarioSeleccionado || !formData.lecturaActual) return 0;
    const actual = parseFloat(formData.lecturaActual);
    const anterior = usuarioSeleccionado.lecturaAnterior;
    return actual - anterior;
  };

  const convertirALitros = (m3: number) => {
    return m3 * 1000;
  };

  const calcularUmbralDiario = () => {
    if (!usuarioSeleccionado) return 0;
    const fechaAnterior = new Date(usuarioSeleccionado.ultimaLectura);
    const fechaActual = new Date(formData.fechaActual);
    const diasTranscurridos = Math.ceil((fechaActual.getTime() - fechaAnterior.getTime()) / (1000 * 60 * 60 * 24));
    return 180 * diasTranscurridos * usuarioSeleccionado.personasRegistradas; // 180L/día/persona
  };

  const validarConsumo = () => {
    const diferencia = calcularDiferencia();
    const diferenciaLitros = convertirALitros(diferencia);
    const umbral = calcularUmbralDiario();
    return {
      diferencia: diferencia,
      diferenciaLitros: diferenciaLitros,
      umbral: umbral,
      excedido: diferenciaLitros > umbral,
      porcentaje: umbral > 0 ? (diferenciaLitros / umbral) * 100 : 0
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      usuarioSeleccionado &&
      formData.lecturaActual !== '' &&
      formData.fechaActual !== ''
    );
  };

  const handleCancel = () => {
    if (hayDatosSinGuardar()) {
      if (window.confirm('¿Estás seguro de que quieres cancelar? Los datos no guardados se perderán.')) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  const handleSave = async () => {
    if (!isFormValid()) return;
    
    setIsLoading(true);
    try {
      const validacion = validarConsumo();
      console.log('Datos del contador:', {
        zona: zonaSeleccionada,
        usuario: usuarioSeleccionado,
        formData,
        validacion
      });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular guardado
      router.push('/dashboard/registros');
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  const renderSeleccionUsuario = () => (
    <div className="space-y-6">
      {/* Selector de Zona */}
      <div>
        <Label className="text-base font-medium text-gray-900 mb-3 block">Zona de Medición</Label>
        <Select value={zonaSeleccionada} onValueChange={setZonaSeleccionada}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona la zona" />
          </SelectTrigger>
          <SelectContent>
            {zonas.map((zona) => (
              <SelectItem key={zona} value={zona}>
                <div className="flex items-center justify-between w-full">
                  <span>{zona}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({usuariosPorZona[zona as keyof typeof usuariosPorZona]?.length || 0} propiedades)
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Campo de búsqueda */}
      {zonaSeleccionada && (
        <div>
          <Label className="text-base font-medium text-gray-900 mb-3 block">Buscar Usuario</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nombre o apodo..."
              value={busquedaUsuario}
              onChange={(e) => setBusquedaUsuario(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Lista de usuarios */}
      {zonaSeleccionada && (
        <div>
          <Label className="text-base font-medium text-gray-900 mb-3 block">
            Seleccionar Usuario ({usuariosFiltrados.length} {usuariosFiltrados.length === 1 ? 'resultado' : 'resultados'})
          </Label>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {usuariosFiltrados.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {busquedaUsuario ? 'No se encontraron usuarios con ese criterio de búsqueda' : 'No hay usuarios en esta zona'}
              </div>
            ) : (
              usuariosFiltrados.map((usuario) => {
                const diasSinLectura = Math.ceil((new Date().getTime() - new Date(usuario.ultimaLectura).getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <button
                    key={usuario.id}
                    onClick={() => setUsuarioSeleccionado(usuario)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="mb-2">
                          <h3 className="font-semibold text-gray-900">{usuario.nombre}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Última lectura: {usuario.ultimaLectura}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">{usuario.lecturaAnterior} m³</div>
                        <div className={`text-sm ${
                          diasSinLectura > 35 ? 'text-red-600' : 
                          diasSinLectura > 30 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {diasSinLectura} días
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Detectar si hay cambios sin guardar
  const hayDatosSinGuardar = () => {
    return formData.lecturaActual !== '' || formData.observaciones !== '';
  };

  // Manejar navegación con confirmación
  const manejarVolver = () => {
    if (hayDatosSinGuardar()) {
      if (window.confirm('¿Estás seguro de que quieres salir? Los datos no guardados se perderán.')) {
        setUsuarioSeleccionado(null);
        // Limpiar formulario
        setFormData({
          fechaActual: new Date().toISOString().split('T')[0],
          lecturaActual: '',
          observaciones: ''
        });
      }
    } else {
      setUsuarioSeleccionado(null);
    }
  };

  const renderFormulario = () => {
    const validacion = validarConsumo();
    
    return (
      <div className="space-y-6">

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-3 mb-4">📋 Información Básica</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Zona</Label>
                <Input value={zonaSeleccionada} disabled className="bg-gray-50" />
              </div>
              <div>
                <Label>Personas Registradas</Label>
                <Input value={usuarioSeleccionado?.personasRegistradas} disabled className="bg-gray-50" />
              </div>
            </div>
          </div>

          {/* Lecturas */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-3 mb-4">📊 Lecturas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Lectura Anterior */}
                <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
                  <Label className="font-medium">Lectura Anterior</Label>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">{usuarioSeleccionado?.lecturaAnterior} m³</div>
                    <div className="text-sm text-muted-foreground">Fecha: {usuarioSeleccionado?.ultimaLectura}</div>
                  </div>
                </div>

                {/* Lectura Actual */}
                <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
                  <Label htmlFor="lecturaActual" className="font-medium">Lectura Actual *</Label>
                  <div className="mt-2 space-y-2">
                    <Input
                      id="lecturaActual"
                      name="lecturaActual"
                      type="number"
                      step="0.001"
                      value={formData.lecturaActual}
                      onChange={handleInputChange}
                      required
                      placeholder="0.000"
                      className="text-lg font-semibold"
                    />
                    <div className="mt-2">
                      <Label htmlFor="fechaActual" className="font-medium text-sm">Fecha de Lectura *</Label>
                      <Input
                        id="fechaActual"
                        name="fechaActual"
                        type="date"
                        value={formData.fechaActual}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Diferencia */}
                <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
                  <Label className="font-medium">Consumo</Label>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">
                      {formData.lecturaActual ? convertirALitros(calcularDiferencia()).toFixed(0) : '0'} L
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ({formData.lecturaActual ? calcularDiferencia().toFixed(3) : '0.000'} m³)
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Validación de Consumo */}
          {formData.lecturaActual && (
            <div className={`border rounded-lg p-6 ${validacion.excedido ? 'border-red-200 bg-white' : 'border-green-200 bg-white'}`}>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                {validacion.excedido ? (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                ) : (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                )}
                <h3 className={`text-lg font-semibold ${validacion.excedido ? 'text-red-800' : 'text-green-800'}`}>
                  {validacion.excedido ? '⚠️ Consumo Elevado' : '✅ Consumo Normal'}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className={validacion.excedido ? 'text-red-700' : 'text-green-700'}>Consumo actual:</span>
                  <div className="font-bold text-lg">{validacion.diferenciaLitros.toFixed(0)} L</div>
                </div>
                <div>
                  <span className={validacion.excedido ? 'text-red-700' : 'text-green-700'}>Umbral permitido:</span>
                  <div className="font-bold text-lg">{validacion.umbral.toFixed(0)} L</div>
                </div>
                <div>
                  <span className={validacion.excedido ? 'text-red-700' : 'text-green-700'}>Porcentaje:</span>
                  <div className="font-bold text-lg">{validacion.porcentaje.toFixed(1)}%</div>
                </div>
              </div>
              
              {validacion.excedido && (
                <div className="mt-4 p-3 bg-red-100 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Advertencia:</strong> El consumo supera el umbral de 180L/día/persona. 
                    Revisa posibles fugas o consumo anómalo.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Observaciones */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-3 mb-4">📝 Observaciones</h3>
            <div>
              <Label htmlFor="observaciones">Observaciones (opcional)</Label>
              <Textarea
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleInputChange}
                rows={3}
                placeholder="Anota cualquier observación sobre el contador, acceso, o anomalías detectadas"
                className="mt-1"
              />
            </div>
          </div>

        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {usuarioSeleccionado && (
        <FormHeader
          tipoRegistro="Lectura de Contador"
          onCancel={handleCancel}
          onSave={handleSave}
          canSave={isFormValid()}
          isLoading={isLoading}
        />
      )}

      {!usuarioSeleccionado ? (
        <div className="px-4 py-6 bg-background">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors mb-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lectura de Contadores</h1>
              <p className="text-gray-600">Registra la lectura del contador de agua</p>
            </div>
          </div>

          {/* Contenido */}
          {renderSeleccionUsuario()}
        </div>
      ) : (
        <div className="px-4 py-6 bg-background">
          {renderFormulario()}
        </div>
      )}
    </div>
  );
}