"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building, Lock, Mail, Phone, Send, Shield, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
/*import { useToast } from "@/hooks/use-toast"

export default function EnterpriseContactPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Inquiry Submitted",
        description: "Thank you for your interest. Our team will contact you shortly.",
      })

      // Reset form
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        message: "",
      })

      // Optionally redirect after submission
      // router.push('/thank-you')
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
*/
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-white">Enterprise Inquiry</h1>
            <p className="text-lg text-purple-200">
              Get in touch with our enterprise team to discuss how FinanceAI can transform your organization's financial
              strategy.
            </p>
          </div>

          <Card className="border-purple-800/20 bg-black text-white">
            <CardHeader>
              <CardTitle>Contact Our Enterprise Team</CardTitle>
              <CardDescription className="text-purple-200">
                Fill out the form below and our team will get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-purple-100">
                        Company Name <span className="text-purple-400">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Building className="h-4 w-4 text-purple-400" />
                        </div>
                        <Input
                          id="companyName"
                          name="companyName"
                          //value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Acme Corporation"
                          required
                          className="pl-10 bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson" className="text-purple-100">
                        Contact Person <span className="text-purple-400">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="h-4 w-4 text-purple-400" />
                        </div>
                        <Input
                          id="contactPerson"
                          name="contactPerson"
                         // value={formData.contactPerson}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          required
                          className="pl-10 bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-purple-100">
                        Email Address <span className="text-purple-400">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="h-4 w-4 text-purple-400" />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          //value={formData.email}
                          onChange={handleChange}
                          placeholder="jane.smith@acme.com"
                          required
                          className="pl-10 bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-purple-100">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Phone className="h-4 w-4 text-purple-400" />
                        </div>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                         // value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          className="pl-10 bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-purple-100">
                      Message <span className="text-purple-400">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                     // value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your company's needs and how we can help..."
                      required
                      rows={6}
                      className="bg-black/50 border-purple-800/30 text-white placeholder:text-purple-400/50 focus:border-purple-500 resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-purple-200">
                  <Lock className="h-4 w-4 text-purple-400" />
                  <p>Your information is encrypted and securely stored</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 text-white hover:bg-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Inquiry
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="border-purple-800/20 bg-black text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Enterprise Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200">For immediate assistance, contact our enterprise team directly:</p>
                <p className="mt-2 text-purple-100">enterprise@financeai.com</p>
                <p className="text-purple-100">+1 (555) 987-6543</p>
              </CardContent>
            </Card>
            <Card className="border-purple-800/20 bg-black text-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Shield className="mr-2 h-5 w-5 text-purple-400" />
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200">
                  We take your data security seriously. All information is encrypted and stored according to
                  industry-leading standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

