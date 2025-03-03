import Image from "next/image"
import { Award, Globe, Heart, Lightbulb, Target, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-black/20" />
        <div className="container relative mx-auto px-4 py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl">
              Revolucionando el Asesoramiento Financiero a través de la IA
              </h1>
              <p className="text-lg text-purple-200">
              Tenemos la misión de democratizar la experiencia financiera combinando la sabiduría humana con la artificial
              inteligencia, haciendo que la orientación financiera de nivel profesional sea accesible para todos.
              </p>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-xl lg:h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Team collaboration"
                className="object-cover"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Nuestros Valores Fundamentales</h2>
          <p className="mx-auto max-w-2xl text-purple-200">
          Estos principios guían todo lo que hacemos, desde el desarrollo de nuestra tecnología de IA hasta el servicio a nuestros clientes.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Precisión",
              description:
                "Nuestros modelos de IA están capacitados en grandes cantidades de datos financieros para proporcionar asesoramiento preciso y confiable.",
            },
            {
              icon: Heart,
              title: "Confianza",
              description: "Priorizamos la transparencia y la seguridad en todos los aspectos de nuestro servicio.",
            },
            {
              icon: Globe,
              title: "Accesibilidad",
              description: "Poner la orientación financiera profesional a disposición de todos, en cualquier lugar.",
            },
          ].map((value, index) => (
            <Card key={index} className="border-purple-800/20 bg-black text-white">
              <CardHeader>
                <value.icon className="h-12 w-12 text-purple-400" />
                <CardTitle className="text-xl">{value.title}</CardTitle>
                <CardDescription className="text-purple-200">{value.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="border-y border-purple-900/10 bg-black/50">
        <div className="container mx-auto px-4 py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-[300px] overflow-hidden rounded-xl lg:h-[500px]">
              <Image src="/placeholder.svg?height=500&width=600" alt="Our journey" className="object-cover" fill />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-3xl font-bold text-white">Nuestra historia</h2>
              <div className="space-y-4 text-purple-200">
                <p>
                Fundada en 2025, FinanceAI surgió de una idea simple pero poderosa: ¿qué pasaría si pudiéramos combinar la
                ¿precisión de la inteligencia artificial con la comprensión matizada de los expertos financieros?
                </p>
                <p>
                Nuestro equipo de expertos financieros y especialistas en IA trabajó incansablemente para desarrollar un sistema de IA que pudiera
                comprenda no solo los números, sino también el contexto humano detrás de las decisiones financieras.
                </p>
                <p>
                Hoy en día, estamos orgullosos de servir a miles de clientes en todo el mundo, ayudándoles a hacer finanzas más inteligentes
                  decisiones a través de nuestra plataforma impulsada por IA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Conoce a Nuestro Liderazgo</h2>
          <p className="mx-auto max-w-2xl text-purple-200">
          Nuestro diverso equipo reúne experiencia en finanzas, tecnología e inteligencia artificial.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Andrick Sandoval",
              role: "Programador",
              image: "/placeholder.svg?height=400&width=400",
              description: "descripcion del puesto",
            },
            {
              name: "Montes Santillan ",
              role: "Programador",
              image: "/placeholder.svg?height=400&width=400",
              description: "descripcion del puesto.",
            },
            {
              name: "Sofia Castillo ",
              role: "Programador",
              image: "/placeholder.svg?height=400&width=400",
              description: "descripcion del puesto",
            },
            {
              name: "Michelle Aguero ",
              role: "Programadora",
              image: "/placeholder.svg?height=400&width=400",
              description: "descripcion del puesto.",
            },

            {
              name: "Oliver ",
              role: "programador",
              image: "/placeholder.svg?height=400&width=400",
              description: "descripcion del puesto",
            },
            {
              name: "Angel ",
              role: "Programador",
              image: "/placeholder.svg?height=400&width=400",
              description: "descripcion del puesto",
            },

            {
              name: "Tomás ",
              role: "Programador",
              image: "/placeholder.svg?height=400&width=400",
              description: "descripcion del puesto",
            },
            {
              name: "Isis ",
              role: "Programador",
              image: "/placeholder.svg?height=400&width=400",
              description: "descripcion del puesto",
            },
          ].map((member, index) => (
            <Card key={index} className="border-purple-800/20 bg-black text-white">
              <CardContent className="pt-6">
                <div className="mb-4 aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-1 text-xl font-semibold text-white">{member.name}</h3>
                <p className="mb-2 text-sm text-purple-400">{member.role}</p>
                <p className="text-purple-200">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-purple-900/10 bg-black/50">
        <div className="container mx-auto px-4 py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, label: "Usuarios Activos", value: "9" },
              { icon: Award, label: "Premios", value: "0" },
              { icon: Lightbulb, label: "Modeos IA", value: "1" },
              { icon: Globe, label: "País servido", value: "1" },
            ].map((stat, index) => (
              <Card key={index} className="border-purple-800/20 bg-black text-white">
                <CardContent className="flex flex-col items-center pt-6">
                  <stat.icon className="mb-4 h-8 w-8 text-purple-400" />
                  <p className="mb-2 text-3xl font-bold">{stat.value}</p>
                  <p className="text-center text-sm text-purple-200">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}