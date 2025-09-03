// Water counters management page with consumption tracking
// Displays counter readings, consumption, and anomaly alerts by zones

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, AlertTriangle, Filter, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Counter = {
  id: number;
  nombre: string;
  apellidos: string;
  zona: string;
  ultimaLectura: number;
  ultimoConsumo: number;
  fechaUltimaLectura: string;
  consumoAnomalo: boolean;
};

export default function ContadoresPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('todas');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data - replace with real data later
  const contadores: Counter[] = [
    {
      id: 1,
      nombre: 'María',
      apellidos: 'González López',
      zona: 'Depósito/Centro',
      ultimaLectura: 1247,
      ultimoConsumo: 245,
      fechaUltimaLectura: '15/08/24',
      consumoAnomalo: false
    },
    {
      id: 2,
      nombre: 'José',
      apellidos: 'Martín Rodríguez',
      zona: 'Depósito/Centro',
      ultimaLectura: 2892,
      ultimoConsumo: 856,
      fechaUltimaLectura: '12/08/24',
      consumoAnomalo: true
    },
    {
      id: 3,
      nombre: 'Ana',
      apellidos: 'Fernández Silva',
      zona: 'O Casas',
      ultimaLectura: 892,
      ultimoConsumo: 156,
      fechaUltimaLectura: '10/05/24',
      consumoAnomalo: false
    },
    {
      id: 4,
      nombre: 'Pedro',
      apellidos: 'López García',
      zona: 'O Casas',
      ultimaLectura: 1156,
      ultimoConsumo: 198,
      fechaUltimaLectura: '14/08/24',
      consumoAnomalo: false
    },
    {
      id: 5,
      nombre: 'Carmen',
      apellidos: 'Díaz Martín',
      zona: 'Ramis',
      ultimaLectura: 3421,
      ultimoConsumo: 312,
      fechaUltimaLectura: '13/08/24',
      consumoAnomalo: false
    },
    {
      id: 6,
      nombre: 'Francisco',
      apellidos: 'Vázquez Ramos',
      zona: 'Ramis',
      ultimaLectura: 2156,
      ultimoConsumo: 445,
      fechaUltimaLectura: '11/08/24',
      consumoAnomalo: true
    },
    {
      id: 7,
      nombre: 'Laura',
      apellidos: 'Sánchez Torres',
      zona: 'Depósito/Centro',
      ultimaLectura: 1834,
      ultimoConsumo: 167,
      fechaUltimaLectura: '16/08/24',
      consumoAnomalo: false
    }
  ];

  const zonas = ['Depósito/Centro', 'O Casas', 'Ramis'];

  // Filter counters based on search, zone, and status
  const filteredContadores = contadores.filter(contador => {
    const matchesSearch = searchTerm === '' || 
      `${contador.nombre} ${contador.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesZone = selectedZone === 'todas' || contador.zona === selectedZone;
    
    const matchesStatus = selectedStatus === 'todos' || 
      (selectedStatus === 'anomalos' && contador.consumoAnomalo);
    
    return matchesSearch && matchesZone && matchesStatus;
  });

  // Count active filters
  const activeFiltersCount = [
    selectedZone !== 'todas',
    selectedStatus !== 'todos'
  ].filter(Boolean).length;

  // Clear all filters
  const clearFilters = () => {
    setSelectedZone('todas');
    setSelectedStatus('todos');
  };

  return (
    <div className="px-3 py-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Contadores</h1>
        <p className="text-gray-600">Gestión de contadores y control de consumos</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Button */}
      <div className="flex justify-end mb-4">
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
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="zona"
                      value="todas"
                      checked={selectedZone === 'todas'}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Todas las zonas</span>
                  </label>
                  {zonas.map((zona) => (
                    <label key={zona} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="zona"
                        value={zona}
                        checked={selectedZone === zona}
                        onChange={(e) => setSelectedZone(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{zona}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">ESTADO</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="estado"
                      value="todos"
                      checked={selectedStatus === 'todos'}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Todos</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="estado"
                      value="anomalos"
                      checked={selectedStatus === 'anomalos'}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Solo anómalos
                    </span>
                  </label>
                </div>
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
                Aplicar ({filteredContadores.length})
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Counters List */}
      <div className="space-y-3">
        {filteredContadores.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No se encontraron contadores
          </div>
        ) : (
          filteredContadores.map((contador) => (
            <div
              key={contador.id}
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => router.push(`/dashboard/registros/contadores/${contador.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900">
                      {contador.nombre} {contador.apellidos}
                    </h3>
                    {contador.consumoAnomalo && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {contador.ultimoConsumo} L • {contador.fechaUltimaLectura}
                  </p>
                  <p className="text-xs text-gray-500">
                    {contador.zona}
                  </p>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}