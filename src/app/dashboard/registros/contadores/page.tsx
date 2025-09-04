// Water counters management page with consumption tracking
// Displays counter readings, consumption, and anomaly alerts by zones

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, AlertTriangle, Filter, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BackButton } from '@/components/ui/back-button';
import { CounterCard, type CounterData } from '@/components/ui/counter-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Using CounterData interface from the component

export default function ContadoresPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('todas');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Mock data - replace with real data later
  const contadores: CounterData[] = [
    {
      id: 1,
      nombre: 'María',
      apellidos: 'González López',
      zona: 'Depósito/Centro',
      lecturaAnterior: 1.247, // Converted to m³
      ultimoConsumo: 245.0,
      ultimaLectura: '15/08/24',
      consumoAnomalo: false
    },
    {
      id: 2,
      nombre: 'José',
      apellidos: 'Martín Rodríguez',
      zona: 'Depósito/Centro',
      lecturaAnterior: 2.892, // Converted to m³
      ultimoConsumo: 856.0,
      ultimaLectura: '12/08/24',
      consumoAnomalo: true
    },
    {
      id: 3,
      nombre: 'Ana',
      apellidos: 'Fernández Silva',
      zona: 'O Casas',
      lecturaAnterior: 0.892, // Converted to m³
      ultimoConsumo: 156.0,
      ultimaLectura: '10/05/24',
      consumoAnomalo: false
    },
    {
      id: 4,
      nombre: 'Pedro',
      apellidos: 'López García',
      zona: 'O Casas',
      lecturaAnterior: 1.156, // Converted to m³
      ultimoConsumo: 198.0,
      ultimaLectura: '14/08/24',
      consumoAnomalo: false
    },
    {
      id: 5,
      nombre: 'Carmen',
      apellidos: 'Díaz Martín',
      zona: 'Ramis',
      lecturaAnterior: 3.421, // Converted to m³
      ultimoConsumo: 312.0,
      ultimaLectura: '13/08/24',
      consumoAnomalo: false
    },
    {
      id: 6,
      nombre: 'Francisco',
      apellidos: 'Vázquez Ramos',
      zona: 'Ramis',
      lecturaAnterior: 2.156, // Converted to m³
      ultimoConsumo: 445.0,
      ultimaLectura: '11/08/24',
      consumoAnomalo: true
    },
    {
      id: 7,
      nombre: 'Laura',
      apellidos: 'Sánchez Torres',
      zona: 'Depósito/Centro',
      lecturaAnterior: 1.834, // Converted to m³
      ultimoConsumo: 167.0,
      ultimaLectura: '16/08/24',
      consumoAnomalo: false
    }
  ];

  const zonas = ['Depósito/Centro', 'O Casas', 'Ramis'];

  // Filter counters based on search, zone, and status
  const filteredContadores = contadores.filter(contador => {
    const matchesSearch = searchTerm === '' || 
      `${contador.nombre} ${contador.apellidos || ''}`.toLowerCase().includes(searchTerm.toLowerCase());
    
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

  // Toggle search expansion
  const toggleSearch = () => {
    if (isSearchExpanded && searchTerm) {
      // Don't collapse if there's search content
      return;
    }
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      // Clear search when collapsing
      setSearchTerm('');
    }
  };

  // Handle counter click
  const handleCounterClick = (counter: CounterData) => {
    router.push(`/dashboard/registros/contadores/${counter.id}`);
  };

  return (
    <div className="px-3 py-4 pb-20">
      <div className="mb-4">
        <BackButton href="/dashboard/registros" />
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Contadores</h1>
        <p className="text-gray-600">Control de consumos</p>
      </div>

      {/* Search and Filters - Compact */}
      <div className="flex gap-3 mb-4">
        {isSearchExpanded ? (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <Select value={selectedZone} onValueChange={setSelectedZone}>
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
            <CounterCard
              key={contador.id}
              counter={contador}
              onClick={handleCounterClick}
              showConsumption={true}
              dateFormat="natural"
            />
          ))
        )}
      </div>
    </div>
  );
}