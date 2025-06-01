"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Navigation, Route, Target, Trash2, Plus, Send } from "lucide-react"

interface RoutePoint {
  id: string
  lat: number
  lng: number
  name: string
}

interface SavedRoute {
  id: string
  name: string
  description: string
  points: RoutePoint[]
  createdAt: string
  estimatedTime: string
  distance: string
}

export default function MapaPage() {
  const [isConnected, setIsConnected] = useState(true)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isRouteDialogOpen, setIsRouteDialogOpen] = useState(false)

  // Datos simulados del dron
  const [droneData, setDroneData] = useState({
    gps: {
      latitude: -12.0464,
      longitude: -77.0428,
      altitudeRelative: 15.2,
    },
    heading: 127,
    flightMode: "STABILIZED",
  })

  // Puntos de ruta actuales
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([
    { id: "1", lat: -12.0464, lng: -77.0428, name: "Inicio" },
    { id: "2", lat: -12.047, lng: -77.0435, name: "Punto 1" },
    { id: "3", lat: -12.0475, lng: -77.043, name: "Punto 2" },
    { id: "4", lat: -12.0468, lng: -77.042, name: "Punto 3" },
    { id: "5", lat: -12.0464, lng: -77.0428, name: "Fin" },
  ])

  // Rutas guardadas
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([
    {
      id: "route1",
      name: "Ruta de Inspección Campus",
      description: "Inspección completa del campus universitario",
      points: [],
      createdAt: "2024-01-15 10:30",
      estimatedTime: "8:45 min",
      distance: "2.1 km",
    },
    {
      id: "route2",
      name: "Monitoreo Perímetro",
      description: "Vigilancia del perímetro de seguridad",
      points: [],
      createdAt: "2024-01-14 14:20",
      estimatedTime: "12:30 min",
      distance: "3.5 km",
    },
  ])

  // Formulario para nueva ruta
  const [newRoute, setNewRoute] = useState({
    name: "",
    description: "",
  })

  useEffect(() => {
    setIsClient(true)
    setCurrentTime(new Date())

    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simular cambios en los datos
      setDroneData((prev) => ({
        ...prev,
        heading: (prev.heading + 1) % 360,
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Función para eliminar un punto de ruta
  const removeRoutePoint = (pointId: string) => {
    setRoutePoints((prev) => prev.filter((point) => point.id !== pointId))
  }

  // Función para agregar un nuevo punto
  const addRoutePoint = () => {
    const newPoint: RoutePoint = {
      id: Date.now().toString(),
      lat: droneData.gps.latitude + (Math.random() - 0.5) * 0.01,
      lng: droneData.gps.longitude + (Math.random() - 0.5) * 0.01,
      name: `Punto ${routePoints.length}`,
    }
    setRoutePoints((prev) => [...prev, newPoint])
  }

  const saveCurrentRoute = () => {
    if (!newRoute.name.trim()) {
      alert("Por favor, ingresa un nombre para la ruta")
      return
    }

    const savedRoute: SavedRoute = {
  id: Date.now().toString(),
  name: newRoute.name,
  description: newRoute.description,
  points: [...routePoints],
  createdAt: isClient && currentTime ? currentTime.toLocaleString() : new Date().toLocaleString(),
  estimatedTime: `${Math.floor(routePoints.length * 1.5)}:${((routePoints.length * 30) % 60).toString().padStart(2, "0")} min`,
  distance: `${(routePoints.length * 0.3).toFixed(1)} km`,
}


    setSavedRoutes((prev) => [savedRoute, ...prev])
    setNewRoute({ name: "", description: "" })
    setIsRouteDialogOpen(false)
    alert("Ruta guardada exitosamente")
  }

  // Función para cargar una ruta guardada
  const loadSavedRoute = (route: SavedRoute) => {
    setRoutePoints(route.points)
    alert(`Ruta "${route.name}" cargada exitosamente`)
  }

  // Función para eliminar una ruta guardada
  const deleteSavedRoute = (routeId: string) => {
    setSavedRoutes((prev) => prev.filter((route) => route.id !== routeId))
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Mapa de Navegación</h1>
              <p className="text-blue-100">Posición y ruta del dron</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"} animate-pulse`} />
                <span className="text-sm">{isConnected ? "GPS Activo" : "Sin GPS"}</span>
              </div>
              <Badge variant="secondary">{droneData.flightMode}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4 lg:mt-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Mapa principal */}
          <div className="lg:col-span-3">
            <Card className="border-blue-100">
              <CardContent className="p-0">
                {/* Mapa simulado */}
                <div className="w-full h-[50vh] min-h-[400px] max-h-[600px] bg-blue-50 relative overflow-hidden">
                  {/* Fondo de mapa simulado */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                    <div className="absolute inset-0 grid grid-cols-20 grid-rows-20">
                      {Array.from({ length: 400 }).map((_, i) => (
                        <div key={i} className="border border-blue-200/20"></div>
                      ))}
                    </div>
                  </div>

                  {/* Ruta simulada */}
                  <svg className="absolute inset-0 w-full h-full">
                    {routePoints.length > 1 && (
                      <polyline
                        points={routePoints
                          .map((_, index) => {
                            const x = 150 + index * 50
                            const y = 150 + Math.sin(index) * 50
                            return `${x},${y}`
                          })
                          .join(" ")}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    )}

                    {/* Puntos de ruta */}
                    {routePoints.map((point, index) => {
                      const x = 150 + index * 50
                      const y = 150 + Math.sin(index) * 50
                      return <circle key={point.id} cx={x} cy={y} r="4" fill="#3b82f6" />
                    })}

                    {/* Posición actual del dron */}
                    <circle cx="180" cy="200" r="8" fill="#ef4444" />

                    {/* Dirección del dron */}
                    <line
                      x1="180"
                      y1="200"
                      x2={180 + Math.cos((droneData.heading * Math.PI) / 180) * 20}
                      y2={200 + Math.sin((droneData.heading * Math.PI) / 180) * 20}
                      stroke="#ef4444"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Información de coordenadas */}
                  <div className="absolute bottom-4 left-4 text-xs lg:text-sm bg-white/80 p-2 rounded shadow">
                    <span className="font-mono">
                      Lat: {droneData.gps.latitude.toFixed(6)}, Lng: {droneData.gps.longitude.toFixed(6)}
                    </span>
                  </div>

                  {/* Controles de mapa */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button variant="outline" size="icon" className="bg-white shadow-md">
                      <MapPin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-white shadow-md">
                      <Navigation className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-white shadow-md">
                      <Target className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral */}
          <div className="space-y-2 lg:space-y-4">
            {/* Puntos de ruta actuales */}
            <Card className="border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Route className="w-5 h-5" />
                    Puntos de Ruta
                  </div>
                  <Button variant="outline" size="sm" onClick={addRoutePoint}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 max-h-32 lg:max-h-48 overflow-y-auto">
                  {routePoints.map((point, index) => (
                    <div key={point.id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs">
                          {index + 1}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{point.name}</span>
                          <span className="text-xs text-gray-500 font-mono">
                            {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">
                          {index === 0 ? "Inicio" : index === routePoints.length - 1 ? "Fin" : `P${index}`}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeRoutePoint(point.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <Dialog open={isRouteDialogOpen} onOpenChange={setIsRouteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-blue-700 hover:bg-blue-800" disabled={routePoints.length === 0}>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar ruta al dron
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Guardar Ruta</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="route-name">Nombre de la ruta</Label>
                          <Input
                            id="route-name"
                            placeholder="Ej: Inspección Campus Norte"
                            value={newRoute.name}
                            onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="route-description">Descripción (opcional)</Label>
                          <Textarea
                            id="route-description"
                            placeholder="Describe el propósito de esta ruta..."
                            value={newRoute.description}
                            onChange={(e) => setNewRoute({ ...newRoute, description: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Puntos de ruta:</strong> {routePoints.length}
                          </p>
                          <p className="text-sm text-blue-800">
                            <strong>Distancia estimada:</strong> {(routePoints.length * 0.3).toFixed(1)} km
                          </p>
                          <p className="text-sm text-blue-800">
                            <strong>Tiempo estimado:</strong> {Math.floor(routePoints.length * 1.5)}:
                            {((routePoints.length * 30) % 60).toString().padStart(2, "0")} min
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" onClick={() => setIsRouteDialogOpen(false)} className="flex-1">
                            Cancelar
                          </Button>
                          <Button onClick={saveCurrentRoute} className="flex-1 bg-blue-700 hover:bg-blue-800">
                            Guardar y Enviar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas de ruta actual */}
            <Card className="border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-700">Estadísticas de Ruta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Distancia</p>
                    <p className="text-lg font-mono">{(routePoints.length * 0.3).toFixed(1)} km</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Tiempo est.</p>
                    <p className="text-lg font-mono">
                      {Math.floor(routePoints.length * 1.5)}:
                      {((routePoints.length * 30) % 60).toString().padStart(2, "0")} min
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Puntos</p>
                    <p className="text-lg font-mono">{routePoints.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Velocidad</p>
                    <p className="text-lg font-mono">3.5 m/s</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-sm">Progreso</span>
                    <span className="text-sm font-mono">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rutas guardadas */}
            <Card className="border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-700">Rutas Guardadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 lg:max-h-64 overflow-y-auto">
                  {savedRoutes.map((route) => (
                    <div key={route.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{route.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{route.description}</p>
                          <div className="flex gap-4 mt-2 text-xs text-gray-600">
                            <span>{route.distance}</span>
                            <span>{route.estimatedTime}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{route.createdAt}</p>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => loadSavedRoute(route)}
                            className="h-7 px-2 text-xs"
                          >
                            Cargar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSavedRoute(route.id)}
                            className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Información actual */}
            <Card className="border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-700">Información Actual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Latitud</p>
                    <p className="text-sm font-mono">{droneData.gps.latitude.toFixed(6)}°</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Longitud</p>
                    <p className="text-sm font-mono">{droneData.gps.longitude.toFixed(6)}°</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Altitud</p>
                    <p className="text-sm font-mono">{droneData.gps.altitudeRelative.toFixed(1)} m</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Rumbo</p>
                    <p className="text-sm font-mono">{droneData.heading.toFixed(0)}°</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Modo</span>
                  <Badge className="bg-blue-600">{droneData.flightMode}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
