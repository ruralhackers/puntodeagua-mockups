'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function AtencionPage() {
  const router = useRouter();
  
  // Datos de ejemplo - en una aplicación real vendrían de una API
  const incidenciasAbiertas = [
    {
      id: 1,
      titulo: "Fuga en tubería principal",
      ubicacion: "Sector Norte",
      prioridad: "Alta",
      fecha: "2024-01-15",
      tipo: "incidencia"
    },
    {
      id: 2,
      titulo: "Presión baja en zona residencial",
      ubicacion: "Sector Sur",
      prioridad: "Media",
      fecha: "2024-01-14",
      tipo: "incidencia"
    },
    {
      id: 3,
      titulo: "Calidad del agua cuestionable",
      ubicacion: "Pozo Central",
      prioridad: "Alta",
      fecha: "2024-01-13",
      tipo: "incidencia"
    }
  ];

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [tareasPasadas, setTareasPasadas] = useState([
    {
      id: 1,
      titulo: "Inspección mensual Pozo A",
      fechaVencimiento: "2024-01-10",
      tipo: "tarea",
      subtipo: "Mantenimiento",
      estado: "Pendiente"
    },
    {
      id: 2,
      titulo: "Análisis de calidad del agua",
      fechaVencimiento: "2024-01-12",
      tipo: "tarea",
      subtipo: "Análisis",
      estado: "Pendiente"
    },
    {
      id: 3,
      titulo: "Revisión de válvulas",
      fechaVencimiento: "2024-01-08",
      tipo: "tarea",
      subtipo: "Mantenimiento",
      estado: "Pendiente"
    }
  ]);

  // Combinar todos los elementos
  const todosElementos = [
    ...incidenciasAbiertas,
    ...tareasPasadas
  ];
  
  const eliminarTarea = (id: number) => {
    setTareasPasadas(tareasPasadas.filter(tarea => tarea.id !== id));
  };
  
  const limpiarTodasLasTareas = () => {
    setShowConfirmDialog(false);
    setTareasPasadas([]);
  };

  const handleElementClick = (elemento: { id: number; tipo: string }) => {
    if (elemento.tipo === 'incidencia') {
      // Navegar a la página de edición de incidencia
      router.push(`/dashboard/incidencias/${elemento.id}/editar`);
    } else {
      // Navegar a la página de registro de tarea
      router.push(`/dashboard/tareas/${elemento.id}/registro`);
    }
  };

  return (
    <div className="px-3 py-4 pb-20">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {tareasPasadas.length > 0 && (
            <button 
              onClick={() => setShowConfirmDialog(true)}
              className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              Limpiar recordatorios
            </button>
          )}
        </div>
        <h1 className="text-xl font-bold ml-2">Requiere Atención</h1>
      </div>
      
      <div className="space-y-3">
        {todosElementos.map((elemento) => (
          <div 
            key={`${elemento.tipo}-${elemento.id}`} 
            className={`p-3 ${elemento.tipo === 'incidencia' ? 'bg-orange-50' : 'bg-gray-50'} rounded-md hover:bg-gray-100 transition-colors cursor-pointer`}
            onClick={() => handleElementClick(elemento)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      elemento.tipo === 'incidencia' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {elemento.tipo === 'incidencia' ? 'Incidencia' : 'Tarea Vencida'}
                    </span>
                    {/* Eliminada la clasificación del nivel de incidencia */}
                    {elemento.tipo === 'tarea' && 'subtipo' in elemento && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {elemento.subtipo}
                      </span>
                    )}
                  </div>
                  {elemento.tipo === 'tarea' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        eliminarTarea(elemento.id);
                      }}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <h3 className="font-medium text-sm text-gray-900">{elemento.titulo}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  {elemento.tipo === 'incidencia' ? 
                    ('ubicacion' in elemento ? elemento.ubicacion : '') : 
                    ('fechaVencimiento' in elemento ? `Vencía: ${elemento.fechaVencimiento}` : '')
                  }
                </p>
                {elemento.tipo === 'incidencia' && 'fecha' in elemento && (
                  <p className="text-xs text-gray-500 mt-1">
                    Reportada: {elemento.fecha}
                  </p>
                )}
                {/* Eliminado el estado pendiente ya que es redundante con la etiqueta */}
              </div>
            </div>
            <div className="flex justify-end">
              <span className="text-xs text-blue-600 cursor-pointer hover:text-blue-800">
                {elemento.tipo === 'incidencia' ? 'Ver Incidencia' : 'Añadir Registro'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de confirmación para limpiar recordatorios */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar acción</DialogTitle>
          </DialogHeader>
          <div className="py-3">
            ¿Estás seguro de que deseas eliminar todos los recordatorios vencidos?
            Esta acción no se puede deshacer.
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={limpiarTodasLasTareas}>Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}