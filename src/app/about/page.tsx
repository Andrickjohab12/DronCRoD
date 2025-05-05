import { Award, Users, Shield, Sparkles } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="container mx-auto py-12 px-4 md:px-6 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Acerca de FinMateAI</h1>

          <div className="space-y-12">
            <section>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Quiénes Somos</h2>
                      <p className="text-gray-700 leading-relaxed">
                      FinMateAI es una empresa pionera en tecnología financiera que combina inteligencia artificial con
                      experiencia financiera para proporcionar asesoramiento financiero personalizado a escala. Fundada en 2025, hemos
                      crecido de una pequeña startup.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                      Nuestro equipo está formado por expertos financieros, científicos de datos e ingenieros de IA apasionados
                      hacer que el asesoramiento financiero sea accesible para todos. Creemos que la tecnología puede democratizar el acceso
                      orientación financiera de alta calidad y ayudar a las personas a tomar mejores decisiones financieras.
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                        <img
                          src="/placeholder.svg?height=300&width=400"
                          alt="Equipo FinMateAI"
                          className="object-cover"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Nuestros Valores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Users className="h-8 w-8 text-purple-600" />
                    <div>
                      <CardTitle>Cliente Primero</CardTitle>
                      <CardDescription>Priorizamos las necesidades de nuestros clientes por encima de todo</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Cada decisión que tomamos está guiada por lo que es mejor para nuestros clientes. Estamos comprometidos a proporcionar
                      asesoramiento imparcial que ayude a nuestros clientes a alcanzar sus metas financieras.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Shield className="h-8 w-8 text-purple-600" />
                    <div>
                      <CardTitle>Seguridad y Privacidad</CardTitle>
                      <CardDescription>Tus datos financieros están seguros con nosotros</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Empleamos medidas de seguridad de nivel empresarial para proteger tus datos financieros. Tu privacidad es
                      primordial, y nunca vendemos tu información personal.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Sparkles className="h-8 w-8 text-purple-600" />
                    <div>
                      <CardTitle>Innovación</CardTitle>
                      <CardDescription>Mejorando constantemente nuestra tecnología</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Siempre estamos empujando los límites de lo que es posible con IA y tecnología financiera. Nuestro equipo de I+D
                      trabaja incansablemente para mejorar nuestros algoritmos y experiencia de usuario.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Award className="h-8 w-8 text-purple-600" />
                    <div>
                      <CardTitle>Excelencia</CardTitle>
                      <CardDescription>Comprometidos con los más altos estándares</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Nos mantenemos a los más altos estándares en todo lo que hacemos, desde la precisión de nuestro asesoramiento
                      financiero hasta la calidad de nuestro servicio al cliente.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Equipo Directivo</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                   {
                    name: "Andrick Sandoval",
                    title: "Programador Backend,Frontend ",
                    bio: "-",
                  },
                  {
                    name: "Sofia Castillo",
                    title: "Programador Frontend",
                    bio: "-",
                  },
                  {
                    name: "Montes Santillan",
                    title: "Programador Backend",
                    bio: "-",
                  },
                  {
                    name: "Gisell Rosales",
                    title: "CEO",
                    bio: "-",
                  },
                  {
                    name: "Oliver Retana",
                    title: "Finanzas",
                    bio: "-",
                  },
                  {
                    name: "Michel Aguero",
                    title: "Finanzas",
                    bio: "-.",
                  },
                  {
                    name: "Angel Gallardo",
                    title: "Marketing y Publicidad",
                    bio: "-.",
                  },
                  {
                    name: "Isis Echeverría",
                    title: "Marketing y Publicidad",
                    bio: "-.",
                  },
                  {
                    name: "Tomas De Santiago",
                    title: "Recursos humanos",
                    bio: "-.",
                  },
                ].map((person, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full bg-purple-100 mb-4 flex items-center justify-center">
                          <span className="text-purple-600 text-2xl font-bold">
                            {person.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <h3 className="font-bold">{person.name}</h3>
                        <p className="text-sm text-purple-600 mb-2">{person.title}</p>
                        <p className="text-sm text-gray-500">{person.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
            <h2 className="text-2xl font-bold mb-4">Nuestros Logros</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-purple-100 p-1 rounded-full">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Mejor Startup Fintech 2025</h3>
                      <p className="text-gray-700">Reconocido por nuestro enfoque innovador de asesoramiento financiero.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-purple-100 p-1 rounded-full">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">IA</h3>
                      <p className="text-gray-700">Destacado en la lista anual de empresas innovadoras.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-purple-100 p-1 rounded-full">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">10 Usuarios </h3>
                      <p className="text-gray-700">Llegó a 10 usuarios en nuestra plataforma en 2025.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-purple-100 p-1 rounded-full">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Excelencia en Satisfacción del Cliente</h3>
                      <p className="text-gray-700">
                      Mantuvo una calificación de satisfacción del cliente de 4.8/5.
                      </p>
                    </div>
                  </li>
                </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
