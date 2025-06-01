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
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/80 backdrop-blur-sm">
      <div className="container flex h-14 lg:h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            {/* Placeholder para logo de universidad */}
            <div className="w-6 h-6 lg:w-10 lg:h-10 bg-gray-100 rounded-md flex items-center justify-center border border-gray-300">
              <Image
                src="/LogoITT.jpg"
                alt="Logo Universidad"
                width={32}
                height={32}
                className="rounded-md"
              />
            </div>
            <span className="font-bold text-blue-700 text-lg lg:text-xl hidden md:inline-block">Dron-CRoD</span>
          </Link>
        </div>

        {/* Navegación para escritorio */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-colors hover:text-blue-700 ${
                pathname === item.path ? "text-blue-700" : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Información de hora y clima */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{isClient && currentTime ? currentTime.toLocaleTimeString() : "--:--:--"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600">
            <CloudSun className="w-4 h-4" />
            <span>
              {weather.temp} | {weather.condition}
            </span>
          </div>
        </div>

        {/* Botón de menú móvil */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="container md:hidden py-2 lg:py-4 border-t border-blue-100">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-blue-700 ${
                  pathname === item.path ? "text-blue-700" : "text-gray-600"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t border-blue-100">
              <Clock className="w-4 h-4" />
              <span>{isClient && currentTime ? currentTime.toLocaleTimeString() : "--:--:--"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CloudSun className="w-4 h-4" />
              <span>
                {weather.temp} | {weather.condition}
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
