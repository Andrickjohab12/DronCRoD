"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Settings, Wifi, Camera, Battery, Shield, Save } from "lucide-react"

export default function ConfiguracionPage() {
  const [isConnected, setIsConnected] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [settings, setSettings] = useState({
    // Configuración de conexión
    wifiSSID: "Dron-CRoD-Network",
    wifiPassword: "********",
    telemetryRate: 10,

    // Configuración de cámara
    videoResolution: "1080p",
    videoFPS: 30,
    videoBitrate: 2400,
    autoExposure: true,

    // Configuración de vuelo
    maxAltitude: 120,
    maxSpeed: 15,
    returnToHomeAltitude: 30,
    lowBatteryWarning: 20,

    // Configuración de seguridad
    geofenceEnabled: true,
    geofenceRadius: 500,
    autoLanding: true,
    emergencyStop: true,
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSaveSettings = () => {
    // En una implementación real, esto guardaría la configuración
    alert("Configuración guardada exitosamente")
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Configuración</h1>
              <p className="text-blue-100">Ajustes del sistema y parámetros del dron</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"} animate-pulse`} />
                <span className="text-sm">{isConnected ? "Conectado" : "Desconectado"}</span>
              </div>
              <Button onClick={handleSaveSettings} className="bg-white text-blue-700 hover:bg-blue-50">
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-6">
        <Tabs defaultValue="conexion" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="conexion">Conexión</TabsTrigger>
            <TabsTrigger value="camara">Cámara</TabsTrigger>
            <TabsTrigger value="vuelo">Vuelo</TabsTrigger>
            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          </TabsList>

          <TabsContent value="conexion">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Wifi className="w-5 h-5" />
                    Configuración de Red
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wifi-ssid">SSID de la Red</Label>
                    <Input
                      id="wifi-ssid"
                      value={settings.wifiSSID}
                      onChange={(e) => setSettings({ ...settings, wifiSSID: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wifi-password">Contraseña</Label>
                    <Input
                      id="wifi-password"
                      type="password"
                      value={settings.wifiPassword}
                      onChange={(e) => setSettings({ ...settings, wifiPassword: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telemetry-rate">Frecuencia de Telemetría (Hz)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[settings.telemetryRate]}
                        min={1}
                        max={50}
                        step={1}
                        onValueChange={(value) => setSettings({ ...settings, telemetryRate: value[0] })}
                        className="flex-1"
                      />
                      <span className="text-sm font-mono w-12">{settings.telemetryRate} Hz</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Settings className="w-5 h-5" />
                    Estado de Conexión
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Estado del Dron</span>
                    <Badge variant={isConnected ? "default" : "destructive"}>
                      {isConnected ? "Conectado" : "Desconectado"}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Señal WiFi</span>
                    <div className="flex items-center gap-1">
                      <div className="flex h-3 items-end gap-0.5">
                        <div className="w-1 bg-blue-700 h-1"></div>
                        <div className="w-1 bg-blue-700 h-2"></div>
                        <div className="w-1 bg-blue-700 h-2.5"></div>
                        <div className="w-1 bg-blue-700 h-3"></div>
                      </div>
                      <span className="text-xs">Excelente</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Latencia</span>
                    <span className="text-sm font-mono">45 ms</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tiempo de Conexión</span>
                    <span className="text-sm font-mono">00:15:32</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="camara">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Camera className="w-5 h-5" />
                    Configuración de Video
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Resolución de Video</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={settings.videoResolution === "720p" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettings({ ...settings, videoResolution: "720p" })}
                      >
                        720p
                      </Button>
                      <Button
                        variant={settings.videoResolution === "1080p" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettings({ ...settings, videoResolution: "1080p" })}
                      >
                        1080p
                      </Button>
                      <Button
                        variant={settings.videoResolution === "4K" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettings({ ...settings, videoResolution: "4K" })}
                      >
                        4K
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Frames por Segundo</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[settings.videoFPS]}
                        min={24}
                        max={60}
                        step={6}
                        onValueChange={(value) => setSettings({ ...settings, videoFPS: value[0] })}
                        className="flex-1"
                      />
                      <span className="text-sm font-mono w-12">{settings.videoFPS} FPS</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Bitrate (Kbps)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[settings.videoBitrate]}
                        min={1000}
                        max={5000}
                        step={100}
                        onValueChange={(value) => setSettings({ ...settings, videoBitrate: value[0] })}
                        className="flex-1"
                      />
                      <span className="text-sm font-mono w-16">{settings.videoBitrate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-exposure">Exposición Automática</Label>
                    <Switch
                      id="auto-exposure"
                      checked={settings.autoExposure}
                      onCheckedChange={(checked) => setSettings({ ...settings, autoExposure: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Vista Previa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Vista previa de cámara</p>
                      <p className="text-xs opacity-75">
                        {settings.videoResolution} @ {settings.videoFPS}fps
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vuelo">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Settings className="w-5 h-5" />
                    Parámetros de Vuelo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Altitud Máxima (metros)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[settings.maxAltitude]}
                        min={10}
                        max={500}
                        step={10}
                        onValueChange={(value) => setSettings({ ...settings, maxAltitude: value[0] })}
                        className="flex-1"
                      />
                      <span className="text-sm font-mono w-12">{settings.maxAltitude} m</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Velocidad Máxima (m/s)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[settings.maxSpeed]}
                        min={1}
                        max={30}
                        step={1}
                        onValueChange={(value) => setSettings({ ...settings, maxSpeed: value[0] })}
                        className="flex-1"
                      />
                      <span className="text-sm font-mono w-12">{settings.maxSpeed} m/s</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Altitud Return to Home (metros)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[settings.returnToHomeAltitude]}
                        min={10}
                        max={100}
                        step={5}
                        onValueChange={(value) => setSettings({ ...settings, returnToHomeAltitude: value[0] })}
                        className="flex-1"
                      />
                      <span className="text-sm font-mono w-12">{settings.returnToHomeAltitude} m</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Battery className="w-5 h-5" />
                    Configuración de Batería
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Alerta de Batería Baja (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[settings.lowBatteryWarning]}
                        min={10}
                        max={50}
                        step={5}
                        onValueChange={(value) => setSettings({ ...settings, lowBatteryWarning: value[0] })}
                        className="flex-1"
                      />
                      <span className="text-sm font-mono w-12">{settings.lowBatteryWarning}%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Nota:</strong> Cuando la batería alcance este nivel, el dron iniciará automáticamente el
                      procedimiento de retorno a casa.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="seguridad">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Shield className="w-5 h-5" />
                    Configuración de Seguridad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="geofence">Geofence Habilitado</Label>
                      <p className="text-sm text-gray-500">Limita el área de vuelo del dron</p>
                    </div>
                    <Switch
                      id="geofence"
                      checked={settings.geofenceEnabled}
                      onCheckedChange={(checked) => setSettings({ ...settings, geofenceEnabled: checked })}
                    />
                  </div>

                  {settings.geofenceEnabled && (
                    <div className="space-y-2">
                      <Label>Radio de Geofence (metros)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[settings.geofenceRadius]}
                          min={50}
                          max={2000}
                          step={50}
                          onValueChange={(value) => setSettings({ ...settings, geofenceRadius: value[0] })}
                          className="flex-1"
                        />
                        <span className="text-sm font-mono w-16">{settings.geofenceRadius} m</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-landing">Aterrizaje Automático</Label>
                      <p className="text-sm text-gray-500">Aterriza automáticamente en emergencias</p>
                    </div>
                    <Switch
                      id="auto-landing"
                      checked={settings.autoLanding}
                      onCheckedChange={(checked) => setSettings({ ...settings, autoLanding: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emergency-stop">Parada de Emergencia</Label>
                      <p className="text-sm text-gray-500">Detiene inmediatamente todos los motores</p>
                    </div>
                    <Switch
                      id="emergency-stop"
                      checked={settings.emergencyStop}
                      onCheckedChange={(checked) => setSettings({ ...settings, emergencyStop: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700">Acciones de Emergencia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="destructive" className="w-full">
                    Parada de Emergencia
                  </Button>

                  <Button variant="outline" className="w-full">
                    Return to Home Inmediato
                  </Button>

                  <Button variant="outline" className="w-full">
                    Aterrizaje de Emergencia
                  </Button>

                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Advertencia:</strong> Use estas funciones solo en caso de emergencia real. La parada de
                      emergencia puede causar daños al dron.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
