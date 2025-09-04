// Counter detail page showing consumption history and readings
// Allows editing and deleting individual readings with confirmation modals

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle, Edit2, Trash2, BarChart3, List, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Reading = {
  id: number;
  fecha: string;
  lecturaContador: number;
  consumo: number;
  consumoAnomalo: boolean;
  unidadContador: 'm³' | 'L';
  observaciones?: string;
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
        lecturaContador: 1247.234,
        consumo: 345124,
        consumoAnomalo: true,
        unidadContador: 'm³',
        observaciones: 'Contador difícil de acceder'
      },
      {
        id: 2,
        fecha: '12/05/24',
        lecturaContador: 1002.110,
        consumo: 198567,
        consumoAnomalo: false,
        unidadContador: 'm³'
      },
      {
        id: 3,
        fecha: '18/02/24',
        lecturaContador: 804.543,
        consumo: 167890,
        consumoAnomalo: false,
        unidadContador: 'm³'
      },
      {
        id: 4,
        fecha: '15/11/23',
        lecturaContador: 637.653,
        consumo: 201456,
        consumoAnomalo: false,
        unidadContador: 'm³',
        observaciones: 'Lectura estimada por acceso bloqueado'
      },
      {
        id: 5,
        fecha: '20/08/23',
        lecturaContador: 436.197,
        consumo: 189234,
        consumoAnomalo: false,
        unidadContador: 'm³'
      },
      {
        id: 6,
        fecha: '15/05/23',
        lecturaContador: 247.963,
        consumo: 175678,
        consumoAnomalo: false,
        unidadContador: 'm³'
      }
    ]
  };

  const [currentView, setCurrentView] = useState<'analytics' | 'history'>('analytics');
  const [selectedPeriod, setSelectedPeriod] = useState('ultimo6');
  const [editingReading, setEditingReading] = useState<Reading | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editObservaciones, setEditObservaciones] = useState('');
  const [deleteReading, setDeleteReading] = useState<Reading | null>(null);
  const [expandedReadings, setExpandedReadings] = useState<Set<number>>(new Set());

  // Get last reading (first in array as they're sorted by date desc)
  const ultimaLectura = contador.lecturas[0];

  // Calculate days between readings and daily consumption
  const calculateReadingStats = (currentReading: Reading, index: number) => {
    if (index === contador.lecturas.length - 1) {
      // Last reading, assume 96 days period as fallback
      return { days: 96, dailyConsumption: (currentReading.consumo / 96).toFixed(1) };
    }
    
    const nextReading = contador.lecturas[index + 1];
    // Parse DD/MM/YY format properly
    const [day, month, year] = currentReading.fecha.split('/');
    const [nextDay, nextMonth, nextYear] = nextReading.fecha.split('/');
    
    // Handle 2-digit years (assume 20xx for years < 50, 19xx for years >= 50)
    const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
    const nextFullYear = parseInt(nextYear) < 50 ? 2000 + parseInt(nextYear) : 1900 + parseInt(nextYear);
    
    const currentDate = new Date(fullYear, parseInt(month) - 1, parseInt(day));
    const nextDate = new Date(nextFullYear, parseInt(nextMonth) - 1, parseInt(nextDay));
    
    const diffTime = Math.abs(currentDate.getTime() - nextDate.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const dailyConsumption = days > 0 ? (currentReading.consumo / days).toFixed(1) : '0.0';
    
    return { days, dailyConsumption };
  };

  // Mock threshold for daily consumption (L/day)
  const dailyThreshold = 180;

  // Helper function to format numbers compactly
  const formatCompactNumber = (num: number) => {
    if (num >= 1000000) return Math.round(num / 1000000) + 'M';
    if (num >= 1000) return Math.round(num / 1000) + 'k';
    return num.toString();
  };

  // Generate chart data for consumption columns
  const generateChartData = () => {
    return contador.lecturas.map((lectura, index) => {
      const stats = calculateReadingStats(lectura, index);
      const isAnomalous = lectura.consumoAnomalo;
      
      // Parse date and format as MM/YY
      const [day, month, year] = lectura.fecha.split('/');
      const formattedDate = `${month}/${year}`;
      
      return {
        date: lectura.fecha,
        formattedDate,
        consumption: lectura.consumo,
        compactConsumption: formatCompactNumber(lectura.consumo),
        dailyAverage: parseFloat(stats.dailyConsumption),
        days: stats.days,
        isAnomalous,
        // Calculate column width relative to max consumption  
        columnWidth: Math.min((lectura.consumo / Math.max(...contador.lecturas.map(l => l.consumo))) * 100, 100)
      };
    }); // No reverse - show most recent first (desc order)
  };

  const chartData = generateChartData();
  const maxConsumption = Math.max(...contador.lecturas.map(l => l.consumo));
  const normalityLine = (180 / maxConsumption) * 100; // 180L fixed threshold line


  const handleEditReading = (reading: Reading) => {
    setEditingReading(reading);
    setEditValue(reading.lecturaContador.toString());
    setEditObservaciones(reading.observaciones || '');
  };

  const handleSaveEdit = () => {
    if (editingReading && editValue.trim()) {
      // Here you would update the reading in your data store
      console.log(`Updating reading ${editingReading.id} to value ${editValue} with observations: ${editObservaciones}`);
      setEditingReading(null);
      setEditValue('');
      setEditObservaciones('');
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

  const toggleReadingExpansion = (readingId: number) => {
    const newExpanded = new Set(expandedReadings);
    if (newExpanded.has(readingId)) {
      newExpanded.delete(readingId);
    } else {
      newExpanded.add(readingId);
    }
    setExpandedReadings(newExpanded);
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


      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="text-base">
            <SelectValue placeholder="📅 Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ultimo6">📅 Últimos 6 meses</SelectItem>
            <SelectItem value="year2025">📅 Año 2025</SelectItem>
            <SelectItem value="year2024">📅 Año 2024</SelectItem>
            <SelectItem value="year2023">📅 Año 2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* View Toggle */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setCurrentView('analytics')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            currentView === 'analytics'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Resumen
        </button>
        <button
          onClick={() => setCurrentView('history')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            currentView === 'history'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <List className="h-4 w-4" />
          Historial
        </button>
      </div>

      {/* Content based on current view */}
      {currentView === 'analytics' ? (
        // Analytics View - Simple bar chart
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Consumo por periodo</h3>
          </div>
          
          <div className="space-y-3">
            {/* Chart rows (columns displayed vertically) */}
            {chartData.map((data, index) => (
              <div key={index} className="flex items-center gap-3">
                {/* Date label */}
                <div className="w-12 text-xs text-gray-600 font-medium text-right">
                  {data.formattedDate}
                </div>
                
                {/* Column bar */}
                <div className="flex-1 relative h-8 bg-gray-100 rounded">
                  {/* Normality line */}
                  <div 
                    className="absolute h-full border-l-2 border-dashed border-orange-400 opacity-60"
                    style={{left: `${normalityLine}%`}}
                  ></div>
                  
                  {/* Consumption bar */}
                  <div
                    className={`h-full rounded transition-all hover:opacity-80 cursor-pointer ${
                      data.isAnomalous ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{width: `${data.columnWidth}%`}}
                    title={`${data.date}: ${data.consumption}L (${data.dailyAverage} L/día)`}
                  ></div>
                </div>
                
                {/* Value label */}
                <div className="w-12 text-xs text-gray-900 font-medium">
                  {data.compactConsumption}
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Anómalo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 border-t-2 border-dashed border-orange-400"></div>
              <span>Umbral</span>
            </div>
          </div>
        </div>
      ) : (
        // History View with ultra-clean card format
        <div className="space-y-3">
          {contador.lecturas.map((lectura, index) => {
            const stats = calculateReadingStats(lectura, index);
            
            // Format date in Spanish
            const [day, month, year] = lectura.fecha.split('/');
            const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
            const date = new Date(fullYear, parseInt(month) - 1, parseInt(day));
            const formattedDate = date.toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long', 
              year: 'numeric'
            });

            // Check if reading has observations
            const hasObservations = lectura.observaciones && lectura.observaciones.trim() !== '';
            
            const isExpanded = expandedReadings.has(lectura.id);
            
            return (
              <div key={lectura.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="space-y-2">
                  {/* Main: Consumption + Alert */}
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">
                      <span className={lectura.consumoAnomalo ? 'text-red-600' : 'text-gray-900'}>
                        {lectura.consumo.toLocaleString('es-ES')} L
                      </span>
                      {lectura.consumoAnomalo && <span className="text-red-600 ml-2">⚠</span>}
                    </div>
                    <button
                      onClick={() => toggleReadingExpansion(lectura.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  
                  {/* Date */}
                  <div className="text-gray-600 text-sm pl-2">
                    {formattedDate}
                  </div>
                  
                  {/* Observations (if any) - Always visible */}
                  {hasObservations && (
                    <div className="text-gray-600 text-sm pl-2">
                      💬 "{lectura.observaciones}"
                    </div>
                  )}
                  
                  {/* Collapsible Details */}
                  {isExpanded && (
                    <div className="space-y-1 pl-2 pt-2 border-t border-gray-100">
                      {/* Period */}
                      <div className="text-gray-600 text-sm">
                        Periodo: {stats.days} días
                      </div>
                      
                      {/* Reading */}
                      <div className="text-gray-600 text-sm">
                        Lectura: {lectura.lecturaContador.toLocaleString('es-ES', { 
                          minimumFractionDigits: 1, 
                          maximumFractionDigits: 1 
                        })} {contador.unidadContador}
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex justify-end gap-2 pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditReading(lectura)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1 h-auto text-sm"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteReading(lectura)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1 h-auto text-sm"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Reading Modal */}
      <Dialog open={editingReading !== null} onOpenChange={() => setEditingReading(null)}>
        <DialogContent className="w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle>Editar Lectura</DialogTitle>
          </DialogHeader>
          
          {editingReading && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Fecha: {editingReading.fecha}
                </p>
                
                <div className="space-y-4">
                  {/* Reading field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Lectura del contador ({contador.unidadContador}) *
                    </label>
                    <Input
                      type="number"
                      step="0.001"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      placeholder="Ingresa la nueva lectura"
                      className="w-full"
                    />
                  </div>
                  
                  {/* Observations field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Observaciones (opcional)
                    </label>
                    <Textarea
                      value={editObservaciones}
                      onChange={(e) => setEditObservaciones(e.target.value)}
                      placeholder="Anota cualquier observación sobre esta lectura..."
                      rows={3}
                      className="w-full"
                    />
                  </div>
                </div>
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