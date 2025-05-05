import Link from "next/link"
import { ArrowRight, BarChart3, Shield, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Asesoramiento Financiero Personalizado Impulsado por IA
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Optimiza tus decisiones financieras con nuestra plataforma impulsada por IA. Recibe recomendaciones
                  personalizadas adaptadas a tu situación financiera única.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/ai-advisor">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Probar Asesor IA <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-100/10">
                      Contáctanos
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  alt="Panel Financiero"
                  className="rounded-lg object-cover"
                  height="400"
                  src="/placeholder.svg?height=400&width=600"
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Cómo Nuestra IA Te Ayuda</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nuestra IA avanzada analiza tus datos financieros para proporcionar recomendaciones e ideas
                  personalizadas.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BarChart3 className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Análisis de Gastos</h3>
                <p className="text-center text-gray-500">
                  Obtén información sobre tus hábitos de gasto e identifica áreas de mejora.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Shield className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Plataforma Segura</h3>
                <p className="text-center text-gray-500">
                  Tus datos financieros están protegidos con medidas de seguridad de nivel empresarial.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Sparkles className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Consejos Personalizados</h3>
                <p className="text-center text-gray-500">
                  Recibe recomendaciones adaptadas basadas en tu situación financiera única.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ve Nuestra Plataforma en Acción</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mira cómo nuestro asesor financiero impulsado por IA ayuda a los estudiantes a tomar decisiones
                  financieras más inteligentes
                </p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Video Player */}
              <div className="rounded-xl overflow-hidden shadow-xl border border-purple-100">
                <video className="w-full aspect-video" controls poster="/placeholder.svg?height=720&width=1280">
                  <source src="#" type="video/mp4" />
                  Tu navegador no soporta la etiqueta de video.
                </video>
              </div>

              {/* Video Description */}
              <div className="mt-6 bg-white p-6 rounded-xl shadow-md border border-purple-100">
                <h3 className="text-xl font-bold mb-3">Transformando las Finanzas Estudiantiles con IA</h3>
                <p className="text-gray-700 mb-4">
                  Esta demostración muestra cómo FinMateAI ayuda a los estudiantes a analizar sus patrones de gasto,
                  identificar gastos de alto impacto y recibir recomendaciones personalizadas para mejorar su salud
                  financiera. Nuestra plataforma combina IA avanzada con un diseño intuitivo para hacer que la gestión
                  financiera sea accesible y efectiva para los estudiantes.
                </p>
                <p className="text-gray-700">
                  Observa cómo recorremos las características clave de nuestra plataforma, incluyendo el seguimiento de
                  gastos, la optimización del presupuesto y consejos personalizados adaptados a las necesidades de los
                  estudiantes.
                </p>
              </div>

              {/* Audio Player Section */}
              <div className="mt-10 bg-gradient-to-r from-purple-900 to-black p-6 rounded-xl shadow-md text-white">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-1/3">
                    <div className="bg-purple-800/50 p-4 rounded-full w-32 h-32 flex items-center justify-center mx-auto">
                      <Sparkles className="h-16 w-16" />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-3">Escucha Nuestra Misión y Visión</h3>
                    <p className="text-gray-200 mb-4">
                      Escucha a nuestro fundador explicar la misión y visión detrás de FinMateAI y cómo estamos
                      trabajando para democratizar el asesoramiento financiero para estudiantes en todas partes.
                    </p>

                    {/* Audio Player */}
                    <div className="bg-purple-800/30 p-4 rounded-lg">
                      <audio className="w-full" controls>
                        <source src="#" type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                      </audio>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
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
