"use client"

import type React from "react"

import { useState } from "react"
import {
  Send,
  Bot,
  User,
  ArrowRight,
  PiggyBank,
  DollarSign,
  TrendingUp,
  BookOpen,
  Home,
  Coffee,
  Utensils,
  Gamepad,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/site-header"
import Link from "next/link"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface Expense {
  category: string
  amount: number
  icon: React.ReactNode
  color: string
}

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu asesor financiero para estudiantes. Puedo ayudarte a analizar tus gastos y encontrar formas de ahorrar dinero. ¿Te gustaría comenzar contándome sobre tus gastos mensuales?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showExpenseAnalyzer, setShowExpenseAnalyzer] = useState(false)

  // Categorías de gastos para estudiantes
  const [expenses, setExpenses] = useState<Expense[]>([
    { category: "Matrícula y Cuotas", amount: 0, icon: <BookOpen className="h-5 w-5" />, color: "bg-purple-600" },
    { category: "Vivienda", amount: 0, icon: <Home className="h-5 w-5" />, color: "bg-blue-500" },
    { category: "Alimentación", amount: 0, icon: <Utensils className="h-5 w-5" />, color: "bg-green-500" },
    { category: "Libros y Materiales", amount: 0, icon: <BookOpen className="h-5 w-5" />, color: "bg-yellow-500" },
    { category: "Transporte", amount: 0, icon: <TrendingUp className="h-5 w-5" />, color: "bg-red-500" },
    { category: "Entretenimiento", amount: 0, icon: <Gamepad className="h-5 w-5" />, color: "bg-indigo-500" },
    { category: "Café y Comidas Fuera", amount: 0, icon: <Coffee className="h-5 w-5" />, color: "bg-orange-500" },
  ])

  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [highImpactAreas, setHighImpactAreas] = useState<string[]>([])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    // Añadir mensaje del usuario
    const userMessage: Message = { role: "user", content: input }
    setMessages([...messages, userMessage])
    setInput("")
    setLoading(true)

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: getAIResponse(input),
      }
      setMessages((prev) => [...prev, aiResponse])
      setLoading(false)

      // Si el usuario menciona gastos, sugerir el analizador de gastos
      if (
        input.toLowerCase().includes("gasto") ||
        input.toLowerCase().includes("gastar") ||
        input.toLowerCase().includes("presupuesto") ||
        input.toLowerCase().includes("analizar") ||
        input.toLowerCase().includes("ayuda")
      ) {
        setTimeout(() => {
          const followUpResponse: Message = {
            role: "assistant",
            content:
              "¿Te gustaría usar nuestra herramienta de análisis de gastos para obtener un desglose detallado de tus gastos? Esto me ayudará a proporcionarte consejos más personalizados.",
          }
          setMessages((prev) => [...prev, followUpResponse])
          setShowExpenseAnalyzer(true)
        }, 1000)
      }
    }, 1000)
  }

  // Función simple de respuesta de IA enfocada en finanzas estudiantiles
  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("gasto") || lowerQuery.includes("gastar") || lowerQuery.includes("presupuesto")) {
      return "Como estudiante, hacer seguimiento de tus gastos es crucial. Los mayores gastos para la mayoría de los estudiantes son típicamente vivienda, matrícula y alimentación. ¿Qué área te preocupa más?"
    } else if (lowerQuery.includes("matrícula") || lowerQuery.includes("cuotas")) {
      return "La matrícula puede ser un gasto importante. ¿Has investigado sobre becas, subvenciones o programas de trabajo-estudio? Muchas universidades también ofrecen planes de pago que pueden ayudar a distribuir el costo."
    } else if (
      lowerQuery.includes("vivienda") ||
      lowerQuery.includes("alquiler") ||
      lowerQuery.includes("residencia")
    ) {
      return "La vivienda suele ser el mayor gasto después de la matrícula. Considera conseguir compañeros de piso para dividir costos, buscar alojamiento más lejos del campus (si el transporte es asequible), o convertirte en Asistente de Residencia (AR) para obtener alojamiento reducido o gratuito."
    } else if (lowerQuery.includes("comida") || lowerQuery.includes("alimentos") || lowerQuery.includes("comidas")) {
      return "Los costos de alimentación pueden acumularse rápidamente. Considera preparar comidas, usar planes de comidas estudiantiles eficientemente y limitar las comidas fuera. ¡Muchas tiendas de comestibles y restaurantes también ofrecen descuentos para estudiantes!"
    } else if (lowerQuery.includes("libro") || lowerQuery.includes("materiales")) {
      return "¡Los libros de texto pueden ser caros! Considera alquilar libros, comprar copias usadas o verificar si tu biblioteca los tiene. Las versiones digitales suelen ser más baratas, y algunos profesores pueden tener ediciones anteriores que funcionan igual de bien."
    } else if (lowerQuery.includes("ahorrar") || lowerQuery.includes("ahorro")) {
      return "¡Buena pregunta! Como estudiante, puedes ahorrar usando descuentos estudiantiles, comprando libros de texto usados, preparando comidas, encontrando alojamiento asequible con compañeros de piso y utilizando recursos del campus como el gimnasio y eventos en lugar de pagar por entretenimiento."
    } else if (lowerQuery.includes("trabajo") || lowerQuery.includes("empleo") || lowerQuery.includes("ingresos")) {
      return "Trabajar a tiempo parcial durante los estudios puede ayudar con los gastos. Busca trabajos en el campus que puedan ser más flexibles con tu horario de clases. También considera prácticas en tu campo que proporcionen tanto ingresos como experiencia valiosa."
    } else if (lowerQuery.includes("préstamo") || lowerQuery.includes("deuda")) {
      return "Los préstamos estudiantiles deben usarse con cuidado. Siempre agota primero las becas, subvenciones y opciones de trabajo. Si necesitas préstamos, los préstamos federales típicamente tienen mejores términos que los privados. Y recuerda, no tienes que aceptar la cantidad completa ofrecida."
    } else if (lowerQuery.includes("hola") || lowerQuery.includes("buenos") || lowerQuery.includes("saludos")) {
      return "¡Hola! Soy tu asesor financiero para estudiantes. Puedo ayudarte a gestionar tus gastos, encontrar formas de ahorrar dinero y aprovechar al máximo tu presupuesto estudiantil. ¿En qué te puedo ayudar hoy?"
    } else if (lowerQuery.includes("gracias")) {
      return "¡De nada! Estoy aquí para ayudarte con cualquier otra pregunta financiera que puedas tener. ¡Buena suerte con tus estudios!"
    } else {
      return "Como estudiante, gestionar tus finanzas de manera efectiva es importante. Puedo ayudarte con presupuestos, encontrar formas de ahorrar en gastos comunes como libros de texto y comida, o maximizar los descuentos estudiantiles. ¿En qué área específica te gustaría recibir consejos?"
    }
  }

  const handleExpenseChange = (index: number, value: number[]) => {
    const newExpenses = [...expenses]
    newExpenses[index].amount = value[0]
    setExpenses(newExpenses)
  }

  const analyzeExpenses = () => {
    setLoading(true)

    // Calcular gastos totales
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    // Encontrar áreas de alto impacto (gastos que son más del 20% del total)
    const highImpact = expenses
      .filter((expense) => expense.amount > 0 && expense.amount / totalExpenses > 0.2)
      .map((expense) => expense.category)

    setHighImpactAreas(highImpact)

    setTimeout(() => {
      setAnalysisComplete(true)
      setLoading(false)

      // Añadir mensaje de análisis
      const analysisMessage: Message = {
        role: "assistant",
        content: `Basado en tu desglose de gastos, he analizado tus patrones de gasto. ${
          highImpact.length > 0
            ? `Tus gastos de mayor impacto están en ${highImpact.join(", ")}. Vamos a enfocarnos en estas áreas para hacer la mayor diferencia en tu presupuesto.`
            : "Tus gastos parecen bastante equilibrados entre categorías."
        } ¿Te gustaría consejos específicos sobre cómo reducir alguna categoría de gastos en particular?`,
      }
      setMessages((prev) => [...prev, analysisMessage])
    }, 2000)
  }

  const getTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0)
  }

  const getExpensePercentage = (amount: number) => {
    const total = getTotalExpenses()
    if (total === 0) return 0
    return (amount / total) * 100
  }

  const startNewAnalysis = () => {
    setAnalysisComplete(false)
    setHighImpactAreas([])
    setExpenses(expenses.map((expense) => ({ ...expense, amount: 0 })))
  }

  const sendQuickQuestion = (question: string) => {
    setInput(question)
    // Usar setTimeout para asegurar que el input se establezca antes de enviar
    setTimeout(() => {
      const form = document.querySelector("form")
      if (form) {
        const event = new Event("submit", { cancelable: true })
        form.dispatchEvent(event)
      }
    }, 100)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="container mx-auto py-12 px-4 md:px-6 flex-1">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Asesor Financiero para Estudiantes</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader className="bg-gradient-to-r from-purple-900 to-black text-white">
                  <CardTitle>Asistente Financiero para Estudiantes</CardTitle>
                  <CardDescription className="text-gray-200">
                    Obtén consejos personalizados para gestionar tus finanzas estudiantiles
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow overflow-auto p-4 space-y-4 my-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${
                          message.role === "assistant" ? "" : "flex-row-reverse space-x-reverse"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            message.role === "assistant" ? "bg-purple-100" : "bg-black text-white"
                          }`}
                        >
                          {message.role === "assistant" ? (
                            <Bot className="h-5 w-5 text-purple-600" />
                          ) : (
                            <User className="h-5 w-5" />
                          )}
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.role === "assistant" ? "bg-gray-100 text-gray-800" : "bg-purple-600 text-white"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-[80%]">
                        <div className="p-2 rounded-full bg-purple-100">
                          <Bot className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="p-3 rounded-lg bg-gray-100 text-gray-800">
                          <div className="flex space-x-1">
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showExpenseAnalyzer && !analysisComplete && (
                    <div className="flex justify-start w-full">
                      <div className="max-w-[90%] w-full">
                        <Card className="border-purple-200">
                          <CardHeader className="bg-purple-50 pb-2">
                            <CardTitle className="text-lg">Analizador de Gastos Estudiantiles</CardTitle>
                            <CardDescription>
                              Ajusta los deslizadores para que coincidan con tus gastos mensuales
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-4">
                            {expenses.map((expense, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className={`p-1.5 rounded-full ${expense.color} text-white mr-2`}>
                                      {expense.icon}
                                    </div>
                                    <Label>{expense.category}</Label>
                                  </div>
                                  <span className="font-medium">${expense.amount}</span>
                                </div>
                                <Slider
                                  defaultValue={[expense.amount]}
                                  max={2000}
                                  step={10}
                                  onValueChange={(value) => handleExpenseChange(index, value)}
                                />
                              </div>
                            ))}

                            <div className="pt-4">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">Gastos Mensuales Totales</span>
                                <span className="font-bold">${getTotalExpenses()}</span>
                              </div>

                              <Button
                                onClick={analyzeExpenses}
                                className="w-full mt-2 bg-purple-600 hover:bg-purple-700"
                                disabled={getTotalExpenses() === 0}
                              >
                                Analizar Mis Gastos
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}

                  {analysisComplete && (
                    <div className="flex justify-start w-full">
                      <div className="max-w-[90%] w-full">
                        <Card className="border-purple-200">
                          <CardHeader className="bg-purple-50 pb-2">
                            <CardTitle className="text-lg">Tu Desglose de Gastos</CardTitle>
                            <CardDescription>
                              {highImpactAreas.length > 0
                                ? `Áreas de alto impacto: ${highImpactAreas.join(", ")}`
                                : "Tus gastos están bien equilibrados"}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-4">
                            {expenses
                              .filter((expense) => expense.amount > 0)
                              .sort((a, b) => b.amount - a.amount)
                              .map((expense, index) => (
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
                                        {getExpensePercentage(expense.amount).toFixed(1)}%
                                      </div>
                                    </div>
                                  </div>
                                  <Progress
                                    value={getExpensePercentage(expense.amount)}
                                    className={`h-2 ${expense.color}`}
                                  />
                                </div>
                              ))}

                            <div className="pt-2 flex justify-between">
                              <span className="font-medium">Total Mensual</span>
                              <span className="font-bold">${getTotalExpenses()}</span>
                            </div>

                            <div className="pt-2 flex space-x-2">
                              <Button onClick={startNewAnalysis} variant="outline" className="flex-1">
                                Reiniciar
                              </Button>
                              <Button
                                onClick={() =>
                                  sendQuickQuestion(
                                    `¿Cómo puedo reducir mis gastos en ${highImpactAreas[0] || "general"}?`,
                                  )
                                }
                                className="flex-1 bg-purple-600 hover:bg-purple-700"
                              >
                                Obtener Consejos de Ahorro
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t p-4">
                  <form onSubmit={handleSend} className="flex w-full space-x-2">
                    <Input
                      placeholder="Pregunta sobre tus finanzas estudiantiles..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-grow"
                    />
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Tabs defaultValue="suggestions">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="suggestions">Preguntas Comunes</TabsTrigger>
                  <TabsTrigger value="insights">Consejos Estudiantiles</TabsTrigger>
                </TabsList>
                <TabsContent value="suggestions" className="mt-4 space-y-4">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                        Ahorro en Libros de Texto
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500">¿Cómo puedo ahorrar dinero en libros de texto?</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600"
                        onClick={() => sendQuickQuestion("¿Cómo puedo ahorrar dinero en libros de texto?")}
                      >
                        Preguntar <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm flex items-center">
                        <Home className="h-4 w-4 mr-2 text-purple-600" />
                        Opciones de Vivienda
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500">
                        ¿Cuáles son las opciones de vivienda asequible para estudiantes?
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600"
                        onClick={() =>
                          sendQuickQuestion("¿Cuáles son las opciones de vivienda asequible para estudiantes?")
                        }
                      >
                        Preguntar <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm flex items-center">
                        <Utensils className="h-4 w-4 mr-2 text-purple-600" />
                        Presupuesto para Comida
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500">¿Cómo puedo comer bien con un presupuesto estudiantil?</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600"
                        onClick={() => sendQuickQuestion("¿Cómo puedo comer bien con un presupuesto estudiantil?")}
                      >
                        Preguntar <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-purple-600" />
                        Préstamos Estudiantiles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500">¿Qué debo saber sobre los préstamos estudiantiles?</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600"
                        onClick={() => sendQuickQuestion("¿Qué debo saber sobre los préstamos estudiantiles?")}
                      >
                        Preguntar <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="insights" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Consejos de Ahorro para Estudiantes</CardTitle>
                      <CardDescription>Formas inteligentes de hacer que tu dinero rinda más</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border p-3">
                        <div className="text-sm font-medium flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                          Libros de Texto
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                          Alquila libros de texto, compra usados o verifica si hay versiones digitales disponibles.
                          Muchas bibliotecas también tienen reservas de cursos.
                        </div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-sm font-medium flex items-center">
                          <Coffee className="h-4 w-4 mr-2 text-purple-600" />
                          Comida y Bebidas
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                          Prepara comidas, usa planes de comidas del campus eficientemente y lleva tu propio café en
                          lugar de comprarlo diariamente.
                        </div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-sm font-medium flex items-center">
                          <Gamepad className="h-4 w-4 mr-2 text-purple-600" />
                          Entretenimiento
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                          Usa descuentos estudiantiles, asiste a eventos gratuitos del campus y comparte suscripciones
                          de streaming con compañeros de piso.
                        </div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-sm font-medium flex items-center">
                          <PiggyBank className="h-4 w-4 mr-2 text-purple-600" />
                          Banca
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                          Encuentra cuentas corrientes para estudiantes sin comisiones y busca tarjetas de crédito
                          diseñadas para estudiantes para construir historial crediticio.
                        </div>
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
