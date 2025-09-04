// Analytics page with summary view (GitHub-style timeline) and list view
// Shows water quality analyses with filtering by type and zone

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, BarChart3, List, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BackButton } from '@/components/ui/back-button';

type Analytic = {
  id: number;
  tipo: 'Cloro/pH' | 'Turbidez' | 'Dureza' | 'Completa';
  fecha: string;
  zona: string;
  realizadoPor: string;
  tipoRealizador: 'interno' | 'externo';
  problematica: boolean;
  apta: boolean;
  // Specific values per type - would vary in real implementation
  valores?: {
    cloro?: number;
    ph?: number;
    turbidez?: number;
  };
  notas?: string;
};

export default function AnaliticasPage() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'summary' | 'list'>('summary');
  const [selectedType, setSelectedType] = useState('Cloro/pH');
  const [selectedZone, setSelectedZone] = useState('todas');
  const [selectedPeriod, setSelectedPeriod] = useState('ultimo6');
  const [selectedResult, setSelectedResult] = useState('todos');
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  // Mock data - replace with real data later
  const analiticas: Analytic[] = [
    {
      id: 1,
      tipo: 'Cloro/pH',
      fecha: '2024-08-15',
      zona: 'Os Casas',
      realizadoPor: 'María González',
      tipoRealizador: 'interno',
      problematica: false,
      apta: true,
      valores: { cloro: 0.5, ph: 7.2 }
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
      valores: { cloro: 0.2, ph: 8.5 }
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
      valores: { turbidez: 1.2 }
    },
    {
      id: 4,
      tipo: 'Completa',
      fecha: '2024-08-10',
      zona: 'Todas',
      realizadoPor: 'Lab. AguaSegura',
      tipoRealizador: 'externo',
      problematica: false,
      apta: true
    },
    {
      id: 5,
      tipo: 'Dureza',
      fecha: '2024-08-08',
      zona: 'Todas',
      realizadoPor: 'Lab. Galicia Análisis',
      tipoRealizador: 'externo',
      problematica: true,
      apta: false
    }
  ];

  const tipos = ['Cloro/pH', 'Turbidez', 'Dureza', 'Completa'];
  const zonas = ['Os Casas', 'Centro', 'Ramis'];

  // Count active filters for badge
  const activeFiltersCount = [
    selectedZone !== 'todas',
    selectedPeriod !== 'ultimo6',
    selectedResult !== 'todos'
  ].filter(Boolean).length;

  // Clear more filters
  const clearMoreFilters = () => {
    setSelectedZone('todas');
    setSelectedPeriod('ultimo6');
    setSelectedResult('todos');
  };

  // Filter analytics based on selected filters
  const filteredAnaliticas = analiticas.filter(analitic => {
    const matchesType = analitic.tipo === selectedType;
    const matchesZone = selectedZone === 'todas' || analitic.zona === selectedZone || analitic.zona === 'Todas';
    const matchesResult = selectedResult === 'todos' || 
      (selectedResult === 'correctas' && analitic.apta) ||
      (selectedResult === 'anomalas' && !analitic.apta);
    return matchesType && matchesZone && matchesResult;
  });

  // Generate GitHub-style activity data (weeks x days of week)
  const generateGitHubActivityData = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Calculate date range based on selected period
    let startDate: Date, endDate: Date;
    
    if (selectedPeriod === 'ultimo6') {
      // Last 6 months ending today
      endDate = new Date(currentDate);
      startDate = new Date(currentDate);
      startDate.setMonth(startDate.getMonth() - 6);
    } else if (selectedPeriod === 'year2025') {
      startDate = new Date(2025, 0, 1);
      endDate = new Date(2025, 11, 31);
    } else if (selectedPeriod === 'year2024') {
      startDate = new Date(2024, 0, 1);
      endDate = new Date(2024, 11, 31);
    } else if (selectedPeriod === 'year2023') {
      startDate = new Date(2023, 0, 1);
      endDate = new Date(2023, 11, 31);
    }
    
    // Generate weeks starting from Monday
    const weeks = [];
    const monthLabels: Array<{week: number, month: string}> = [];
    
    // Find first Monday of the period
    const firstDate = new Date(startDate);
    const dayOfWeek = firstDate.getDay();
    const daysToMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek; // Sunday = 0, so 1 day to Monday, otherwise 8-dayOfWeek
    if (dayOfWeek !== 1) { // If not already Monday
      firstDate.setDate(firstDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    }
    
    let currentWeekStart = new Date(firstDate);
    let weekIndex = 0;
    
    while (currentWeekStart <= endDate) {
      const week = [];
      let currentMonth = '';
      
      // Generate 7 days for this week (Monday to Sunday)
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const currentDay = new Date(currentWeekStart);
        currentDay.setDate(currentDay.getDate() + dayOfWeek);
        
        // Check if this day is within our period
        const isInPeriod = currentDay >= startDate && currentDay <= endDate;
        let status = 'empty';
        
        if (isInPeriod) {
          const dayOfYear = Math.floor((currentDay.getTime() - new Date(currentDay.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
          const monthIndex = currentDay.getMonth();
          const dayOfMonth = currentDay.getDate();
          
          // Apply same logic as before but based on actual dates
          if (selectedType === 'todas') {
            const hasAnalytic = Math.random() > 0.8;
            const hasProblems = hasAnalytic && Math.random() > 0.9;
            status = hasProblems ? 'problem' : hasAnalytic ? 'success' : 'empty';
          } else if (selectedType === 'Cloro/pH') {
            if (monthIndex === 2 && dayOfMonth >= 10 && dayOfMonth <= 16) {
              status = 'empty'; // Gap in March
            } else if (monthIndex === 5 && dayOfMonth >= 20 && dayOfMonth <= 25) {
              status = 'empty'; // Gap in June
            } else if ((monthIndex === 1 && dayOfMonth === 15) || (monthIndex === 4 && dayOfMonth === 8) || (monthIndex === 7 && dayOfMonth === 22)) {
              status = 'problem'; // Rare problems
            } else {
              status = Math.random() > 0.05 ? 'success' : 'empty'; // 95% coverage
            }
          } else if (selectedType === 'Turbidez') {
            const realDayOfWeek = currentDay.getDay();
            if (realDayOfWeek === 1) { // Monday
              const weekOfMonth = Math.floor((dayOfMonth - 1) / 7);
              if (weekOfMonth % 2 === 0) {
                if ((monthIndex === 1 && dayOfMonth === 12) || (monthIndex === 4 && dayOfMonth === 19) || (monthIndex === 8 && dayOfMonth === 23)) {
                  status = 'empty';
                } else if (monthIndex === 6 && dayOfMonth === 7) {
                  status = 'problem';
                } else {
                  status = 'success';
                }
              }
            }
          } else if (selectedType === 'Dureza') {
            if ((monthIndex === 2 && dayOfMonth === 15) || (monthIndex === 6 && dayOfMonth === 10) || (monthIndex === 10 && dayOfMonth === 20)) {
              status = 'success';
            }
          } else if (selectedType === 'Completa') {
            if (monthIndex === 5 && dayOfMonth === 15) {
              status = 'success';
            }
          }
        }
        
        week.push({
          date: new Date(currentDay),
          status,
          isInPeriod
        });
        
        // Track month labels
        if (dayOfWeek === 0 && currentDay.getDate() <= 7) { // First week of month
          const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
          currentMonth = monthNames[currentDay.getMonth()];
        }
      }
      
      weeks.push({
        week: week,
        monthLabel: currentMonth
      });
      
      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      weekIndex++;
    }
    
    return weeks;
  };

  const activityData = generateGitHubActivityData();

  // Helper function to format date naturally
  const formatNaturalDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  };

  const renderSummaryView = () => (
    <div className="space-y-6">
      {/* GitHub-style Activity Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="text-center mb-4">
          <h3 className="font-semibold text-gray-900 mb-1">
            {selectedType.toUpperCase()}
          </h3>
          {selectedZone !== 'todas' && (
            <p className="text-sm text-gray-600">{selectedZone}</p>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Month labels */}
            <div className="flex mb-2">
              <div className="w-8"></div> {/* Space for day labels */}
              {activityData.map((weekData, weekIndex) => (
                <div key={weekIndex} className="w-3 text-center">
                  {weekData.monthLabel && (
                    <span className="text-xs text-gray-600 font-medium">
                      {weekData.monthLabel}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Activity grid */}
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dayLabel, dayIndex) => (
              <div key={dayLabel} className="flex items-center mb-1">
                <div className="w-8 text-xs text-gray-600 font-medium text-right pr-2">
                  {dayLabel}
                </div>
                {activityData.map((weekData, weekIndex) => {
                  const dayData = weekData.week[dayIndex];
                  return (
                    <div
                      key={weekIndex}
                      className={`w-3 h-3 rounded-sm mr-1 ${
                        !dayData.isInPeriod
                          ? 'bg-transparent'
                          : dayData.status === 'success' 
                          ? 'bg-green-500' 
                          : dayData.status === 'problem'
                          ? 'bg-red-500'
                          : 'bg-gray-200'
                      }`}
                      title={dayData.isInPeriod ? `${dayData.date.toLocaleDateString()}: ${
                        dayData.status === 'success' 
                          ? 'Analítica realizada' 
                          : dayData.status === 'problem'
                          ? 'Analítica con problemas'
                          : 'Sin analítica'
                      }` : ''}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span>Realizada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <span>Con problemas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
            <span>Sin datos</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="space-y-3">
      {filteredAnaliticas.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No se encontraron analíticas
        </div>
      ) : (
        filteredAnaliticas.map((analitic) => (
          <div
            key={analitic.id}
            className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => router.push(`/dashboard/registros/analiticas/${analitic.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {analitic.tipo}
                  </h3>
                  {!analitic.apta && (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  {formatNaturalDate(analitic.fecha)}
                </p>
                <p className="text-sm text-gray-500">
                  {analitic.zona}
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
  );

  return (
    <div className="px-3 py-4 pb-20">
      <div className="mb-4">
        <BackButton href="/dashboard/registros" />
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analíticas</h1>
        <p className="text-gray-600">Análisis de calidad del agua</p>
      </div>

      {/* Main Filters - Compact */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          {/* Type Filter - Prominent */}
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="text-base font-medium flex-1">
              <SelectValue placeholder="🧪 Selecciona tipo" />
            </SelectTrigger>
            <SelectContent>
              {tipos.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  🧪 {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* More Filters Button */}
          <Dialog open={isMoreFiltersOpen} onOpenChange={setIsMoreFiltersOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 px-4">
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
                <DialogTitle>Más filtros</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Zone Filter - Now as dropdown */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">ZONA</h3>
                  <Select value={selectedZone} onValueChange={setSelectedZone}>
                    <SelectTrigger>
                      <SelectValue placeholder="📍 Selecciona zona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">📍 Todas las zonas</SelectItem>
                      {zonas.map((zona) => (
                        <SelectItem key={zona} value={zona}>
                          📍 {zona}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Period Filter - Now as dropdown */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">PERÍODO</h3>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="📅 Selecciona período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ultimo6">📅 Últimos 6 meses</SelectItem>
                      <SelectItem value="year2025">📅 Año 2025</SelectItem>
                      <SelectItem value="year2024">📅 Año 2024</SelectItem>
                      <SelectItem value="year2023">📅 Año 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Result Filter - New */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">RESULTADO</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="resultado"
                        value="todos"
                        checked={selectedResult === 'todos'}
                        onChange={(e) => setSelectedResult(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Todos los resultados</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="resultado"
                        value="correctas"
                        checked={selectedResult === 'correctas'}
                        onChange={(e) => setSelectedResult(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Correctas
                      </span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="resultado"
                        value="anomalas"
                        checked={selectedResult === 'anomalas'}
                        onChange={(e) => setSelectedResult(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        Anómalas
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={clearMoreFilters}
                  className="flex-1"
                >
                  Limpiar
                </Button>
                <Button 
                  onClick={() => setIsMoreFiltersOpen(false)}
                  className="flex-1"
                >
                  Aplicar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setCurrentView('summary')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            currentView === 'summary'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Resumen
        </button>
        <button
          onClick={() => setCurrentView('list')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            currentView === 'list'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <List className="h-4 w-4" />
          Lista
        </button>
      </div>


      {/* Content based on current view */}
      {currentView === 'summary' ? renderSummaryView() : renderListView()}
    </div>
  );
}