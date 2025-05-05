"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, Clock, Target, DollarSign, Camera, Edit, LogOut, PiggyBank, TrendingUp, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"

export default function ProfilePage() {
  // Datos de ejemplo del usuario
  const [user, setUser] = useState({
    name: "Carlos Rodríguez",
    username: "carlos_r",
    email: "carlos@ejemplo.com",
    joinDate: "15 de enero, 2024",
    profileImage: "",
    budget: 1200,
    completedGoals: 3,
    totalGoals: 5,
  })

  // Estado para manejar la carga de la imagen de perfil
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)

      // Crear URL para previsualizar la imagen
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
    }
  }

  // Datos de ejemplo para las metas financieras
  const financialGoals = [
    { id: 1, name: "Fondo de emergencia", target: 5000, current: 3500, completed: false },
    { id: 2, name: "Ahorro para laptop", target: 1200, current: 1200, completed: true },
    { id: 3, name: "Viaje de fin de curso", target: 800, current: 800, completed: true },
    { id: 4, name: "Curso de programación", target: 300, current: 300, completed: true },
    { id: 5, name: "Ahorro para posgrado", target: 10000, current: 2500, completed: false },
  ]

  // Datos de ejemplo para los gastos mensuales
  const monthlyExpenses = [
    { category: "Matrícula y Cuotas", amount: 500, icon: <BookOpen className="h-5 w-5" />, color: "bg-purple-600" },
    { category: "Vivienda", amount: 350, icon: <PiggyBank className="h-5 w-5" />, color: "bg-blue-500" },
    { category: "Alimentación", amount: 200, icon: <TrendingUp className="h-5 w-5" />, color: "bg-green-500" },
    { category: "Transporte", amount: 100, icon: <TrendingUp className="h-5 w-5" />, color: "bg-red-500" },
    { category: "Entretenimiento", amount: 50, icon: <TrendingUp className="h-5 w-5" />, color: "bg-indigo-500" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="container mx-auto py-12 px-4 md:px-6 flex-1">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna de información del perfil */}
            <div>
              <Card className="border-purple-200">
                <CardHeader className="bg-gradient-to-r from-purple-900 to-black text-white pb-2">
                  <CardTitle>Información del Perfil</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                      <Avatar className="h-24 w-24 border-4 border-purple-100">
                        {previewUrl ? (
                          <AvatarImage src={previewUrl || "/placeholder.svg"} alt={user.name} />
                        ) : (
                          <>
                            <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <label
                        htmlFor="profile-image"
                        className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full cursor-pointer"
                      >
                        <Camera className="h-4 w-4" />
                        <input
                          type="file"
                          id="profile-image"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-500">@{user.username}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Correo Electrónico</p>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Miembro desde</p>
                        <p>{user.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Target className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Metas Cumplidas</p>
                        <p>
                          {user.completedGoals} de {user.totalGoals}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Presupuesto Mensual</p>
                        <p>${user.budget}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <Edit className="h-4 w-4 mr-2" /> Editar Perfil
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Cerrar Sesión
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Columna principal con pestañas */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="goals">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="goals">Mis Metas</TabsTrigger>
                  <TabsTrigger value="budget">Mi Presupuesto</TabsTrigger>
                </TabsList>

                {/* Contenido de Metas */}
                <TabsContent value="goals" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Metas Financieras</CardTitle>
                      <CardDescription>Seguimiento de tus objetivos financieros</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {financialGoals.map((goal) => (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div
                                  className={`p-1.5 rounded-full ${goal.completed ? "bg-green-500" : "bg-purple-600"} text-white mr-2`}
                                >
                                  <Target className="h-4 w-4" />
                                </div>
                                <span>{goal.name}</span>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">
                                  ${goal.current} / ${goal.target}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {Math.round((goal.current / goal.target) * 100)}%
                                </div>
                              </div>
                            </div>
                            <Progress
                              value={(goal.current / goal.target) * 100}
                              className={`h-2 ${goal.completed ? "bg-green-500" : ""}`}
                            />
                          </div>
                        ))}

                        <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">Añadir Nueva Meta</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Contenido de Presupuesto */}
                <TabsContent value="budget" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mi Presupuesto Mensual</CardTitle>
                      <CardDescription>Desglose de tus gastos mensuales</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {monthlyExpenses.map((expense, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className={`p-1.5 rounded-full ${expense.color} text-white mr-2`}>
                                  {expense.icon}
                                </div>
                                <span>{expense.category}</span>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">${expense.amount}</div>
                                <div className="text-xs text-gray-500">
                                  {Math.round((expense.amount / user.budget) * 100)}%
                                </div>
                              </div>
                            </div>
                            <Progress value={(expense.amount / user.budget) * 100} className={`h-2 ${expense.color}`} />
                          </div>
                        ))}

                        <div className="pt-4 flex justify-between font-bold">
                          <span>Total Mensual</span>
                          <span>
                            ${monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)} / ${user.budget}
                          </span>
                        </div>

                        <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                          Actualizar Presupuesto
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6 bg-black text-white">
        <p className="text-xs text-gray-400">© 2024 FinMateAI. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400" href="#">
            Términos de Servicio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400" href="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  )
}
