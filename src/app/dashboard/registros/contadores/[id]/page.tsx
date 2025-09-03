// Counter detail page showing consumption history and readings
// Allows editing and deleting individual readings with confirmation modals

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle, Edit2, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Reading = {
  id: number;
  fecha: string;
  lecturaContador: number;
  consumo: number;
  consumoAnomalo: boolean;
  unidadContador: 'm³' | 'L';
};

type Counter = {
  id: number;
  nombre: string;
  apellidos: string;
  zona: string;
  unidadContador: 'm³' | 'L';
  lecturas: Reading[];
};

export default function CounterDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const counterId = parseInt(params.id);

  // Mock data - replace with real data later
  const contador: Counter = {
    id: counterId,
    nombre: 'María',
    apellidos: 'González López',
    zona: 'Depósito/Centro',
    unidadContador: 'm³',
    lecturas: [
      {
        id: 1,
        fecha: '15/08/24',
        lecturaContador: 1247,
        consumo: 245,
        consumoAnomalo: true,
        unidadContador: 'm³'
      },
      {
        id: 2,
        fecha: '12/05/24',
        lecturaContador: 1002,
        consumo: 198,
        consumoAnomalo: false,
        unidadContador: 'm³'
      },
      {
        id: 3,
        fecha: '18/02/24',
        lecturaContador: 804,
        consumo: 167,
        consumoAnomalo: false,
        unidadContador: 'm³'
      },
      {
        id: 4,
        fecha: '15/11/23',
        lecturaContador: 637,
        consumo: 201,
        consumoAnomalo: false,
        unidadContador: 'm³'
      },
      {
        id: 5,
        fecha: '20/08/23',
        lecturaContador: 436,
        consumo: 189,
        consumoAnomalo: false,
        unidadContador: 'm³'
      },
      {
        id: 6,
        fecha: '15/05/23',
        lecturaContador: 247,
        consumo: 175,
        consumoAnomalo: false,
        unidadContador: 'm³'
      }
    ]
  };

  const [editingReading, setEditingReading] = useState<Reading | null>(null);
  const [editValue, setEditValue] = useState('');
  const [deleteReading, setDeleteReading] = useState<Reading | null>(null);

  // Get last reading (first in array as they're sorted by date desc)
  const ultimaLectura = contador.lecturas[0];

  const handleEditReading = (reading: Reading) => {
    setEditingReading(reading);
    setEditValue(reading.lecturaContador.toString());
  };

  const handleSaveEdit = () => {
    if (editingReading && editValue.trim()) {
      // Here you would update the reading in your data store
      console.log(`Updating reading ${editingReading.id} to value ${editValue}`);
      setEditingReading(null);
      setEditValue('');
    }
  };

  const handleDeleteReading = (reading: Reading) => {
    setDeleteReading(reading);
  };

  const confirmDeleteReading = () => {
    if (deleteReading) {
      // Here you would delete the reading from your data store
      console.log(`Deleting reading ${deleteReading.id}`);
      setDeleteReading(null);
    }
  };

  return (
    <div className="px-3 py-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold text-gray-900">
          {contador.nombre} {contador.apellidos}
        </h1>
      </div>

      {/* Main Info Card - Option B */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">💧</span>
            <div>
              <span className="font-medium text-gray-900">
                Último: {ultimaLectura.consumo} L • {ultimaLectura.fecha}
              </span>
              {ultimaLectura.consumoAnomalo && (
                <AlertTriangle className="inline-block ml-2 h-4 w-4 text-red-500" />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span>📍</span>
          <span>{contador.zona}</span>
        </div>
      </div>

      {/* Historical Readings */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Historial de Lecturas</h2>
          <p className="text-sm text-gray-600 mt-1">
            Contador en {contador.unidadContador}, consumos en L
          </p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {contador.lecturas.map((lectura) => (
            <div key={lectura.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-900 w-16">
                      {lectura.fecha}
                    </span>
                    <span className="text-sm text-gray-600 w-20">
                      {lectura.lecturaContador} {contador.unidadContador}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">
                        {lectura.consumo} L
                      </span>
                      {lectura.consumoAnomalo && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditReading(lectura)}
                    className="p-2"
                  >
                    <Edit2 className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteReading(lectura)}
                    className="p-2"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 text-center border-t border-gray-200">
          <Button variant="outline" size="sm">
            Ver todo el historial
          </Button>
        </div>
      </div>

      {/* Edit Reading Modal */}
      <Dialog open={editingReading !== null} onOpenChange={() => setEditingReading(null)}>
        <DialogContent className="w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle>Editar Lectura</DialogTitle>
          </DialogHeader>
          
          {editingReading && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Fecha: {editingReading.fecha}
                </p>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Lectura del contador ({contador.unidadContador})
                </label>
                <Input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Ingresa la nueva lectura"
                  className="w-full"
                />
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingReading(null)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSaveEdit}
                  className="flex-1"
                  disabled={!editValue.trim()}
                >
                  Guardar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteReading !== null} onOpenChange={() => setDeleteReading(null)}>
        <DialogContent className="w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle>Eliminar Lectura</DialogTitle>
          </DialogHeader>
          
          {deleteReading && (
            <div className="space-y-4">
              <p className="text-gray-600">
                ¿Estás seguro de que quieres eliminar la lectura del <strong>{deleteReading.fecha}</strong>?
              </p>
              <p className="text-sm text-gray-500">
                Lectura: {deleteReading.lecturaContador} {contador.unidadContador} • Consumo: {deleteReading.consumo} L
              </p>
              <p className="text-sm text-red-600">
                Esta acción no se puede deshacer.
              </p>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setDeleteReading(null)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  variant="destructive"
                  onClick={confirmDeleteReading}
                  className="flex-1"
                >
                  Eliminar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}