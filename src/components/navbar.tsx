"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Clock, CloudSun, Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [weather, setWeather] = useState({
    temp: "24°C",
    condition: "Soleado",
    location: "Lima, Perú",
  })

  // Actualizar la hora cada segundo
  useEffect(() => {
    setIsClient(true)
    setCurrentTime(new Date())

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const navItems = [
    { name: "Panel de Monitoreo", path: "/" },
    { name: "Video en Vivo", path: "/video" },
    { name: "Mapa", path: "/mapa" },
    { name: "Configuración", path: "/configuracion" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container flex h-16 lg:h-18 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            {/* Logo más grande para móviles */}
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br  rounded-lg flex items-center justify-center border-2  shadow-md">
              <Image
                src="/LogoITT.jpg"
                alt="Logo Universidad"
                width={48}
                height={48}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-blue-700 text-xl lg:text-2xl">Dron-CRoD</span>
              <span className="text-xs text-blue-500 hidden lg:block">Control & Monitoring</span>
            </div>
          </Link>
        </div>

        {/* Navegación para escritorio */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm lg:text-base font-medium transition-all duration-200 hover:text-blue-700 hover:scale-105 ${
                pathname === item.path ? "text-blue-700 border-b-2 border-blue-700 pb-1" : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Información de hora y clima - solo escritorio */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="font-mono">{isClient && currentTime ? currentTime.toLocaleTimeString() : "--:--:--"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            <CloudSun className="w-4 h-4 text-blue-600" />
            <span>
              {weather.temp} | {weather.condition}
            </span>
          </div>
        </div>

        {/* Botón de menú móvil mejorado */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-10 w-10 rounded-lg hover:bg-blue-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6 text-blue-700" /> : <Menu className="h-6 w-6 text-blue-700" />}
        </Button>
      </div>

      {/* Menú móvil mejorado */}
      {isOpen && (
        <div className="md:hidden border-t border-blue-100 bg-white/98 backdrop-blur-sm">
          <div className="container py-6">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`group flex items-center px-4 py-4 text-base font-medium rounded-xl transition-all duration-200 ${
                    pathname === item.path
                      ? "text-blue-700 bg-blue-50 border-l-4 border-blue-700"
                      : "text-gray-700 hover:text-blue-700 hover:bg-blue-50/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center w-full">
                    <div
                      className={`w-2 h-2 rounded-full mr-4 transition-colors ${
                        pathname === item.path ? "bg-blue-700" : "bg-gray-300 group-hover:bg-blue-400"
                      }`}
                    />
                    <span className="flex-1">{item.name}</span>
                    {pathname === item.path && <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" />}
                  </div>
                </Link>
              ))}
            </nav>

            {/* Información adicional solo en móvil */}
            <div className="mt-6 pt-6 border-t border-blue-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Clock className="w-5 h-5" />
                    <div>
                      <p className="text-xs font-medium">Hora actual</p>
                      <p className="text-sm font-mono">
                        {isClient && currentTime ? currentTime.toLocaleTimeString() : "--:--:--"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-green-700">
                    <CloudSun className="w-5 h-5" />
                    <div>
                      <p className="text-xs font-medium">Clima</p>
                      <p className="text-sm">{weather.temp}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estado de conexión en móvil */}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Estado del sistema</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-700 font-medium">Conectado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
