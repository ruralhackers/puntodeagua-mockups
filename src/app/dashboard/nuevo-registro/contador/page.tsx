'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, AlertTriangle, CheckCircle, Users, Calendar, Search, Filter, X } from 'lucide-react';
import { FormHeader } from '@/components/ui/form-header';
import { useTabBar } from '@/contexts/TabBarContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CounterCard, type CounterData } from '@/components/ui/counter-card';

export default function NuevoContadorPage() {
  const router = useRouter();
  const { hideTabBar, showTabBar } = useTabBar();
  const [isLoading, setIsLoading] = useState(false);
  const [zonaSeleccionada, setZonaSeleccionada] = useState('todas');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<CounterData | null>(null);
  const [busquedaUsuario, setBusquedaUsuario] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [formData, setFormData] = useState({
    fechaActual: new Date().toISOString().split('T')[0],
    lecturaActual: '',
    observaciones: ''
  });

  // Datos de ejemplo - lista consolidada de todos los usuarios
  const zonas = ['Os Casas', 'Centro', 'Ramis'];
  
  const todosLosUsuarios: CounterData[] = [
    { id: 1, nombre: 'María García', apodo: 'Casa del Río', zona: 'Os Casas', ultimaLectura: '2024-01-15', lecturaAnterior: 125.245, personasRegistradas: 4 },
    { id: 2, nombre: 'José Fernández', apodo: 'El Molino', zona: 'Os Casas', ultimaLectura: '2023-10-10', lecturaAnterior: 89.856, personasRegistradas: 2 },
    { id: 3, nombre: 'Ana Rodríguez', apodo: 'Casa Verde', zona: 'Os Casas', ultimaLectura: '2024-08-12', lecturaAnterior: 156.134, personasRegistradas: 5 },
    { id: 4, nombre: 'Carlos López', apodo: 'Panadería Central', zona: 'Centro', ultimaLectura: '2024-07-14', lecturaAnterior: 234.567, personasRegistradas: 3 },
    { id: 5, nombre: 'Elena Martín', apodo: 'Casa Azul', zona: 'Centro', ultimaLectura: '2024-08-11', lecturaAnterior: 278.923, personasRegistradas: 6 },
    { id: 6, nombre: 'Pedro Sánchez', apodo: 'Bar Central', zona: 'Centro', ultimaLectura: '2023-09-13', lecturaAnterior: 312.445, personasRegistradas: 8 },
    { id: 7, nombre: 'Lucía Gómez', apodo: 'Finca Alta', zona: 'Ramis', ultimaLectura: '2024-08-09', lecturaAnterior: 67.312, personasRegistradas: 2 },
    { id: 8, nombre: 'Miguel Torres', apodo: 'Casa del Campo', zona: 'Ramis', ultimaLectura: '2024-08-16', lecturaAnterior: 145.789, personasRegistradas: 4 },
    { id: 9, nombre: 'Isabel Ruiz', apodo: 'La Granja', zona: 'Ramis', ultimaLectura: '2024-07-08', lecturaAnterior: 203.678, personasRegistradas: 7 }
  ];

  // Filtrar usuarios por zona y búsqueda
  const usuariosFiltrados = useMemo(() => {
    let usuarios = todosLosUsuarios;
    
    // Filtrar por zona
    if (zonaSeleccionada !== 'todas') {
      usuarios = usuarios.filter(usuario => usuario.zona === zonaSeleccionada);
    }
    
    // Filtrar por búsqueda
    if (busquedaUsuario) {
      usuarios = usuarios.filter(usuario => 
        usuario.nombre.toLowerCase().includes(busquedaUsuario.toLowerCase()) ||
        usuario.apodo.toLowerCase().includes(busquedaUsuario.toLowerCase())
      );
    }
    
    return usuarios;
  }, [zonaSeleccionada, busquedaUsuario]);

  // Contar filtros activos
  const activeFiltersCount = [
    zonaSeleccionada !== 'todas',
  ].filter(Boolean).length;

  // Limpiar filtros
  const clearFilters = () => {
    setZonaSeleccionada('todas');
  };

  // Toggle search expansion
  const toggleSearch = () => {
    if (isSearchExpanded && busquedaUsuario) {
      return;
    }
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setBusquedaUsuario('');
    }
  };

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

  const renderListaContadores = () => (
    <div className="space-y-4">
      {/* Search and Filters - Similar to registros/contadores */}
      <div className="flex gap-3 mb-4">
        {isSearchExpanded ? (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar por nombre..."
              value={busquedaUsuario}
              onChange={(e) => setBusquedaUsuario(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSearch}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
          </Button>
        )}

        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
              {activeFiltersCount > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] rounded-lg">
            <DialogHeader>
              <DialogTitle>Filtrar contadores</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Zone Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">ZONA</h3>
                <Select value={zonaSeleccionada} onValueChange={setZonaSeleccionada}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una zona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las zonas</SelectItem>
                    {zonas.map((zona) => (
                      <SelectItem key={zona} value={zona}>
                        {zona}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="flex-1"
              >
                Limpiar
              </Button>
              <Button 
                onClick={() => setIsFilterOpen(false)}
                className="flex-1"
              >
                Aplicar ({usuariosFiltrados.length})
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de contadores */}
      <div className="space-y-3">
        {usuariosFiltrados.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {busquedaUsuario ? 'No se encontraron contadores con ese criterio de búsqueda' : 'No hay contadores disponibles'}
          </div>
        ) : (
          usuariosFiltrados.map((usuario) => (
            <CounterCard
              key={usuario.id}
              counter={usuario}
              onClick={setUsuarioSeleccionado}
              showConsumption={true}
              dateFormat="natural"
            />
          ))
        )}
      </div>
    </div>
  );

  // Detectar si hay cambios sin guardar
  const hayDatosSinGuardar = () => {
    return formData.lecturaActual !== '' || formData.observaciones !== '';
  };

  // Manejar navegación con confirmación - volver a lista de contadores
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
                <Input value={usuarioSeleccionado?.zona} disabled className="bg-gray-50" />
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
          onCancel={manejarVolver}
          onSave={handleSave}
          canSave={isFormValid()}
          isLoading={isLoading}
        />
      )}

      {!usuarioSeleccionado ? (
        <div className="px-4 py-6 pb-20 bg-background">
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
          {renderListaContadores()}
        </div>
      ) : (
        <div className="px-4 py-6 bg-background">
          {renderFormulario()}
        </div>
      )}
    </div>
  );
}