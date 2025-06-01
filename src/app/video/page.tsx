"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Download, Maximize2, Pause, Play, Radio, RotateCw } from "lucide-react"

export default function VideoPage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isConnected, setIsConnected] = useState(true)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [videoStats, setVideoStats] = useState({
    resolution: "1280x720",
    fps: 30,
    bitrate: "2.4 Mbps",
    latency: 120,
  })

  // Datos simulados del dron
  const [droneData, setDroneData] = useState({
    gps: {
      latitude: -12.0464,
      longitude: -77.0428,
      altitudeRelative: 15.2,
    },
    velocity: {
      horizontal: 2.3,
      vertical: 0.1,
    },
    heading: 127,
    battery: {
      percentage: 85,
    },
    attitude: {
      pitch: -2.1,
      roll: 1.8,
      yaw: 127,
    },
    flightMode: "STABILIZED",
    rssi: 78,
  })

  useEffect(() => {
    setIsClient(true)
    setCurrentTime(new Date())

    const timer = setInterval(() => {
      setCurrentTime(new Date())
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
        gps: {
          ...prev.gps,
          altitudeRelative: prev.gps.altitudeRelative + (Math.random() - 0.5) * 0.1,
        },
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Manejar cambios de pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const handleFullscreen = async () => {
    if (!videoContainerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await videoContainerRef.current.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error("Error al cambiar a pantalla completa:", error)
    }
  }

  const handleScreenshot = () => {
    // En una implementación real, esto capturaría una imagen del video
    alert("Captura de pantalla guardada")
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Video en Vivo</h1>
              <p className="text-blue-100">Transmisión en tiempo real desde el dron</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"} animate-pulse`} />
                <span className="text-sm">{isConnected ? "Transmisión activa" : "Sin señal"}</span>
              </div>
              <Badge variant="secondary">{videoStats.resolution}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video principal */}
          <div className="lg:col-span-2">
            <Card className="border-blue-100">
              <CardContent className="p-0 relative">
                {/* Video simulado */}
                <div
                  ref={videoContainerRef}
                  className={`w-full aspect-video bg-gray-900 flex items-center justify-center relative overflow-hidden ${
                    isFullscreen ? "fixed inset-0 z-50 aspect-auto" : ""
                  }`}
                >
                  {/* Simulación de video con gradiente animado */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-blue-700/30 animate-pulse"></div>

                  {/* Elementos de HUD (Heads Up Display) */}
                  <div className="absolute top-4 left-4 text-white text-xs font-mono bg-black/50 p-1 rounded">
                    REC 00:
                    {isClient && currentTime ? Math.floor(currentTime.getSeconds()).toString().padStart(2, "0") : "00"}
                  </div>

                  <div className="absolute top-4 right-4 text-white text-xs font-mono bg-black/50 p-1 rounded flex items-center gap-2">
                    <Radio className="w-3 h-3" />
                    {videoStats.fps} FPS | {videoStats.bitrate}
                  </div>

                  <div className="absolute bottom-4 left-4 text-white text-xs font-mono bg-black/50 p-1 rounded">
                    {droneData.gps.latitude.toFixed(6)}, {droneData.gps.longitude.toFixed(6)} | ALT:{" "}
                    {droneData.gps.altitudeRelative.toFixed(1)}m
                  </div>

                  <div className="absolute bottom-4 right-4 text-white text-xs font-mono bg-black/50 p-1 rounded">
                    BAT: {droneData.battery.percentage.toFixed(0)}% | {droneData.flightMode}
                  </div>

                  {/* Horizonte artificial simplificado */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-32 h-32 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-white/50"></div>
                      <div
                        className="absolute w-full h-0.5 bg-white/50"
                        style={{
                          transform: `rotate(${droneData.attitude.roll}deg) translateY(${droneData.attitude.pitch * 2}px)`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Mensaje cuando está pausado */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <Play className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}

                  {/* Mensaje central */}
                  <div className="text-white text-lg font-bold">
                    {isPlaying ? "Transmisión en vivo" : "Video pausado"}
                  </div>

                  {/* Controles en pantalla completa */}
                  {isFullscreen && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 p-2 rounded">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleScreenshot}
                        className="text-white hover:bg-white/20"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleFullscreen}
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Controles de video (solo visible cuando no está en pantalla completa) */}
                {!isFullscreen && (
                  <div className="p-4 border-t border-blue-100 bg-blue-50/50">
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                        {isPlaying ? "Pausar" : "Reproducir"}
                      </Button>

                      <Button variant="outline" size="sm" onClick={handleScreenshot}>
                        <Camera className="w-4 h-4 mr-1" />
                        Capturar
                      </Button>

                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Grabar
                      </Button>

                      <Button variant="outline" size="sm" onClick={handleFullscreen}>
                        <Maximize2 className="w-4 h-4 mr-1" />
                        Pantalla completa
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral */}
          <div>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="info" className="flex-1">
                  Información
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">
                  Ajustes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-700">Telemetría</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">Altitud</p>
                        <p className="font-mono text-lg">{droneData.gps.altitudeRelative.toFixed(1)} m</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Velocidad</p>
                        <p className="font-mono text-lg">{droneData.velocity.horizontal.toFixed(1)} m/s</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-blue-50 rounded">
                        <p className="text-gray-500 text-xs">Pitch</p>
                        <p className="font-mono">{droneData.attitude.pitch.toFixed(1)}°</p>
                      </div>
                      <div className="p-2 bg-blue-50 rounded">
                        <p className="text-gray-500 text-xs">Roll</p>
                        <p className="font-mono">{droneData.attitude.roll.toFixed(1)}°</p>
                      </div>
                      <div className="p-2 bg-blue-50 rounded">
                        <p className="text-gray-500 text-xs">Yaw</p>
                        <p className="font-mono">{droneData.attitude.yaw.toFixed(1)}°</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Batería</span>
                      <Badge variant={droneData.battery.percentage < 20 ? "destructive" : "default"}>
                        {droneData.battery.percentage.toFixed(0)}%
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Modo de Vuelo</span>
                      <Badge className="bg-blue-600">{droneData.flightMode}</Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Señal</span>
                      <div className="flex items-center gap-1">
                        <div className="flex h-3 items-end gap-0.5">
                          <div className={`w-1 ${droneData.rssi > 20 ? "bg-blue-700" : "bg-gray-300"} h-1`}></div>
                          <div className={`w-1 ${droneData.rssi > 40 ? "bg-blue-700" : "bg-gray-300"} h-2`}></div>
                          <div className={`w-1 ${droneData.rssi > 60 ? "bg-blue-700" : "bg-gray-300"} h-2.5`}></div>
                          <div className={`w-1 ${droneData.rssi > 80 ? "bg-blue-700" : "bg-gray-300"} h-3`}></div>
                        </div>
                        <span className="text-xs">{droneData.rssi}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-700">Información de Video</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">Resolución</p>
                        <p className="font-mono">{videoStats.resolution}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">FPS</p>
                        <p className="font-mono">{videoStats.fps}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">Bitrate</p>
                        <p className="font-mono">{videoStats.bitrate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Latencia</p>
                        <p className="font-mono">{videoStats.latency} ms</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-blue-700">Ajustes de Cámara</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Resolución</span>
                        <span className="text-sm font-mono">{videoStats.resolution}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" className="w-full">
                          720p
                        </Button>
                        <Button variant="outline" size="sm" className="w-full bg-blue-50">
                          1080p
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          4K
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">FPS</span>
                        <span className="text-sm font-mono">{videoStats.fps}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" className="w-full">
                          24
                        </Button>
                        <Button variant="outline" size="sm" className="w-full bg-blue-50">
                          30
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          60
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Rotación</span>
                        <span className="text-sm font-mono">0°</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        <RotateCw className="w-4 h-4 mr-2" />
                        Rotar cámara
                      </Button>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <Button className="w-full bg-blue-700 hover:bg-blue-800">Aplicar cambios</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
