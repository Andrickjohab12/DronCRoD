"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

   
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    setSubmitted(true)
  }

  return (
    <div className="container mx-auto py-1 px-4 md:px-6">
     <SiteHeader />

        
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contáctenos</h1>
        <p className="text-gray-500 mb-8">
        Estamos aquí para ayudar a los estudiantes con sus necesidades financieras. Rellene el siguiente formulario si tienes algun mensaje equipo.
        </p>

        <Card className="border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-900 to-black text-white">
            <CardTitle>Formulario</CardTitle>
            <CardDescription className="text-gray-200">
            Envíe su consulta  y le responderemos dentro de las 24 horas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold">¡Gracias por su consulta!</h3>
                <p className="text-gray-500 mt-2">
                Hemos recibido su mensaje y nos pondremos en contacto con usted dentro de las 24 horas.
                </p>
                <Button className="mt-6 bg-purple-600 hover:bg-purple-700" onClick={() => setSubmitted(false)}>
                Enviar Otra Consulta
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact">Persona de Contacto</Label>
                    <Input id="contact" placeholder="Nombre Completo" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Dirección de Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="email@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Número de Teléfono</Label>
                    <Input id="phone" type="tel" placeholder="+52 (664) 222-9834" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    placeholder="Por favor describa su consulta en detalle..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="privacy" className="rounded border-gray-300" required />
                  <label htmlFor="privacy" className="text-sm text-gray-500">
                  Acepto el procesamiento de mis datos de acuerdo con la política de privacidad
                  </label>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Enviar Consulta
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

