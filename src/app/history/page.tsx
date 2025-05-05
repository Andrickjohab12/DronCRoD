import Link from "next/link"
import { MapPin, Target, Compass } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"

export default function HistoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="container mx-auto py-12 px-4 md:px-6 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Nuestra Historia</h1>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Target className="mr-2 h-6 w-6 text-purple-600" />
                Nuestra Misión
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-700 leading-relaxed">
                    En FinMateAI, nuestra misión es democratizar el asesoramiento financiero a través de tecnología
                    innovadora. Creemos que todos merecen acceso a orientación financiera de alta calidad,
                    independientemente de su riqueza o origen. Al aprovechar la inteligencia artificial, podemos
                    proporcionar recomendaciones financieras personalizadas a gran escala, ayudando a individuos y
                    empresas a tomar decisiones financieras más inteligentes.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Estamos comprometidos con la transparencia, la seguridad y poner los intereses de nuestros clientes
                    en primer lugar. Nuestra plataforma impulsada por IA está diseñada para analizar datos financieros
                    complejos y traducirlos en ideas accionables que sean fáciles de entender e implementar.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Compass className="mr-2 h-6 w-6 text-purple-600" />
                Nuestra Visión
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-700 leading-relaxed">
                    Visualizamos un futuro donde el bienestar financiero sea accesible para todos. Nuestra visión es
                    convertirnos en el asesor financiero de IA más confiable del mundo, ayudando a millones de personas
                    a alcanzar sus metas financieras y construir un futuro seguro.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Para 2030, aspiramos a haber ayudado a más de 10 millones de individuos y empresas a optimizar sus
                    finanzas, ahorrar de manera más efectiva e invertir sabiamente. Estamos trabajando hacia un mundo
                    donde el estrés financiero sea reducido y las personas puedan enfocarse en lo que realmente importa
                    en sus vidas.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <MapPin className="mr-2 h-6 w-6 text-purple-600" />
                Nuestra Ubicación
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Sede Central</h3>
                      <p className="text-gray-700">
                        123 Distrito Financiero
                        <br />
                        Suite 500
                        <br />
                        Nueva York, NY 10004
                        <br />
                        Estados Unidos
                      </p>
                      <p className="text-gray-700 mt-4">
                        <strong>Teléfono:</strong> +1 (555) 123-4567
                        <br />
                        <strong>Email:</strong> info@finmateai.com
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Oficinas Regionales</h3>
                      <p className="text-gray-700">
                        <strong>San Francisco</strong>
                        <br />
                        555 Avenida Tech
                        <br />
                        San Francisco, CA 94103
                      </p>
                      <p className="text-gray-700 mt-4">
                        <strong>Londres</strong>
                        <br />
                        10 Plaza Fintech
                        <br />
                        Londres, EC2A 4XY
                        <br />
                        Reino Unido
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 rounded-lg overflow-hidden border h-[300px] bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">Aquí se mostraría un mapa interactivo</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Nuestro Recorrido</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>2018</CardTitle>
                    <CardDescription>El Comienzo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Fundada por un equipo de expertos financieros e ingenieros de IA con la visión de transformar el
                      asesoramiento financiero a través de la tecnología.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>2020</CardTitle>
                    <CardDescription>Crecimiento e Innovación</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Lanzamos nuestra primera plataforma de asesoramiento financiero impulsada por IA y aseguramos
                      financiación Serie A para acelerar el desarrollo y la expansión.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>2022</CardTitle>
                    <CardDescription>Soluciones Empresariales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Expandimos nuestros servicios para incluir soluciones empresariales, ayudando a las empresas a
                      optimizar sus operaciones financieras y proporcionar mejores beneficios financieros a los
                      empleados.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hoy</CardTitle>
                    <CardDescription>Impacto Global</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Sirviendo a clientes en más de 30 países con servicios de asesoramiento financiero de IA de
                      vanguardia, innovando continuamente para mejorar los resultados financieros para individuos y
                      empresas.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
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
