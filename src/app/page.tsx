import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Brain, PiggyBank, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "FinanceAI - Your AI-Powered Financial Assistant",
  description: "Get personalized financial advice and insights powered by artificial intelligence",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      <header className="px-4 py-6 border-b border-purple-800 sm:px-6 lg:px-8">
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            Fin Mate AI
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="#features" className="transition-colors hover:text-purple-400">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="transition-colors hover:text-purple-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#contact" className="transition-colors hover:text-purple-400">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative px-4 py-20 overflow-hidden text-center sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-10 bg-cover bg-center"></div>
          <div className="container relative z-10 max-w-3xl mx-auto">
            <h2 className="mb-6 text-5xl font-bold text-transparent sm:text-6xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Your AI-Powered Financial Assistant
            </h2>
            <p className="mb-8 text-xl text-gray-300">
              Make smarter financial decisions with personalized advice powered by artificial intelligence.
            </p>
            <Button size="lg" className="text-white bg-purple-600 hover:bg-purple-700">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        <section id="features" className="px-4 py-20 bg-gray-900 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h3 className="mb-12 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Key Features
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "AI-Powered Insights",
                  description: "Get personalized financial advice based on your unique situation",
                  icon: Brain,
                },
                {
                  title: "Budget Optimization",
                  description: "Optimize your spending and saving habits with intelligent suggestions",
                  icon: PiggyBank,
                },
                {
                  title: "Investment Strategies",
                  description: "Receive tailored investment recommendations aligned with your goals",
                  icon: BarChart3,
                },
                {
                  title: "Secure and Private",
                  description: "Your financial data is encrypted and protected at all times",
                  icon: Shield,
                },
              ].map((feature, index) => (
                <Card key={index} className="transition-colors bg-black border-purple-800 hover:border-purple-600">
                  <CardHeader>
                    <feature.icon className="w-10 h-10 mb-3 text-purple-400" />
                    <CardTitle className="text-purple-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h3 className="mb-12 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Simple Pricing
            </h3>
            <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
              {[
                {
                  name: "Basic",
                  price: "$9.99",
                  features: ["Personalized financial advice", "Basic budgeting tools", "Monthly insights report"],
                },
                {
                  name: "Pro",
                  price: "$19.99",
                  features: [
                    "Everything in Basic",
                    "Advanced investment strategies",
                    "Unlimited AI consultations",
                    "Priority support",
                  ],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  features: [
                    "Everything in Pro",
                    "Dedicated account manager",
                    "Custom AI model training",
                    "API access",
                  ],
                },
              ].map((plan, index) => (
                <Card key={index} className="transition-colors bg-black border-purple-800 hover:border-purple-600">
                  <CardHeader>
                    <CardTitle className="text-2xl text-purple-300">{plan.name}</CardTitle>
                    <CardDescription className="text-3xl font-bold text-white">
                      {plan.price}
                      <span className="text-sm font-normal text-gray-400">/month</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2 text-purple-400" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Choose Plan</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-20 bg-gray-900 sm:px-6 lg:px-8">
          <div className="container max-w-2xl mx-auto text-center">
            <h3 className="mb-6 text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Ready to Transform Your Finances?
            </h3>
            <p className="mb-8 text-xl text-gray-300">
              Join thousands of users who are already benefiting from AI-powered financial advice.
            </p>
            <Button size="lg" className="text-white bg-purple-600 hover:bg-purple-700">
              Start Your Free Trial
            </Button>
          </div>
        </section>
      </main>

      <footer className="px-4 py-6 bg-black border-t border-purple-800 sm:px-6 lg:px-8">
        <div className="container mx-auto text-sm text-center text-gray-400">
          © 2025 FinanceAI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

