"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Camera, Maximize2, Pause, Play, Radio, Video } from "lucide-react"

interface VideoWidgetProps {
  droneData: {
    gps: {
      latitude: number
      longitude: number
      altitudeRelative: number
    }
    battery: {
      percentage: number
    }
    attitude: {
      pitch: number
      roll: number
      yaw: number
    }
    flightMode: string
  }
}

export default function VideoWidget({ droneData }: VideoWidgetProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setCurrentTime(new Date())

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="border-blue-100">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-blue-700">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Video en Vivo
          </div>
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
            EN VIVO
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 lg:space-y-4">
        {/* Video compacto */}
        <div className="w-full aspect-video bg-gray-900 flex items-center justify-center relative overflow-hidden rounded-lg">
          {/* Simulación de video con gradiente animado */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-blue-700/30 animate-pulse"></div>

          {/* Elementos de HUD simplificados */}
          <div className="absolute top-2 left-2 text-white text-[10px] lg:text-xs font-mono bg-black/50 p-1 rounded">
            REC 00:{isClient && currentTime ? Math.floor(currentTime.getSeconds()).toString().padStart(2, "0") : "00"}
          </div>

          <div className="absolute top-2 right-2 text-white text-[10px] lg:text-xs font-mono bg-black/50 p-1 rounded flex items-center gap-1">
            <Radio className="w-2 h-2" />
            720p
          </div>

          <div className="absolute bottom-2 left-2 text-white text-[10px] lg:text-xs font-mono bg-black/50 p-1 rounded">
            ALT: {droneData.gps.altitudeRelative.toFixed(1)}m
          </div>

          <div className="absolute bottom-2 right-2 text-white text-[10px] lg:text-xs font-mono bg-black/50 p-1 rounded">
            BAT: {droneData.battery.percentage.toFixed(0)}%
          </div>

          {/* Horizonte artificial simplificado */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center">
              <div className="w-full h-0.5 bg-white/50"></div>
              <div
                className="absolute w-full h-0.5 bg-white/50"
                style={{
                  transform: `rotate(${droneData.attitude.roll}deg) translateY(${droneData.attitude.pitch * 1}px)`,
                }}
              ></div>
            </div>
          </div>

          {/* Mensaje cuando está pausado */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <Play className="w-8 h-8 text-white opacity-50" />
            </div>
          )}

          {/* Mensaje central */}
          <div className="text-white text-xs lg:text-sm font-bold">
            {isPlaying ? "Transmisión activa" : "Video pausado"}
          </div>
        </div>

        {/* Controles compactos */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 lg:gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </Button>
            <Button variant="outline" size="sm">
              <Camera className="w-3 h-3" />
            </Button>
          </div>

          <Link href="/video">
            <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
              <Maximize2 className="w-3 h-3 mr-1" />
              Ver completo
            </Button>
          </Link>
        </div>

        {/* Información básica */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Modo:</span>
            <span className="font-mono">{droneData.flightMode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Calidad:</span>
            <span className="font-mono">HD</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
