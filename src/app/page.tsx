"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  // Datos de ejemplo
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
    }
  ];

  const recordatoriosVencidos = [
    {
      id: 1,
      titulo: "Lectura mensual de contadores",
      tipoRegistro: "contador",
      fechaVencimiento: "2024-01-18",
      tipo: "recordatorio",
      periodicidad: "mensual"
    },
    {
      id: 2,
      titulo: "Análisis de calidad del agua",
      tipoRegistro: "analitica",
      fechaVencimiento: "2024-01-19",
      tipo: "recordatorio",
      periodicidad: "semanal"
    }
  ];

  // Combinar incidencias y recordatorios vencidos para el bloque "Requiere Atención"
  const elementosAtencion = [
    ...incidenciasAbiertas,
    ...recordatoriosVencidos
  ];

  // Datos de ejemplo para recordatorios con fechas actuales
  const hoy = new Date();
  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);
  const enTresDias = new Date(hoy);
  enTresDias.setDate(hoy.getDate() + 3);
  const enCincoDias = new Date(hoy);
  enCincoDias.setDate(hoy.getDate() + 5);
  const enDiezDias = new Date(hoy);
  enDiezDias.setDate(hoy.getDate() + 10);
  
  const recordatorios = [
    {
      id: 1,
      titulo: "Lectura mensual de contadores",
      tipoRegistro: "contador",
      fecha: hoy.toISOString().split('T')[0],
      periodicidad: "mensual"
    },
    {
      id: 2,
      titulo: "Análisis de calidad del agua",
      tipoRegistro: "analitica",
      fecha: mañana.toISOString().split('T')[0],
      periodicidad: "semanal"
    },
    {
      id: 3,
      titulo: "Mantenimiento preventivo bombas",
      tipoRegistro: "mantenimiento",
      fecha: enTresDias.toISOString().split('T')[0],
      periodicidad: "trimestral"
    },
    {
      id: 4,
      titulo: "Inspección de válvulas",
      tipoRegistro: "mantenimiento",
      fecha: enCincoDias.toISOString().split('T')[0],
      periodicidad: "mensual"
    },
    {
      id: 5,
      titulo: "Control de cloro residual",
      tipoRegistro: "analitica",
      fecha: enDiezDias.toISOString().split('T')[0],
      periodicidad: "semanal"
    }
  ];

  // Función para obtener el día de la semana en español
  const obtenerDiaSemana = (fecha: string) => {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fechaObj = new Date(fecha + 'T00:00:00');
    return diasSemana[fechaObj.getDay()];
  };

  // Función para formatear fecha con día de la semana
  const formatearFechaConDia = (fecha: string) => {
    const diaSemana = obtenerDiaSemana(fecha);
    const fechaObj = new Date(fecha + 'T00:00:00');
    const dia = fechaObj.getDate();
    const mes = fechaObj.toLocaleString('es', { month: 'long' });
    const año = fechaObj.getFullYear();
    return `${diaSemana}, ${dia} de ${mes} de ${año}`;
  };

  // Función para categorizar fechas
  const categorizarFecha = (fecha: string) => {
    const hoy = new Date();
    const fechaTarea = new Date(fecha + 'T00:00:00');
    const diffTime = fechaTarea.getTime() - hoy.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'hoy';
    } else if (diffDays > 0 && diffDays <= 7) {
      return 'esta-semana';
    } else {
      return 'proximamente';
    }
  };

  // Agrupar recordatorios por categoría temporal
  const recordatoriosAgrupados = recordatorios.reduce((grupos, recordatorio) => {
    const categoria = categorizarFecha(recordatorio.fecha);
    if (!grupos[categoria]) grupos[categoria] = {};
    
    const fecha = recordatorio.fecha;
    if (!grupos[categoria][fecha]) grupos[categoria][fecha] = [];
    grupos[categoria][fecha].push(recordatorio);
    
    return grupos;
  }, {} as Record<string, Record<string, typeof recordatorios>>);

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-14 items-center justify-between px-3">
          <Link href="/" className="font-bold text-lg">
            Gestión Aguas
          </Link>
          <div className="flex items-center gap-2 md:block hidden">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/usuarios">Usuarios</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/puntos-agua">Puntos de Agua</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 px-3 py-4">
        {/* Botón principal destacado */}
        <div className="mb-6">
          <Button 
            size="lg" 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            onClick={() => router.push('/dashboard/nuevo-registro')}
          >
            Nuevo Registro
          </Button>
        </div>

        <div className="space-y-6">
          {/* Bloque Requiere Atención */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Requiere Atención</h2>
              <span className="text-sm text-gray-500">{elementosAtencion.length} elementos</span>
            </div>
            <div className="space-y-2">
              {elementosAtencion.slice(0, 2).map((elemento) => (
                <div 
                  key={`${elemento.tipo}-${elemento.id}`} 
                  className={`p-3 ${elemento.tipo === 'incidencia' ? 'bg-orange-50' : 'bg-gray-50'} rounded-md hover:bg-gray-100 transition-colors`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          elemento.tipo === 'incidencia' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {elemento.tipo === 'incidencia' ? 'Incidencia' : 'Recordatorio Vencido'}
                        </span>
                        {/* Eliminada la clasificación del nivel de incidencia */}
                      </div>
                      <h3 className="font-medium text-sm text-gray-900">{elemento.titulo}</h3>
                      <p className="text-xs text-gray-600 mt-1">
                         {elemento.tipo === 'incidencia' ? 
                           ('ubicacion' in elemento ? elemento.ubicacion : '') : 
                           ('fechaVencimiento' in elemento ? `Vencía: ${elemento.fechaVencimiento}` : '')
                         }
                       </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs text-blue-600 cursor-pointer hover:text-blue-800 ml-auto"
                      onClick={() => {
                        if (elemento.tipo === 'incidencia') {
                          // Crear parámetros URL con los datos disponibles de la incidencia
                          const params = new URLSearchParams({
                            descripcion: elemento.titulo || '',
                            estado: 'abierta',
                            zona: 'ubicacion' in elemento ? elemento.ubicacion : '',
                            fechaApertura: 'fecha' in elemento ? elemento.fecha : new Date().toISOString().split('T')[0]
                          });
                          router.push(`/dashboard/nuevo-registro/incidencia?${params.toString()}`);
                        } else if (elemento.tipo === 'recordatorio' && 'tipoRegistro' in elemento) {
                          // Redirigir a la página de nuevo registro del tipo correspondiente
                          if (elemento.tipoRegistro === 'contador') {
                            router.push('/dashboard/nuevo-registro/contador');
                          } else if (elemento.tipoRegistro === 'analitica') {
                            router.push('/dashboard/nuevo-registro/analitica');
                          } else if (elemento.tipoRegistro === 'mantenimiento') {
                            router.push('/dashboard/nuevo-registro/mantenimiento');
                          }
                        }
                      }}
                    >
                      {elemento.tipo === 'incidencia' ? 'Ver Incidencia' : 'Añadir Registro'}
                    </span>
                  </div>
                </div>
              ))}
              {elementosAtencion.length > 2 && (
                <div className="text-center text-sm text-gray-500 mt-2">
                  {elementosAtencion.length - 2} elementos más requieren atención
                </div>
              )}
            </div>
            <a href="/dashboard/atencion" className="block w-full mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium text-center">
               Ver todos los elementos
             </a>
          </div>

          {/* Recordatorios - Reemplaza las Próximas Tareas */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Próximas Tareas</h2>
            {/* Mostrar categorías temporales */}
            {['hoy', 'esta-semana', 'proximamente'].map(categoria => {
              const tituloCategoria = categoria === 'hoy' ? 'Hoy' : 
                                    categoria === 'esta-semana' ? 'Esta Semana' : 'Próximamente';
              
              if (!recordatoriosAgrupados[categoria] || Object.keys(recordatoriosAgrupados[categoria]).length === 0) {
                return null;
              }
              
              return (
                <div key={categoria} className="mb-6">
                  <h3 className="text-base font-semibold text-gray-800 mb-3 px-2">{tituloCategoria}</h3>
                  {Object.entries(recordatoriosAgrupados[categoria]).map(([fecha, recordatoriosDelDia]) => (
                    <div key={fecha} className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 px-2">{formatearFechaConDia(fecha)}</h4>
                      <div className="space-y-2">
                        {recordatoriosDelDia.map((recordatorio) => {
                          const getTipoColor = (tipo: string) => {
                            switch (tipo) {
                              case 'contador':
                                return 'bg-purple-100 text-purple-800';
                              case 'analitica':
                                return 'bg-green-100 text-green-800';
                              case 'mantenimiento':
                                return 'bg-orange-100 text-orange-800';
                              default:
                                return 'bg-gray-100 text-gray-800';
                            }
                          };

                          const getTipoLabel = (tipo: string) => {
                            switch (tipo) {
                              case 'contador':
                                return 'Contadores';
                              case 'analitica':
                                return 'Análisis';
                              case 'mantenimiento':
                                return 'Mantenimiento';
                              default:
                                return tipo;
                            }
                          };

                          return (
                            <button
                              key={recordatorio.id}
                              className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
                              onClick={() => {
                                // Redirigir a la página de nuevo registro del tipo correspondiente
                                if (recordatorio.tipoRegistro === 'contador') {
                                  router.push('/dashboard/nuevo-registro/contador');
                                } else if (recordatorio.tipoRegistro === 'analitica') {
                                  router.push('/dashboard/nuevo-registro/analitica');
                                } else if (recordatorio.tipoRegistro === 'mantenimiento') {
                                  router.push('/dashboard/nuevo-registro');
                                }
                              }}
                            >
                              <div>
                                <div className="mb-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getTipoColor(recordatorio.tipoRegistro)}`}>
                                      {getTipoLabel(recordatorio.tipoRegistro)}
                                    </span>
                                  </div>
                                  <h4 className="font-medium text-sm text-gray-900">{recordatorio.titulo}</h4>
                                  <p className="text-xs text-gray-600 mt-1">
                                    {recordatorio.periodicidad}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className="text-blue-600 text-xs font-medium">
                                    Añadir Registro
                                  </span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
