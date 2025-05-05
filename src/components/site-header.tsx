import Link from "next/link"
import { Menu, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <Sparkles className="h-6 w-6 text-purple-600" />
        <span className="ml-2 text-xl font-bold">FinMateAI</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
          Inicio
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/ai-advisor">
          Asesor IA
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/history">
          Historia
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
          Nosotros
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
          Contacto
        </Link>
      </nav>

      {/* Auth Buttons / Profile */}
      <div className="ml-4 hidden md:flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Iniciar Sesión
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
            Registrarse
          </Button>
        </Link>
        {/* Uncomment this when user is logged in
        <Link href="/profile">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="bg-purple-100 text-purple-600">CR</AvatarFallback>
          </Avatar>
        </Link>
        */}
      </div>

      {/* Mobile Navigation */}
      <div className="ml-auto md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Abrir menú">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b pb-4">
                <Link className="flex items-center" href="/">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  <span className="ml-2 text-xl font-bold">FinMateAI</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4 mt-8">
                <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/">
                  Inicio
                </Link>
                <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/ai-advisor">
                  Asesor IA
                </Link>
                <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/history">
                  Historia
                </Link>
                <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/about">
                  Nosotros
                </Link>
                <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/contact">
                  Contacto
                </Link>
                <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/login">
                  Iniciar Sesión
                </Link>
                <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/signup">
                  Registrarse
                </Link>
              </nav>
              <div className="mt-auto pt-4 border-t">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Comenzar</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
