"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sparkles, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    grade: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleGradeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, grade: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    try {
      // Simulación de registro
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Aquí iría la lógica de registro con la base de datos
      // Por ahora, simplemente redirigimos al perfil
      router.push("/profile")
    } catch (err) {
      setError("Error al crear la cuenta. Por favor intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-lg border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-900 to-black text-white">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="h-6 w-6 text-purple-300" />
              <span className="ml-2 text-xl font-bold">FinMateAI</span>
            </div>
            <CardTitle className="text-center">Crear Cuenta</CardTitle>
            <CardDescription className="text-center text-gray-200">
              Regístrate para comenzar a gestionar tus finanzas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    placeholder="Ingresa tu nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Edad</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Tu edad"
                    min="13"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grado Estudiantil</Label>
                  <Select onValueChange={handleGradeChange}>
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="Selecciona tu grado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preparatoria">Preparatoria</SelectItem>
                      <SelectItem value="universidad_1">Universidad - 1er año</SelectItem>
                      <SelectItem value="universidad_2">Universidad - 2do año</SelectItem>
                      <SelectItem value="universidad_3">Universidad - 3er año</SelectItem>
                      <SelectItem value="universidad_4">Universidad - 4to año</SelectItem>
                      <SelectItem value="posgrado">Posgrado</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Nombre de Usuario</Label>
                <Input
                  id="username"
                  placeholder="Elige un nombre de usuario"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crea una contraseña"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirma tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="rounded border-gray-300" required />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Acepto los{" "}
                  <Link href="#" className="text-purple-600 hover:underline">
                    Términos y Condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="#" className="text-purple-600 hover:underline">
                    Política de Privacidad
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-purple-600 hover:underline">
                Inicia Sesión
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
