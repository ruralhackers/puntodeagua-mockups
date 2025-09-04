// Analytics detail page showing complete analysis information
// Displays analysis data with vertical sections layout and action buttons

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, FileText, Image, Download, Plus, MoreVertical, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BackButton } from '@/components/ui/back-button';

// Mock data type - matches the structure from the list page
type Analytic = {
  id: number;
  tipo: 'Cloro/pH' | 'Turbidez' | 'Dureza' | 'Completa';
  fecha: string;
  zona: string;
  realizadoPor: string;
  tipoRealizador: 'interno' | 'externo';
  problematica: boolean;
  apta: boolean;
  valores?: {
    cloro?: number;
    ph?: number;
    turbidez?: number;
  };
  notas?: string;
  archivos?: Array<{
    nombre: string;
    tipo: 'pdf' | 'image' | 'other';
    url: string;
  }>;
};

interface Props {
  params: {
    id: string;
  };
}

export default function AnaliticaDetailPage({ params }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Editable states
  const [editedFecha, setEditedFecha] = useState('');
  const [editedZona, setEditedZona] = useState('');
  const [editedRealizadoPor, setEditedRealizadoPor] = useState('');
  const [editedCloro, setEditedCloro] = useState('');
  const [editedPh, setEditedPh] = useState('');
  const [editedTurbidez, setEditedTurbidez] = useState('');
  const [editedNotas, setEditedNotas] = useState('');

  // Available options
  const zonas = ['Os Casas', 'Centro', 'Ramis'];
  const usuarios = [
    'María González',
    'José Martín', 
    'Ana Fernández',
    'Carlos López',
    'Isabel García',
    'Lab. AguaSegura',
    'Lab. Galicia Análisis'
  ];

  // Mock data - in a real app, this would come from an API call based on params.id
  const getAnaliticaById = (id: string): Analytic | null => {
    const mockData: Analytic[] = [
      {
        id: 1,
        tipo: 'Cloro/pH',
        fecha: '2024-08-15',
        zona: 'Os Casas',
        realizadoPor: 'María González',
        tipoRealizador: 'interno',
        problematica: false,
        apta: true,
        valores: { cloro: 0.5, ph: 7.2 },
        notas: 'Análisis rutinario. Niveles dentro de los parámetros normales. Agua apta para consumo.',
        archivos: [
          { nombre: 'analisis_cloro_ph_2024_08_15.pdf', tipo: 'pdf', url: '/documents/analisis1.pdf' },
          { nombre: 'foto_muestra.jpg', tipo: 'image', url: '/images/muestra1.jpg' }
        ]
      },
      {
        id: 2,
        tipo: 'Cloro/pH',
        fecha: '2024-08-14',
        zona: 'Centro',
        realizadoPor: 'José Martín',
        tipoRealizador: 'interno',
        problematica: true,
        apta: false,
        valores: { cloro: 0.2, ph: 8.5 },
        notas: 'Niveles de cloro por debajo del mínimo requerido. pH ligeramente elevado. Se requiere acción correctiva.',
        archivos: [
          { nombre: 'analisis_problematico.pdf', tipo: 'pdf', url: '/documents/analisis2.pdf' }
        ]
      },
      {
        id: 3,
        tipo: 'Turbidez',
        fecha: '2024-08-12',
        zona: 'Ramis',
        realizadoPor: 'Ana Fernández',
        tipoRealizador: 'interno',
        problematica: false,
        apta: true,
        valores: { turbidez: 1.2 },
        notas: 'Turbidez dentro de parámetros aceptables.'
      }
    ];
    
    return mockData.find(item => item.id === parseInt(id)) || null;
  };

  const analitica = getAnaliticaById(params.id);

  // Initialize editable states when analitica loads
  useEffect(() => {
    if (analitica) {
      setEditedFecha(analitica.fecha);
      setEditedZona(analitica.zona);
      setEditedRealizadoPor(analitica.realizadoPor);
      setEditedCloro(analitica.valores?.cloro?.toString() || '');
      setEditedPh(analitica.valores?.ph?.toString() || '');
      setEditedTurbidez(analitica.valores?.turbidez?.toString() || '');
      setEditedNotas(analitica.notas || '');
    }
  }, [analitica]);

  if (!analitica) {
    return (
      <div className="px-3 py-4">
        <div className="mb-4">
          <BackButton href="/dashboard/registros/analiticas" />
        </div>
        <div className="text-center py-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Analítica no encontrada</h2>
          <p className="text-gray-600">La analítica que buscas no existe o ha sido eliminada.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  };

  const handleEdit = () => {
    if (isEditing) {
      // Reset to original values when canceling
      if (analitica) {
        setEditedFecha(analitica.fecha);
        setEditedZona(analitica.zona);
        setEditedRealizadoPor(analitica.realizadoPor);
        setEditedCloro(analitica.valores?.cloro?.toString() || '');
        setEditedPh(analitica.valores?.ph?.toString() || '');
        setEditedTurbidez(analitica.valores?.turbidez?.toString() || '');
        setEditedNotas(analitica.notas || '');
      }
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setShowDeleteModal(false);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, make API call to delete
    console.log('Deleting analítica:', params.id);
    
    // Navigate back to list
    router.push('/dashboard/registros/analiticas');
  };

  const renderFileIcon = (tipo: string) => {
    switch (tipo) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'image':
        return <Image className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getParameterIcon = (tipo: string) => {
    if (tipo === 'Cloro/pH') {
      return '🧪';
    } else if (tipo === 'Turbidez') {
      return '💧';
    } else if (tipo === 'Dureza') {
      return '⚗️';
    }
    return '📊';
  };

  return (
    <div className="px-3 py-4 pb-20">
      {/* Header */}
      <div className="mb-6">
        {isEditing ? (
          // Edit mode header: Cancel + Title + Save (same pattern as creation)
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleEdit}
              className="text-red-600 hover:text-red-700"
            >
              Cancelar
            </Button>
            <h1 className="text-xl font-bold text-gray-900">
              Editar
            </h1>
            <Button
              onClick={() => {
                // Handle save changes - in a real app, this would make an API call
                console.log('Saving changes:', {
                  fecha: editedFecha,
                  zona: editedZona,
                  realizadoPor: editedRealizadoPor,
                  valores: {
                    cloro: editedCloro ? parseFloat(editedCloro) : undefined,
                    ph: editedPh ? parseFloat(editedPh) : undefined,
                    turbidez: editedTurbidez ? parseFloat(editedTurbidez) : undefined,
                  },
                  notas: editedNotas
                });
                setIsEditing(false);
              }}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Guardar
            </Button>
          </div>
        ) : (
          // View mode header: Back + Title + Overflow menu
          <>
            <BackButton href="/dashboard/registros/analiticas" />
            <div className="flex items-center justify-between mt-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Analítica {analitica.tipo}
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setShowDeleteModal(true)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>

      {/* Main Information Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="space-y-4">
          {/* Fecha */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">📅</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Fecha</h3>
              {isEditing ? (
                <Input
                  type="date"
                  value={editedFecha}
                  onChange={(e) => setEditedFecha(e.target.value)}
                  className="max-w-xs"
                />
              ) : (
                <p className="text-gray-700">{formatDate(analitica.fecha)}</p>
              )}
            </div>
          </div>

          {/* Zona */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">📍</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Zona de medición</h3>
              {isEditing ? (
                <Select value={editedZona} onValueChange={setEditedZona}>
                  <SelectTrigger className="max-w-xs">
                    <SelectValue placeholder="Selecciona la zona" />
                  </SelectTrigger>
                  <SelectContent>
                    {zonas.map((zona) => (
                      <SelectItem key={zona} value={zona}>
                        {zona}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-700">{analitica.zona}</p>
              )}
            </div>
          </div>

          {/* Persona que realiza */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">👤</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Realizada por</h3>
              {isEditing ? (
                <Select value={editedRealizadoPor} onValueChange={setEditedRealizadoPor}>
                  <SelectTrigger className="max-w-xs">
                    <SelectValue placeholder="Selecciona la persona" />
                  </SelectTrigger>
                  <SelectContent>
                    {usuarios.map((usuario) => (
                      <SelectItem key={usuario} value={usuario}>
                        {usuario}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-700">
                  {analitica.realizadoPor}
                  <span className="text-sm text-gray-500 ml-2">
                    ({analitica.tipoRealizador === 'interno' ? 'Interno' : 'Externo'})
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Parameters Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Parámetros</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {analitica.tipo === 'Cloro/pH' && analitica.valores && (
            <>
              {analitica.valores.cloro !== undefined && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-gray-900">Cloro</h3>
                  </div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          value={editedCloro}
                          onChange={(e) => setEditedCloro(e.target.value)}
                          className="max-w-32"
                          placeholder="0.0"
                        />
                        <span className="text-sm text-gray-500">mg/L</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-gray-900">
                        {analitica.valores.cloro} mg/L
                      </p>
                      <p className={`text-sm mt-1 ${
                        analitica.valores.cloro >= 0.3 && analitica.valores.cloro <= 2.0 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {analitica.valores.cloro >= 0.3 && analitica.valores.cloro <= 2.0 
                          ? '✅ Dentro de parámetros' 
                          : '⚠️ Fuera de parámetros'
                        }
                      </p>
                    </>
                  )}
                </div>
              )}
              
              {analitica.valores.ph !== undefined && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-gray-900">pH</h3>
                  </div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          max="14"
                          value={editedPh}
                          onChange={(e) => setEditedPh(e.target.value)}
                          className="max-w-32"
                          placeholder="7.0"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-gray-900">
                        {analitica.valores.ph}
                      </p>
                      <p className={`text-sm mt-1 ${
                        analitica.valores.ph >= 6.5 && analitica.valores.ph <= 8.5 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {analitica.valores.ph >= 6.5 && analitica.valores.ph <= 8.5 
                          ? '✅ Dentro de parámetros' 
                          : '⚠️ Fuera de parámetros'
                        }
                      </p>
                    </>
                  )}
                </div>
              )}
            </>
          )}
          
          {analitica.tipo === 'Turbidez' && analitica.valores?.turbidez !== undefined && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium text-gray-900">Turbidez</h3>
              </div>
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      value={editedTurbidez}
                      onChange={(e) => setEditedTurbidez(e.target.value)}
                      className="max-w-32"
                      placeholder="0.0"
                    />
                    <span className="text-sm text-gray-500">NTU</span>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-2xl font-bold text-gray-900">
                    {analitica.valores.turbidez} NTU
                  </p>
                  <p className={`text-sm mt-1 ${
                    analitica.valores.turbidez <= 4 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {analitica.valores.turbidez <= 4 
                      ? '✅ Dentro de parámetros' 
                      : '⚠️ Fuera de parámetros'
                    }
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Observations Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Observaciones</h2>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-gray-900 mb-2">Notas</h3>
          {isEditing ? (
            <Textarea
              value={editedNotas}
              onChange={(e) => setEditedNotas(e.target.value)}
              placeholder="Observaciones adicionales..."
              className="min-h-20"
            />
          ) : analitica.notas ? (
            <p className="text-gray-700 whitespace-pre-wrap">{analitica.notas}</p>
          ) : (
            <p className="text-gray-500 italic">Sin observaciones</p>
          )}
        </div>

        {/* Archivos adjuntos */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">
              📎 Archivos adjuntos {analitica.archivos && analitica.archivos.length > 0 && `(${analitica.archivos.length})`}
            </h3>
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  // Handle file upload
                  console.log('Add file clicked');
                }}
              >
                <Plus className="h-4 w-4" />
                Añadir archivo
              </Button>
            )}
          </div>
          
          {analitica.archivos && analitica.archivos.length > 0 ? (
            <div className="space-y-2">
              {analitica.archivos.map((archivo, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {renderFileIcon(archivo.tipo)}
                      <span className="text-sm font-medium text-gray-900">
                        {archivo.nombre}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => {
                          // Handle file view/download
                          console.log('View file:', archivo.url);
                        }}
                      >
                        Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => {
                          // Handle file download
                          console.log('Download file:', archivo.url);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Sin archivos adjuntos</p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle>Eliminar analítica</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar esta analítica de {analitica.tipo}? 
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="flex-1"
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1"
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}