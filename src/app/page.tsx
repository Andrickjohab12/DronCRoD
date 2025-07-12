"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Navigation,
  Battery,
  Thermometer,
  Satellite,
  Compass,
  Gauge,
  Radio,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MapPin,
  Clock,
  Activity,
  Settings,
  Play,
  Square,
  RotateCcw,
  Send,
} from "lucide-react"
import VideoWidget from "@/components/video-widget"

export default function DronCRoDDashboard() {
  const [isConnected, setIsConnected] = useState(true)
  const [isArmed, setIsArmed] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [logs, setLogs] = useState([
    { time: "14:32:15", type: "info", message: "Sistema iniciado correctamente" },
    { time: "14:32:20", type: "success", message: "GPS Fix obtenido - 12 satélites" },
    { time: "14:32:25", type: "info", message: "Modo de vuelo: STABILIZED" },
    { time: "14:32:30", type: "warning", message: "Batería al 85%" },
  ])

  // Datos simulados del dron
  const [droneData, setDroneData] = useState({
    // Navegación
    gps: {
      latitude: -12.0464,
      longitude: -77.0428,
      altitudeRelative: 15.2,
      altitudeAbsolute: 154.7,
      fix: true,
      satellites: 12,
    },
    velocity: {
      horizontal: 2.3,
      vertical: 0.1,
    },
    heading: 127,

    // Sistema
    battery: {
      percentage: 85,
      voltage: 22.4,
      current: 8.2,
    },
    temperature: 42,
    uptime: 1847, // segundos

    // Actitud
    attitude: {
      pitch: -2.1,
      roll: 1.8,
      yaw: 127,
    },
    acceleration: {
      x: 0.02,
      y: -0.01,
      z: 9.81,
    },

    // Control
    flightMode: "STABILIZED",
    rssi: 78,
    latency: 45,
  })

  useEffect(() => {
    setIsClient(true)
    setCurrentTime(new Date())

    const timer = setInterval(() => {
      const newTime = new Date()
      setCurrentTime(newTime)
      // Simular cambios en los datos
      setDroneData((prev) => ({
        ...prev,
        battery: {
          ...prev.battery,
          percentage: Math.max(0, prev.battery.percentage - 0.01),
        },
        attitude: {
          pitch: prev.attitude.pitch + (Math.random() - 0.5) * 0.5,
          roll: prev.attitude.roll + (Math.random() - 0.5) * 0.5,
          yaw: prev.attitude.yaw + (Math.random() - 0.5) * 2,
        },
        uptime: prev.uptime + 1,
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const addLog = (type: string, message: string) => {
    const newLog = {
      time: isClient && currentTime ? currentTime.toLocaleTimeString() : new Date().toLocaleTimeString(),
      type,
      message,
    }
    setLogs((prev) => [newLog, ...prev.slice(0, 9)])
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Panel de Monitoreo</h1>
              <p className="text-blue-100">Sistema de Monitoreo y Control de Dron</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"} animate-pulse`} />
                <span className="text-sm">{isConnected ? "Conectado" : "Desconectado"}</span>
              </div>
              <Badge variant={isArmed ? "destructive" : "secondary"}>{isArmed ? "ARMADO" : "DESARMADO"}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mt-4 lg:mt-6 Centered">
        <Tabs defaultValue="panel" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="panel">Panel de Monitoreo</TabsTrigger>
            <TabsTrigger value="telemetria">Telemetría</TabsTrigger>
            <TabsTrigger value="controles">Controles</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="panel" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 lg:gap-4">
              {/* Información GPS */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Navigation className="w-5 h-5" />
                    Navegación GPS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 lg:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Latitud</p>
                      <p className="font-mono">{droneData.gps.latitude.toFixed(6)}°</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Longitud</p>
                      <p className="font-mono">{droneData.gps.longitude.toFixed(6)}°</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Alt. Relativa</p>
                      <p className="font-mono">{droneData.gps.altitudeRelative.toFixed(1)} m</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Alt. Absoluta</p>
                      <p className="font-mono">{droneData.gps.altitudeAbsolute.toFixed(1)} m</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Satellite className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{droneData.gps.satellites} satélites</span>
                    </div>
                    <Badge variant={droneData.gps.fix ? "default" : "destructive"} className="bg-blue-600">
                      {droneData.gps.fix ? "GPS FIX" : "NO FIX"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Estado del Sistema */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Battery className="w-5 h-5" />
                    Estado del Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 lg:space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-500 text-sm">Batería</span>
                      <span className="font-mono">{droneData.battery.percentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={droneData.battery.percentage} className="h-2 bg-gray-100" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{droneData.battery.voltage.toFixed(1)}V</span>
                      <span>{droneData.battery.current.toFixed(1)}A</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Temperatura</p>
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-orange-500" />
                        <span className="font-mono">{droneData.temperature}°C</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Tiempo Activo</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="font-mono text-sm">{formatUptime(droneData.uptime)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video en Vivo Widget */}
              <VideoWidget droneData={droneData} />

              {/* Velocidad y Dirección */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Gauge className="w-5 h-5" />
                    Velocidad y Dirección
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 lg:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Vel. Horizontal</p>
                      <p className="font-mono text-base lg:text-lg">{droneData.velocity.horizontal.toFixed(1)} m/s</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Vel. Vertical</p>
                      <p className="font-mono text-base lg:text-lg">{droneData.velocity.vertical.toFixed(1)} m/s</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 rounded-full border-2 border-blue-200"></div>
                      <div
                        className="absolute inset-2 rounded-full bg-blue-100 flex items-center justify-center"
                        style={{ transform: `rotate(${droneData.heading}deg)` }}
                      >
                        <Compass className="w-8 h-8 text-blue-700" />
                      </div>
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-red-500 rounded"></div>
                    </div>
                  </div>
                  <p className="text-center">
                    <span className="text-gray-500 text-sm">Rumbo: </span>
                    <span className="font-mono text-base lg:text-lg">{droneData.heading.toFixed(0)}°</span>
                  </p>
                </CardContent>
              </Card>

              {/* Actitud y Orientación */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Activity className="w-5 h-5" />
                    Actitud y Orientación
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 lg:space-y-4">
                  {/* Horizonte Artificial Simplificado */}
                  <div className="flex justify-center">
                    <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-blue-200 overflow-hidden bg-gradient-to-b from-sky-400 to-green-400">
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-sky-500 to-green-500"
                        style={{
                          transform: `rotate(${droneData.attitude.roll}deg) translateY(${droneData.attitude.pitch * 2}px)`,
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-white shadow-lg"></div>
                      </div>
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-white"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-gray-500 text-xs">Pitch</p>
                      <p className="font-mono text-sm">{droneData.attitude.pitch.toFixed(1)}°</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Roll</p>
                      <p className="font-mono text-sm">{droneData.attitude.roll.toFixed(1)}°</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Yaw</p>
                      <p className="font-mono text-sm">{droneData.attitude.yaw.toFixed(1)}°</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conexión y Control */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Radio className="w-5 h-5" />
                    Conexión y Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 lg:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Modo de Vuelo</span>
                    <Badge className="bg-blue-600">{droneData.flightMode}</Badge>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-500 text-sm">Señal RSSI</span>
                      <span className="font-mono">{droneData.rssi}%</span>
                    </div>
                    <Progress value={droneData.rssi} className="h-2 bg-gray-100" />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Latencia</span>
                    <span className="font-mono">{droneData.latency}ms</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Estado</span>
                    <div className="flex items-center gap-2">
                      {isArmed ? (
                        <Shield className="w-4 h-4 text-red-500" />
                      ) : (
                        <Shield className="w-4 h-4 text-green-500" />
                      )}
                      <span className="text-sm">{isArmed ? "Armado" : "Desarmado"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="telemetria">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mapa Simulado */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <MapPin className="w-5 h-5" />
                    Posición en Mapa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-64 bg-blue-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100"></div>
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                    <div className="absolute bottom-2 left-2 text-xs text-blue-700">Lima, Perú</div>
                  </div>
                </CardContent>
              </Card>

              {/* Aceleración */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Activity className="w-5 h-5" />
                    Aceleración
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500 text-sm mb-2">Aceleración (m/s²)</p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-blue-700 text-xs">X</p>
                        <p className="font-mono text-lg">{droneData.acceleration.x.toFixed(2)}</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-blue-700 text-xs">Y</p>
                        <p className="font-mono text-lg">{droneData.acceleration.y.toFixed(2)}</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-blue-700 text-xs">Z</p>
                        <p className="font-mono text-lg">{droneData.acceleration.z.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="controles">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Settings className="w-5 h-5" />
                  Controles del Dron
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant={isArmed ? "destructive" : "default"}
                    onClick={() => {
                      setIsArmed(!isArmed)
                      addLog(isArmed ? "warning" : "info", isArmed ? "Dron desarmado" : "Dron armado")
                    }}
                    className="w-full"
                  >
                    {isArmed ? (
                      <>
                        <Square className="w-4 h-4 mr-2" />
                        Desarmar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Armar
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => addLog("info", "Comando: Despegar")}>
                    <Send className="w-4 h-4 mr-2" />
                    Despegar
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => addLog("info", "Comando: Return to Launch")}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Return to Launch
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => addLog("warning", "Comando: Aterrizar")}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Aterrizar
                  </Button>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Cambiar Modo de Vuelo</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => addLog("info", "Modo cambiado a MANUAL")}
                    >
                      Manual
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => addLog("info", "Modo cambiado a STABILIZED")}
                    >
                      Stabilized
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => addLog("info", "Modo cambiado a LOITER")}
                    >
                      Loiter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => addLog("info", "Modo cambiado a MISSION")}
                    >
                      Mission
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Activity className="w-5 h-5" />
                  Log de Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {logs.map((log, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm p-2 border-b border-gray-100">
                        <span className="text-gray-500 font-mono text-xs mt-0.5 min-w-[60px]">{log.time}</span>
                        <div className="flex items-center gap-1">
                          {log.type === "success" && <CheckCircle className="w-3 h-3 text-green-500" />}
                          {log.type === "warning" && <AlertTriangle className="w-3 h-3 text-yellow-500" />}
                          {log.type === "error" && <XCircle className="w-3 h-3 text-red-500" />}
                          {log.type === "info" && <Activity className="w-3 h-3 text-blue-500" />}
                          <span className="text-gray-800 text-xs">{log.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
