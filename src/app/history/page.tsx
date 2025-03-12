import Image from "next/image"
import Link from "next/link"
import { Building, Clock, Flag, MapPin, Target } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"




export default function HistoryPage() {
  return (


    
    <div className="min-h-screen bg-black">
      {/* Hero Section */}

      <header className="px-4 py-6 border-b border-purple-800 sm:px-6 lg:px-8">
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
          <Link href="/" className="transition-colors hover:text-purple-400">
                  FinMateAI
                </Link>
          </h1>
          <nav>
            <ul className="flex space-x-6">
            <li>
                <Link href="/about-us" className="transition-colors hover:text-purple-400">
                  Acerca de nosotros
                </Link>
              </li>
              <li>
                <Link href="/history" className="transition-colors hover:text-purple-400">
                Historia
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="transition-colors hover:text-purple-400">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#contact" className="transition-colors hover:text-purple-400">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>


      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/30" />
        <div className="container relative mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl">
              Our History, Mission & Vision
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-purple-200">
              From our humble beginnings to our ambitious future, discover the story behind FinanceAI and what drives us
              to revolutionize financial advice.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-purple-800/20 bg-black text-white">
            <CardHeader className="pb-4">
              <Flag className="mb-4 h-12 w-12 text-purple-400" />
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200">
                To democratize financial expertise by leveraging artificial intelligence, making professional-grade
                financial guidance accessible to everyone regardless of their wealth or background.
              </p>
              <p className="mt-4 text-purple-200">
                We believe that financial well-being should not be a privilege for the few but a right for all. By
                combining cutting-edge AI technology with human financial wisdom, we're creating a future where everyone
                can make informed financial decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-800/20 bg-black text-white">
            <CardHeader className="pb-4">
              <Target className="mb-4 h-12 w-12 text-purple-400" />
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200">
                To become the world's most trusted AI-powered financial advisor, helping millions of people achieve
                financial freedom and security through personalized, accessible guidance.
              </p>
              <p className="mt-4 text-purple-200">
                We envision a world where financial anxiety is replaced by financial confidence, where complex decisions
                are simplified through intelligent technology, and where everyone has the tools they need to build a
                secure financial future.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Our Journey</h2>
          <p className="mx-auto max-w-2xl text-purple-200">
            The evolution of FinanceAI from concept to industry leader
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 ml-6 w-0.5 bg-purple-700 md:left-1/2 md:-ml-0.5"></div>

          {/* Timeline Items */}
          {[
            {
              year: "2020",
              title: "The Idea",
              description:
                "Our founders recognized a gap in the market: high-quality financial advice was inaccessible to most people. They envisioned using AI to bridge this gap.",
              position: "right",
            },
            {
              year: "2021",
              title: "Research & Development",
              description:
                "We assembled a team of financial experts and AI engineers to develop our core technology, training our models on vast amounts of financial data.",
              position: "left",
            },
            {
              year: "2022",
              title: "Beta Launch",
              description:
                "FinanceAI launched in beta with 1,000 early users who provided invaluable feedback that helped refine our algorithms and user experience.",
              position: "right",
            },
            {
              year: "2023",
              title: "Official Launch",
              description:
                "We officially launched FinanceAI to the public, quickly growing to serve over 10,000 users within the first three months.",
              position: "left",
            },
            {
              year: "2024",
              title: "Global Expansion",
              description:
                "FinanceAI expanded internationally, adapting our AI models to account for different financial systems and regulations across multiple countries.",
              position: "right",
            },
            {
              year: "Today",
              title: "Industry Leader",
              description:
                "Today, FinanceAI is recognized as a pioneer in AI-powered financial advice, serving clients worldwide and continuously innovating to improve our services.",
              position: "left",
            },
          ].map((item, index) => (
            <div key={index} className="relative mb-12">
              <div
                className={`flex items-center md:justify-between ${item.position === "left" ? "md:flex-row-reverse" : ""}`}
              >
                <div className="hidden w-5/12 md:block"></div>
                <div className="z-20 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="w-full pl-6 md:w-5/12 md:pl-0 md:pr-0">
                  <div className="rounded-lg border border-purple-800/20 bg-black p-6">
                    <span className="mb-2 inline-block rounded-full bg-purple-900/50 px-3 py-1 text-sm font-semibold text-purple-200">
                      {item.year}
                    </span>
                    <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-purple-200">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location Section */}
      <section className="border-t border-purple-900/10 bg-black/50">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Our Headquarters</h2>
            <p className="mx-auto max-w-2xl text-purple-200">
              Located in the heart of the financial district, our headquarters serves as the innovation hub for our
              global operations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="mb-6 flex items-center">
                <MapPin className="mr-3 h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Our Location</h3>
              </div>
              <div className="mb-6 space-y-2 text-purple-200">
                <p className="flex items-center">
                  <Building className="mr-3 h-5 w-5 text-purple-400" />
                  FinanceAI Headquarters
                </p>
                <p>123 Innovation Avenue</p>
                <p>Financial District</p>
                <p>New York, NY 10004</p>
                <p>United States</p>
              </div>
              <div className="mb-6">
                <h4 className="mb-2 text-lg font-semibold text-white">Contact Us</h4>
                <p className="text-purple-200">Email: contact@financeai.com</p>
                <p className="text-purple-200">Phone: +1 (555) 123-4567</p>
              </div>
              <Button className="mt-4 w-fit bg-purple-600 text-white hover:bg-purple-700">
                <Link href="/contact">Get Directions</Link>
              </Button>
            </div>

            <div className="relative h-[400px] overflow-hidden rounded-xl">
              {/* Replace with actual map or office image */}
              <div className="absolute inset-0 flex items-center justify-center bg-purple-900/20">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="FinanceAI Headquarters"
                  className="object-cover"
                  fill
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-purple-600 p-3">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Our Global Presence</h2>
          <p className="mx-auto max-w-2xl text-purple-200">
            While our headquarters is in New York, our team and impact extend across the globe
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { region: "North America", offices: "New York, San Francisco, Toronto" },
            { region: "Europe", offices: "London, Berlin, Amsterdam" },
            { region: "Asia Pacific", offices: "Singapore, Tokyo, Sydney" },
            { region: "Latin America", offices: "Mexico City, São Paulo, Buenos Aires" },
          ].map((location, index) => (
            <Card key={index} className="border-purple-800/20 bg-black text-white">
              <CardHeader>
                <CardTitle>{location.region}</CardTitle>
                <CardDescription className="text-purple-200">{location.offices}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-purple-900/10 bg-gradient-to-b from-black to-purple-950/20">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">Join Us on Our Journey</h2>
            <p className="mb-8 text-lg text-purple-200">
              Whether you're looking for financial guidance or want to be part of our team, we'd love to connect with
              you.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" className="border-purple-600 text-purple-200 hover:bg-purple-900/20">
                <Link href="/careers">View Careers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

